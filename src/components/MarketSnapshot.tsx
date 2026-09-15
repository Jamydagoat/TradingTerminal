import type { SnapshotRow } from "@/lib/types";
import { Panel, ChangeText, StatusTag } from "./Panel";

const FLAG: Record<string, string> = {
  us: "US",
  jp: "JP",
  gb: "GB",
  ca: "CA",
};

export function MarketSnapshot({ data }: { data: SnapshotRow[] }) {
  return (
    <Panel title="Market Snapshot" right={<StatusTag live={false} />}>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-[0.08em] text-faint">
              <th className="px-3 py-1.5 font-medium">Instrument</th>
              <th className="px-3 py-1.5 font-medium text-right">Change</th>
              <th className="px-3 py-1.5 font-medium text-right">Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.symbol} className="border-t border-border hover:bg-surface-2">
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-sm border border-border px-1 py-0.5 text-[9px] font-semibold tracking-wide text-faint">
                      {FLAG[row.flag] ?? "--"}
                    </span>
                    <div className="min-w-0">
                      <div className="font-medium">{row.symbol}</div>
                      <div className="text-[11px] text-muted truncate">{row.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2 text-right font-medium">
                  <ChangeText value={row.changePercent} />
                </td>
                <td className="px-3 py-2 text-right font-medium">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
