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
        if (!quote || !profile?.marketCapitalization) return null;
        const row: MarketCapRow = {
          symbol,
          name: profile.name || name,
          marketCapTrillions: profile.marketCapitalization / 1_000_000,
          price: quote.c,
          logo: profile.logo,
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
