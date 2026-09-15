"use client";

import { Panel, StatusTag } from "./Panel";
import { TradingViewWidget } from "./TradingViewWidget";

export function StockHeatmapWidget() {
  return (
    <Panel title="S&P 500 Heatmap" right={<StatusTag live />}>
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
        }}
        height={620}
        fallbackLabel="stock heatmap"
      />
    </Panel>
  );
}
