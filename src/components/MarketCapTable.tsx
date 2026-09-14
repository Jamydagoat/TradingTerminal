import type { MarketCapRow } from "@/lib/types";
import { Panel } from "./Panel";

export function MarketCapTable({ data }: { data: MarketCapRow[] }) {
  return (
    <Panel title="Market Cap">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted text-xs">
              <th className="px-4 py-2 font-medium">Ticker</th>
              <th className="px-4 py-2 font-medium text-right">Mrk. Cap</th>
              <th className="px-4 py-2 font-medium text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.symbol} className="border-t border-border hover:bg-surface-2/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-surface-2 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold">{row.symbol}</div>
                      <div className="text-xs text-muted truncate">{row.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-semibold">
                  {row.marketCapTrillions.toFixed(3)} T
                </td>
                <td className="px-4 py-3 text-right font-semibold">
                  ${row.price.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
