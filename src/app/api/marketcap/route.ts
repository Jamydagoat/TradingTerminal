import { NextResponse } from "next/server";
import { getQuote, getProfile, hasFinnhubKey } from "@/lib/finnhub";
import { MEGACAPS } from "@/lib/universe";
import { marketCap as mockMarketCap } from "@/lib/mockData";
import type { MarketCapRow } from "@/lib/types";

export const revalidate = 0;

export async function GET() {
  if (!hasFinnhubKey()) {
    return NextResponse.json({ live: false, data: mockMarketCap });
  }

  try {
    const results = await Promise.all(
      MEGACAPS.map(async ({ symbol, name }) => {
        const [quote, profile] = await Promise.all([getQuote(symbol), getProfile(symbol)]);
        // The quote carries the price and is what makes the row live. Market
        // cap comes from profile2 and is treated as optional — previously a
        // missing cap dropped the whole row, so one thin profile response
        // could silently demote the entire panel to sample data.
        if (!quote || typeof quote.c !== "number") return null;
        const cap = profile?.marketCapitalization;
        const row: MarketCapRow = {
          symbol,
          name: profile?.name || name,
          marketCapTrillions: typeof cap === "number" && cap > 0 ? cap / 1_000_000 : 0,
          price: quote.c,
          logo: profile?.logo,
        };
        return row;
      })
    );

    const data = results
      .filter((r): r is MarketCapRow => r !== null)
      .sort((a, b) => b.marketCapTrillions - a.marketCapTrillions);

    if (data.length === 0) return NextResponse.json({ live: false, data: mockMarketCap });
    return NextResponse.json({ live: true, data });
  } catch {
    return NextResponse.json({ live: false, data: mockMarketCap });
  }
}
