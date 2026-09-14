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
import { Panel } from "./Panel";

export function PerformanceChart({ series }: { series: PerformanceSeries[] }) {
  const chartData = series[0].points.map((p, i) => {
    const row: Record<string, string | number> = { date: p.date };
    for (const s of series) row[s.symbol] = s.points[i].value;
    return row;
  });

  return (
    <Panel
      title="Normalized Market Performance"
      right={
        <span className="rounded-md border border-border px-2 py-1 text-xs text-muted">
          1Y
        </span>
      }
      className="min-h-[380px]"
    >
      <div className="p-4 h-full flex flex-col">
        <div className="flex-1 min-h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: "var(--color-muted)", fontSize: 11 }}
                axisLine={{ stroke: "var(--color-border)" }}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: "var(--color-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
                width={44}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(value) => `${Number(value).toFixed(2)}%`}
              />
              {series.map((s) => (
                <Line
                  key={s.symbol}
                  type="monotone"
                  dataKey={s.symbol}
                  stroke={s.color}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-3 pt-3">
          {series.map((s) => (
            <div
              key={s.symbol}
              className="flex items-center gap-2 rounded-md px-2 py-1 text-xs font-semibold"
              style={{ background: `${s.color}22`, color: s.color }}
            >
              {s.symbol}
              <span>
                {s.totalReturnPercent >= 0 ? "+" : ""}
                {s.totalReturnPercent.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
