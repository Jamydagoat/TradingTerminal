import { NextResponse } from "next/server";
import { getQuote, getProfile, hasFinnhubKey } from "@/lib/finnhub";
import { MOVERS_WATCHLIST } from "@/lib/universe";
import { biggestMovers as mockMovers } from "@/lib/mockData";
import type { Quote } from "@/lib/types";

export const revalidate = 0;

/**
 * Ranked by absolute daily move, not volume: Finnhub's candle endpoint is
 * premium-only, so volume is not available on a free key.
 */
export async function GET() {
  if (!hasFinnhubKey()) {
    return NextResponse.json({ live: false, data: mockMovers });
  }

  try {
    const results = await Promise.all(
      MOVERS_WATCHLIST.map(async (symbol) => {
        const [quote, profile] = await Promise.all([getQuote(symbol), getProfile(symbol)]);
        if (!quote || typeof quote.dp !== "number") return null;
        const row: Quote = {
          symbol,
          name: profile?.name || symbol,
          price: quote.c,
          change: quote.d,
          changePercent: quote.dp,
          logo: profile?.logo,
        };
        return row;
      })
    );

    const data = results
      .filter((r): r is Quote => r !== null)
      .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
      .slice(0, 8);

    if (data.length === 0) return NextResponse.json({ live: false, data: mockMovers });
    return NextResponse.json({ live: true, data });
  } catch {
    return NextResponse.json({ live: false, data: mockMovers });
  }
}
