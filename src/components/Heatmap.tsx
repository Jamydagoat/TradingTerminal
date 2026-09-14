import type { HeatmapTile } from "@/lib/types";
import { Panel } from "./Panel";

function colorFor(change: number) {
  const clamped = Math.max(-3, Math.min(3, change));
  const t = (clamped + 3) / 6;
  if (t < 0.5) {
    const k = t / 0.5;
    return `rgb(${Math.round(153 + (60 - 153) * k)}, ${Math.round(27 + 27 * k)}, ${Math.round(27 + 27 * k)})`;
  }
  const k = (t - 0.5) / 0.5;
  return `rgb(${Math.round(60 - 40 * k)}, ${Math.round(54 + 100 * k)}, ${Math.round(27 + 20 * k)})`;
}

export function Heatmap({ data }: { data: HeatmapTile[] }) {
  const bySector = data.reduce<Record<string, HeatmapTile[]>>((acc, t) => {
    (acc[t.sector] ??= []).push(t);
    return acc;
  }, {});

  return (
    <Panel
      title="Heatmap"
      right={
        <span className="rounded-md border border-border px-2 py-1 text-xs text-muted">
          1D
        </span>
      }
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-3">
        {Object.entries(bySector).map(([sector, tiles]) => (
          <div key={sector} className="flex flex-col gap-1">
            <div className="text-[10px] font-semibold text-foreground/80 truncate px-1">
              {sector}
            </div>
            {tiles.map((t) => (
              <div
                key={t.symbol}
                className="rounded-md px-2 py-3 flex flex-col justify-between"
                style={{ background: colorFor(t.changePercent) }}
              >
                <span className="text-xs font-bold text-white">{t.symbol}</span>
                <span className="text-[11px] font-semibold text-white/90">
                  {t.changePercent >= 0 ? "+" : ""}
                  {t.changePercent.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Panel>
  );
}
