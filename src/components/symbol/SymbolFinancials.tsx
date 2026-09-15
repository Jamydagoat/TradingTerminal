"use client";

import { Panel } from "../Panel";
import { TradingViewWidget } from "../TradingViewWidget";

export function SymbolFinancials({ symbol }: { symbol: string }) {
  return (
    <Panel title="Fundamentals">
      <TradingViewWidget
        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-financials.js"
        config={{
          symbol,
          colorTheme: "dark",
          isTransparent: true,
          displayMode: "regular",
          largeChartUrl: "",
          locale: "en",
        }}
        height={490}
        fallbackLabel="fundamentals"
      />
    </Panel>
  );
}
