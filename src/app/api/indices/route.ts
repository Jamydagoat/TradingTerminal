import { NextResponse } from "next/server";
import { getQuote, getDailyCandle, hasFinnhubKey } from "@/lib/finnhub";
import { INDEX_SYMBOLS } from "@/lib/universe";
import { indexCards as mockIndexCards } from "@/lib/mockData";
import type { IndexCardData } from "@/lib/types";

export const revalidate = 0;

export async function GET() {
  if (!hasFinnhubKey()) {
    return NextResponse.json({ live: false, data: mockIndexCards });
  }

  try {
    const results = await Promise.all(
      INDEX_SYMBOLS.map(async ({ symbol, name }) => {
        const [quote, candle] = await Promise.all([
          getQuote(symbol),
          getDailyCandle(symbol, 30),
        ]);
        if (!quote) return null;
        const sparkline =
          candle && candle.s === "ok" && candle.c.length > 1 ? candle.c : [quote.pc, quote.c];
        const row: IndexCardData = {
          symbol,
          name,
          price: quote.c,
          change: quote.d,
          changePercent: quote.dp,
          marketClosedPrice: quote.pc,
          preMarketPrice: quote.c,
          preMarketChangePercent: quote.dp,
          sparkline,
        };
        return row;
      })
    );

    const data = results.filter((r): r is IndexCardData => r !== null);
    if (data.length === 0) {
      return NextResponse.json({ live: false, data: mockIndexCards });
    }
    return NextResponse.json({ live: true, data });
  } catch {
    return NextResponse.json({ live: false, data: mockIndexCards });
  }
}
