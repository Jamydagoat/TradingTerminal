"use client";

import { Panel } from "./Panel";
import { TradingViewWidget } from "./TradingViewWidget";

export function TopStoriesWidget() {
  return (
    <Panel
      title="Top Stories"
      right={
        <span
          className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide"
          title="Live embed from TradingView"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-up animate-pulse" />
          <span className="text-up">Live</span>
        </span>
      }
      className="min-h-[420px]"
    >
      <TradingViewWidget
        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"
        config={{
          feedMode: "all_symbols",
          isTransparent: true,
          displayMode: "regular",
          width: "100%",
          height: "100%",
          colorTheme: "dark",
          locale: "en",
        }}
        containerClassName="h-full"
        className="h-full"
        fallbackLabel="top stories"
      />
    </Panel>
  );
}
