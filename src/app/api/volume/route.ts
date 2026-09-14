import { NextResponse } from "next/server";
import { getQuote, getDailyCandle, hasFinnhubKey } from "@/lib/finnhub";
import { VOLUME_WATCHLIST } from "@/lib/universe";
import { biggestVolume as mockVolume } from "@/lib/mockData";
import type { Quote } from "@/lib/types";

export const revalidate = 0;

export async function GET() {
  if (!hasFinnhubKey()) {
    return NextResponse.json({ live: false, data: mockVolume });
  }

  try {
    const results = await Promise.all(
      VOLUME_WATCHLIST.map(async (symbol) => {
        const [quote, candle] = await Promise.all([
          getQuote(symbol),
          getDailyCandle(symbol, 5),
        ]);
        if (!quote) return null;
        const volume =
          candle && candle.s === "ok" && candle.v.length > 0
            ? candle.v[candle.v.length - 1]
            : 0;
        const row: Quote & { volume: number } = {
          symbol,
          name: symbol,
          price: quote.c,
          change: quote.d,
          changePercent: quote.dp,
          volume,
        };
        return row;
      })
    );

    const data = results
      .filter((r): r is Quote & { volume: number } => r !== null)
      .sort((a, b) => (b.volume ?? 0) - (a.volume ?? 0))
      .slice(0, 6);

    if (data.length === 0) return NextResponse.json({ live: false, data: mockVolume });
    return NextResponse.json({ live: true, data });
  } catch {
    return NextResponse.json({ live: false, data: mockVolume });
  }
}
