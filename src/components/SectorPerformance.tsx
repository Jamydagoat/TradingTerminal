import type { SectorData } from "@/lib/types";
import { Panel } from "./Panel";

export function SectorPerformance({ data }: { data: SectorData[] }) {
  const max = Math.max(...data.map((d) => Math.abs(d.changePercent)), 1);
  return (
    <Panel
      title="Sector Performance"
      right={
        <span className="rounded-md border border-border px-2 py-1 text-xs text-muted">
          1D
        </span>
      }
    >
      <div className="px-4 py-2">
        {data.map((s) => {
          const up = s.changePercent >= 0;
          const width = (Math.abs(s.changePercent) / max) * 100;
          return (
            <div
              key={s.name}
              className="flex items-center justify-between gap-3 py-2.5 border-b border-border last:border-0 text-sm"
            >
              <span className="flex items-center gap-2 text-foreground/90 truncate">
                <span className="text-muted">•</span>
                {s.name}
              </span>
              <span className="flex items-center gap-2 shrink-0">
                <span className={`font-semibold ${up ? "text-up" : "text-down"}`}>
                  {up ? "+" : ""}
                  {s.changePercent.toFixed(2)}%
                </span>
                <span className="h-1.5 w-20 rounded-full bg-surface-2 overflow-hidden">
                  <span
                    className={`block h-full rounded-full ${up ? "bg-up" : "bg-down"}`}
                    style={{ width: `${width}%` }}
                  />
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
