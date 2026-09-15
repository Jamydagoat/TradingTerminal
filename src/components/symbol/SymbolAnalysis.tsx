"use client";

import { Panel, RangeTag } from "../Panel";
import { TradingViewWidget } from "../TradingViewWidget";

export function SymbolAnalysis({ symbol }: { symbol: string }) {
  return (
    <Panel title="Technical Analysis" right={<RangeTag label="1D" />}>
      <TradingViewWidget
        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
        config={{
          symbol,
          interval: "1D",
          colorTheme: "dark",
          isTransparent: true,
          showIntervalTabs: true,
          displayMode: "single",
          locale: "en",
        }}
        height={440}
        fallbackLabel="technical analysis"
      />
    </Panel>
  );
}
