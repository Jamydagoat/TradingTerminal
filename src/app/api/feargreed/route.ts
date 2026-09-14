import { NextResponse } from "next/server";
import { getQuote, hasFinnhubKey } from "@/lib/finnhub";
import { INDEX_SYMBOLS, SECTOR_ETFS, VOLATILITY_PROXY_SYMBOL } from "@/lib/universe";
import { fearGreed as mockFearGreed } from "@/lib/mockData";

export const revalidate = 0;

function labelFor(score: number) {
  if (score <= 24) return "Extreme Fear";
  if (score <= 44) return "Fear";
  if (score <= 56) return "Neutral";
  if (score <= 76) return "Greed";
  return "Extreme Greed";
}

export async function GET() {
  if (!hasFinnhubKey()) {
    return NextResponse.json({ live: false, data: mockFearGreed });
  }

  try {
    const symbols = [...INDEX_SYMBOLS.map((s) => s.symbol), ...SECTOR_ETFS.map((s) => s.symbol)];
    const [quotes, vixy] = await Promise.all([
      Promise.all(symbols.map((s) => getQuote(s))),
      getQuote(VOLATILITY_PROXY_SYMBOL),
    ]);

    const valid = quotes.filter((q): q is NonNullable<typeof q> => q !== null);
    if (valid.length === 0 || !vixy) {
      return NextResponse.json({ live: false, data: mockFearGreed });
    }

    const upCount = valid.filter((q) => q.dp > 0).length;
    const breadthScore = (upCount / valid.length) * 100;
    const volComponent = Math.max(0, Math.min(100, 50 - vixy.dp * 3));
    const score = Math.round(Math.max(0, Math.min(100, 0.5 * breadthScore + 0.5 * volComponent)));

    const data = {
      score,
      label: labelFor(score),
      lastUpdated: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        timeZone: "America/New_York",
        timeZoneName: "short",
      }),
      estimated: true,
    };

    return NextResponse.json({ live: true, data });
  } catch {
    return NextResponse.json({ live: false, data: mockFearGreed });
  }
}
