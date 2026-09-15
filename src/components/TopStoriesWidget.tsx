"use client";

import { Panel, StatusTag } from "./Panel";
import { TradingViewWidget } from "./TradingViewWidget";

export function TopStoriesWidget({ symbol }: { symbol?: string }) {
  return (
    <Panel title={symbol ? "News" : "Top Stories"} right={<StatusTag live />}>
      <TradingViewWidget
        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"
        config={
          symbol
            ? {
                feedMode: "symbol",
                symbol,
                isTransparent: true,
                displayMode: "regular",
                colorTheme: "dark",
                locale: "en",
              }
            : {
                feedMode: "all_symbols",
                isTransparent: true,
                displayMode: "regular",
                colorTheme: "dark",
                locale: "en",
              }
        }
        height={420}
        fallbackLabel="news feed"
      />
    </Panel>
  );
}
