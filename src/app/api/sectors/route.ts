import { NextResponse } from "next/server";
import { getQuote, hasFinnhubKey } from "@/lib/finnhub";
import { SECTOR_ETFS } from "@/lib/universe";
import { sectorPerformance as mockSectors } from "@/lib/mockData";
import type { SectorData } from "@/lib/types";

export const revalidate = 0;

export async function GET() {
  if (!hasFinnhubKey()) {
    return NextResponse.json({ live: false, data: mockSectors });
  }

  try {
    const results = await Promise.all(
      SECTOR_ETFS.map(async ({ symbol, name, icon }) => {
        const quote = await getQuote(symbol);
        if (!quote) return null;
        const row: SectorData = { name, icon, changePercent: quote.dp };
        return row;
      })
    );

    const data = results
      .filter((r): r is SectorData => r !== null)
      .sort((a, b) => b.changePercent - a.changePercent);

    if (data.length === 0) return NextResponse.json({ live: false, data: mockSectors });
    return NextResponse.json({ live: true, data });
  } catch {
    return NextResponse.json({ live: false, data: mockSectors });
  }
}
