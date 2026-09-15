import Link from "next/link";
import type { Quote } from "@/lib/types";
import { Panel, ChangeText, StatusTag, RangeTag } from "./Panel";
import { Avatar } from "./Avatar";

export function MoversTable({ data, live }: { data: Quote[]; live: boolean }) {
  return (
    <Panel
      title="Biggest Movers"
      right={
        <span className="flex items-center gap-2">
          <StatusTag live={live} />
          <RangeTag label="1D" />
        </span>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-[0.08em] text-faint">
              <th className="px-3 py-1.5 font-medium">Ticker</th>
              <th className="px-3 py-1.5 font-medium text-right">Change</th>
              <th className="px-3 py-1.5 font-medium text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.symbol} className="border-t border-border hover:bg-surface-2">
                <td className="px-3 py-2">
                  <Link href={`/stock/${row.symbol}`} className="flex items-center gap-2">
                    <Avatar symbol={row.symbol} logo={row.logo} />
                    <span className="min-w-0">
                      <span className="block font-medium">{row.symbol}</span>
                      <span className="block text-[11px] text-muted truncate">{row.name}</span>
                    </span>
                  </Link>
                </td>
                <td className="px-3 py-2 text-right font-medium">
                  <ChangeText value={row.changePercent} />
                </td>
                <td className="px-3 py-2 text-right font-medium">${row.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
