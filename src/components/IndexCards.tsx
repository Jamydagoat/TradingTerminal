"use client";

import { AreaChart, Area, ResponsiveContainer } from "recharts";
import type { IndexCardData } from "@/lib/types";
import { ChangeBadge } from "./Panel";

function Sparkline({ data, up }: { data: number[]; up: boolean }) {
  const points = data.map((v, i) => ({ i, v }));
  const color = up ? "var(--color-up)" : "var(--color-down)";
  return (
    <ResponsiveContainer width="100%" height={70}>
      <AreaChart data={points} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={`grad-${up}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#grad-${up})`}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function IndexCard({ data }: { data: IndexCardData }) {
  const up = data.preMarketChangePercent >= 0;
  return (
    <div className="rounded-xl border border-border bg-surface p-4 flex items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-6 w-6 rounded-full bg-surface-2 shrink-0" />
          <span className="font-semibold text-[15px] truncate">{data.name}</span>
          <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] font-semibold text-muted">
            {data.symbol}
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div>
            <div className="text-muted text-xs mb-0.5">Market Closed</div>
            <div className="font-semibold">${data.marketClosedPrice.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-muted text-xs mb-0.5">Pre-Market</div>
            <div className="font-semibold">${data.preMarketPrice.toFixed(2)}</div>
          </div>
        </div>
        <div className="mt-2">
          <ChangeBadge value={data.preMarketChangePercent} />
        </div>
      </div>
      <div className="w-28 shrink-0">
        <Sparkline data={data.sparkline} up={up} />
      </div>
    </div>
  );
}

export function IndexCards({ data }: { data: IndexCardData[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {data.map((d) => (
        <IndexCard key={d.symbol} data={d} />
      ))}
    </div>
  );
}
