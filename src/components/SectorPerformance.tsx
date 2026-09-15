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
import { Panel } from "./Panel";

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
          const Icon = ICONS[s.icon] ?? Zap;
          return (
            <div
              key={s.name}
              className="flex items-center justify-between gap-3 py-2.5 border-b border-border last:border-0 text-sm"
            >
              <span className="flex items-center gap-2.5 text-foreground/90 truncate">
                <Icon className="h-4 w-4 shrink-0 text-muted" strokeWidth={2} />
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
