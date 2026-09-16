"use client";

import { Panel, RangeTag, StatusTag } from "./Panel";
import { TradingViewWidget } from "./TradingViewWidget";

/**
 * SPY with the other three index ETFs overlaid. TradingView switches the
 * vertical axis to percentage as soon as comparison symbols are present,
 * which is exactly the relative-performance read we want.
 *
 * Locked to read-only: zooming inside the iframe desynchronises the
 * comparison series, and there is nothing here worth panning to.
 */
export function RelativePerformance({ height = 360 }: { height?: number }) {
  return (
    <Panel
      title="Relative Performance"
      right={
        <span className="flex items-center gap-2">
          <StatusTag live />
          <RangeTag label="1Y" />
        </span>
      }
    >
      <TradingViewWidget
        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
        config={{
          symbol: "AMEX:SPY",
          compareSymbols: [
            { symbol: "NASDAQ:QQQ", position: "SameScale" },
            { symbol: "AMEX:IWM", position: "SameScale" },
            { symbol: "AMEX:DIA", position: "SameScale" },
          ],
          interval: "D",
          range: "12M",
          timezone: "America/New_York",
          theme: "dark",
          style: "2",
          locale: "en",
          hide_top_toolbar: true,
          hide_side_toolbar: true,
          hide_volume: true,
          hide_legend: false,
          withdateranges: false,
          allow_symbol_change: false,
          save_image: false,
          details: false,
          calendar: false,
          enable_publishing: false,
          backgroundColor: "rgba(20, 20, 22, 1)",
          gridColor: "rgba(38, 38, 42, 0.5)",
        }}
        height={height}
        interactive={false}
        fallbackLabel="performance chart"
      />
    </Panel>
  );
}
