import type { CalendarEvent } from "@/lib/types";
import { Panel } from "./Panel";

function ImpactDots({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${i <= level ? "bg-up" : "bg-border"}`}
        />
      ))}
    </span>
  );
}

export function EconomicCalendar({ data }: { data: CalendarEvent[] }) {
  return (
    <Panel
      title="Economic Calendar"
      right={
        <span className="rounded-md border border-border px-2 py-1 text-xs text-muted">
          Mon
        </span>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted text-xs">
              <th className="px-4 py-2 font-medium">Time</th>
              <th className="px-4 py-2 font-medium">Event</th>
              <th className="px-4 py-2 font-medium text-right">Est</th>
              <th className="px-4 py-2 font-medium text-right">Actual</th>
              <th className="px-4 py-2 font-medium text-right">Impact</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-muted text-xs">
                  No events — live calendar requires a paid data feed.
                </td>
              </tr>
            )}
            {data.map((row, i) => (
              <tr key={i} className="border-t border-border hover:bg-surface-2/50">
                <td className="px-4 py-3 whitespace-nowrap text-muted">{row.time}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <span>🇺🇸</span> {row.event}
                </td>
                <td className="px-4 py-3 text-right">{row.est}</td>
                <td className="px-4 py-3 text-right">{row.actual}</td>
                <td className="px-4 py-3 text-right">
                  <ImpactDots level={row.impact} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
