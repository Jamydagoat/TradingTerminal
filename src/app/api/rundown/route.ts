import { NextResponse } from "next/server";
import { getQuote, getMarketNews, hasFinnhubKey } from "@/lib/finnhub";
import { generateJson, hasGeminiKey } from "@/lib/gemini";
import { SECTOR_ETFS, MOVERS_WATCHLIST } from "@/lib/universe";
import type { Rundown } from "@/lib/types";

export const revalidate = 0;

function etDateKey() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
}

// One generation per calendar day. Isolates are ephemeral on Workers, so this
// may run a handful of times a day rather than exactly once — still far inside
// the free tier, and it keeps the brief stable for anyone loading the page.
let cached: { key: string; data: Rundown } | null = null;

function buildPrompt(input: {
  date: string;
  headlines: { headline: string; source: string }[];
  sectors: { name: string; changePercent: number }[];
  movers: { symbol: string; changePercent: number }[];
}) {
  return `You are a markets desk analyst writing a pre-open brief for ${input.date} (US Eastern).

Use ONLY the data below. Do not introduce companies, events, earnings dates, or
numbers that are not present in it. If the data is thin, say so plainly rather
than padding. No investment advice, no price targets, no buy/sell language.

HEADLINES:
${input.headlines.map((h) => `- ${h.headline} (${h.source})`).join("\n") || "- none available"}

SECTOR MOVES (1D %):
${input.sectors.map((s) => `- ${s.name}: ${s.changePercent.toFixed(2)}%`).join("\n") || "- none available"}

NOTABLE MOVERS (1D %):
${input.movers.map((m) => `- ${m.symbol}: ${m.changePercent.toFixed(2)}%`).join("\n") || "- none available"}

Return JSON exactly matching:
{
  "summary": string,       // 2-3 sentences on what is setting the tone today
  "watchlist": [           // 3-6 entries, most significant first
    { "symbol": string, "catalyst": string }  // catalyst: one short clause, why it is worth watching
  ]
}

Every symbol in watchlist must appear in the data above. Keep catalysts factual
and specific — reference the actual headline or move, not generic commentary.`;
}

export async function GET() {
  if (!hasGeminiKey()) {
    return NextResponse.json({
      live: false,
      data: null,
      error: "Set GEMINI_API_KEY to enable the daily rundown.",
    });
  }

  const key = etDateKey();
  if (cached && cached.key === key) {
    return NextResponse.json({ live: true, data: cached.data });
  }

  if (!hasFinnhubKey()) {
    return NextResponse.json({
      live: false,
      data: null,
      error: "Set FINNHUB_API_KEY — the rundown is built from live market data.",
    });
  }

  try {
    const [news, sectorQuotes, moverQuotes] = await Promise.all([
      getMarketNews(),
      Promise.all(
        SECTOR_ETFS.map(async (s) => ({ name: s.name, quote: await getQuote(s.symbol) }))
      ),
      Promise.all(
        MOVERS_WATCHLIST.map(async (symbol) => ({ symbol, quote: await getQuote(symbol) }))
      ),
    ]);

    const headlines = (news ?? [])
      .filter((n) => n.headline)
      .slice(0, 20)
      .map((n) => ({ headline: n.headline!, source: n.source ?? "" }));

    const sectors = sectorQuotes
      .filter((s) => s.quote)
      .map((s) => ({ name: s.name, changePercent: s.quote!.dp }));

    const movers = moverQuotes
      .filter((m) => m.quote)
      .map((m) => ({ symbol: m.symbol, changePercent: m.quote!.dp }))
      .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
      .slice(0, 10);

    if (headlines.length === 0 && sectors.length === 0) {
      return NextResponse.json({
        live: false,
        data: null,
        error: "No market data available to summarise right now.",
      });
    }

    const result = await generateJson(
      buildPrompt({
        date: new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
          timeZone: "America/New_York",
        }),
        headlines,
        sectors,
        movers,
      })
    );

    if (!result.ok) {
      return NextResponse.json({ live: false, data: null, error: result.error });
    }

    let parsed: { summary?: string; watchlist?: { symbol?: string; catalyst?: string }[] };
    try {
      parsed = JSON.parse(result.text);
    } catch {
      return NextResponse.json({
        live: false,
        data: null,
        error: "Gemini returned a response that was not valid JSON.",
      });
    }

    const data: Rundown = {
      summary: parsed.summary?.trim() ?? "",
      watchlist: (parsed.watchlist ?? [])
        .filter((w) => w.symbol && w.catalyst)
        .slice(0, 6)
        .map((w) => ({ symbol: w.symbol!.toUpperCase(), catalyst: w.catalyst! })),
      generatedAt: Date.now(),
    };

    if (!data.summary) {
      return NextResponse.json({
        live: false,
        data: null,
        error: "Gemini returned an empty summary.",
      });
    }

    cached = { key, data };
    return NextResponse.json({ live: true, data });
  } catch (err) {
    return NextResponse.json({
      live: false,
      data: null,
      error: err instanceof Error ? err.message : "Failed to build the rundown.",
    });
  }
}
