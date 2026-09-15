"use client";

import { Panel } from "../Panel";
import { TradingViewWidget } from "../TradingViewWidget";

export function SymbolProfile({ symbol }: { symbol: string }) {
  return (
    <Panel title="Company Profile">
      <TradingViewWidget
        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js"
        config={{
          symbol,
          colorTheme: "dark",
          isTransparent: true,
          locale: "en",
        }}
        height={440}
        fallbackLabel="company profile"
      />
    </Panel>
  );
}
