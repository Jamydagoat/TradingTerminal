import { NextResponse } from "next/server";
import { getQuote, hasFinnhubKey } from "@/lib/finnhub";
import { MEGACAPS } from "@/lib/universe";
import { heatmap as mockHeatmap } from "@/lib/mockData";
import type { HeatmapTile } from "@/lib/types";

export const revalidate = 0;

export async function GET() {
  if (!hasFinnhubKey()) {
    return NextResponse.json({ live: false, data: mockHeatmap });
  }

  try {
    const results = await Promise.all(
      MEGACAPS.map(async ({ symbol, name, sector }) => {
        const quote = await getQuote(symbol);
        if (!quote) return null;
        const row: HeatmapTile = { symbol, name, sector, changePercent: quote.dp };
        return row;
      })
    );

    const data = results.filter((r): r is HeatmapTile => r !== null);
    if (data.length === 0) return NextResponse.json({ live: false, data: mockHeatmap });
    return NextResponse.json({ live: true, data });
  } catch {
    return NextResponse.json({ live: false, data: mockHeatmap });
  }
}
