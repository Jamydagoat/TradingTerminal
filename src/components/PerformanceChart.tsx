"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { PerformanceSeries } from "@/lib/types";
import { Panel, RangeTag, StatusTag } from "./Panel";

export function PerformanceChart({
  series,
  live,
}: {
  series: PerformanceSeries[];
  live: boolean;
}) {
  const chartData = series[0].points.map((p, i) => {
    const row: Record<string, string | number> = { date: p.date };
    for (const s of series) row[s.symbol] = s.points[i].value;
    return row;
  });

  return (
    <Panel
      title="Relative Performance"
      right={
        <span className="flex items-center gap-2">
          <StatusTag live={live} />
          <RangeTag label="1Y" />
        </span>
      }
    >
      <div className="flex h-full flex-col p-3">
        <div className="min-h-[220px] flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: "var(--color-faint)", fontSize: 10 }}
                axisLine={{ stroke: "var(--color-border)" }}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: "var(--color-faint)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--color-surface-2)",
                  border: "1px solid var(--color-border-strong)",
                  borderRadius: 4,
                  fontSize: 11,
                }}
                formatter={(value) => `${Number(value).toFixed(2)}%`}
              />
              {series.map((s) => (
                <Line
                  key={s.symbol}
                  type="monotone"
                  dataKey={s.symbol}
                  stroke={s.color}
                  strokeWidth={1.5}
                  dot={false}
                  isAnimationActive={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2 text-[11px] tabular">
          {series.map((s) => (
            <span key={s.symbol} className="flex items-center gap-1.5">
              <span className="h-[2px] w-3" style={{ background: s.color }} />
              <span className="text-muted">{s.symbol}</span>
              <span style={{ color: s.color }}>
                {s.totalReturnPercent >= 0 ? "+" : ""}
                {s.totalReturnPercent.toFixed(2)}%
              </span>
            </span>
          ))}
        </div>
      </div>
    </Panel>
  );
}
