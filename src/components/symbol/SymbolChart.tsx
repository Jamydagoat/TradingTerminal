"use client";

import { Panel, RangeTag } from "../Panel";
import { TradingViewWidget } from "../TradingViewWidget";

export function SymbolChart({ symbol }: { symbol: string }) {
  return (
    <Panel title="Chart" right={<RangeTag label="1D" />}>
      <TradingViewWidget
        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
        config={{
          symbol,
          interval: "D",
          timezone: "America/New_York",
          theme: "dark",
          style: "1",
          locale: "en",
          enable_publishing: false,
          allow_symbol_change: false,
          hide_side_toolbar: false,
          withdateranges: true,
          details: false,
          backgroundColor: "rgba(20, 20, 22, 1)",
          gridColor: "rgba(38, 38, 42, 0.6)",
        }}
        height={520}
        fallbackLabel="chart"
      />
    </Panel>
  );
}
