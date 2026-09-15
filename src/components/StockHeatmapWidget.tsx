"use client";

import { Panel } from "./Panel";
import { TradingViewWidget } from "./TradingViewWidget";

export function StockHeatmapWidget() {
  return (
    <Panel
      title="Heatmap"
      right={
        <span
          className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide"
          title="Live embed from TradingView"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-up animate-pulse" />
          <span className="text-up">Live</span>
        </span>
      }
      className="min-h-[560px]"
    >
      <div className="p-2 h-full">
        <TradingViewWidget
          scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js"
          config={{
            exchanges: [],
            dataSource: "SPX500",
            grouping: "sector",
            blockSize: "market_cap_basic",
            blockColor: "change",
            locale: "en",
            symbolUrl: "",
            colorTheme: "dark",
            hasTopBar: false,
            isDataSetEnabled: false,
            isZoomEnabled: true,
            isMonoSize: false,
            width: "100%",
            height: "100%",
          }}
          containerClassName="h-full"
          className="h-full"
          fallbackLabel="stock heatmap"
        />
      </div>
    </Panel>
  );
}
