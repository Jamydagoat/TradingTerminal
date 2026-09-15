import {
  Zap,
  Phone,
  Heart,
  ShoppingBasket,
  Landmark,
  Building2,
  Lightbulb,
  ShoppingCart,
  Shuffle,
  Monitor,
  type LucideIcon,
} from "lucide-react";
import type { SectorData } from "@/lib/types";
import { Panel, StatusTag, RangeTag } from "./Panel";

const ICONS: Record<string, LucideIcon> = {
  zap: Zap,
  phone: Phone,
  heart: Heart,
  "shopping-basket": ShoppingBasket,
  landmark: Landmark,
  building: Building2,
  lightbulb: Lightbulb,
  "shopping-cart": ShoppingCart,
  shuffle: Shuffle,
  monitor: Monitor,
};

export function SectorPerformance({ data, live }: { data: SectorData[]; live: boolean }) {
  const max = Math.max(...data.map((d) => Math.abs(d.changePercent)), 0.5);

  return (
    <Panel
      title="Sector Performance"
      right={
        <span className="flex items-center gap-2">
          <StatusTag live={live} />
          <RangeTag label="1D" />
        </span>
      }
    >
      <div className="flex h-full flex-col px-3 tabular">
        {data.map((s) => {
          const up = s.changePercent >= 0;
          // Diverging from a shared centre line, so direction reads at a glance.
          const width = (Math.abs(s.changePercent) / max) * 50;
          const Icon = ICONS[s.icon] ?? Zap;
          return (
            <div
              key={s.name}
              className="flex flex-1 items-center gap-3 border-b border-border last:border-0 text-[13px]"
            >
              <span className="flex w-[42%] min-w-0 shrink-0 items-center gap-2 text-foreground/90">
                <Icon className="h-3.5 w-3.5 shrink-0 text-faint" strokeWidth={2} />
                <span className="truncate">{s.name}</span>
              </span>

              <span className="relative h-1.5 flex-1 rounded-sm bg-surface-2">
                <span className="absolute inset-y-[-3px] left-1/2 w-px -translate-x-1/2 bg-border-strong" />
                <span
                  className={`absolute top-0 h-full rounded-sm ${up ? "bg-up" : "bg-down"}`}
                  style={
                    up
                      ? { left: "50%", width: `${width}%` }
                      : { right: "50%", width: `${width}%` }
                  }
                />
              </span>

              <span
                className={`w-14 shrink-0 text-right font-medium ${up ? "text-up" : "text-down"}`}
              >
                {up ? "+" : ""}
                {s.changePercent.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
