import { NextResponse } from "next/server";
import { getMonthlyCandle, hasFinnhubKey } from "@/lib/finnhub";
import { performanceSeries as mockPerformance } from "@/lib/mockData";
import type { PerformanceSeries } from "@/lib/types";

export const revalidate = 0;

const COLORS: Record<string, string> = {
  SPY: "#ef4444",
  QQQ: "#3b82f6",
  IWM: "#f59e0b",
  DIA: "#10b981",
};

export async function GET() {
  if (!hasFinnhubKey()) {
    return NextResponse.json({ live: false, data: mockPerformance });
  }

  try {
    const symbols = Object.keys(COLORS);
    const results = await Promise.all(
      symbols.map(async (symbol) => {
        const candle = await getMonthlyCandle(symbol, 13);
        if (!candle || candle.s !== "ok" || candle.c.length < 2) return null;
        const base = candle.c[0];
        const points = candle.t.map((t, i) => ({
          date: new Date(t * 1000).toLocaleDateString("en-US", {
            month: "short",
            year: "2-digit",
          }),
          value: Number((((candle.c[i] - base) / base) * 100).toFixed(2)),
        }));
        const row: PerformanceSeries = {
          symbol,
          color: COLORS[symbol],
          totalReturnPercent: points[points.length - 1].value,
          points,
        };
        return row;
      })
    );

    const data = results.filter((r): r is PerformanceSeries => r !== null);
    if (data.length === 0) return NextResponse.json({ live: false, data: mockPerformance });
    return NextResponse.json({ live: true, data });
  } catch {
    return NextResponse.json({ live: false, data: mockPerformance });
  }
}
