"use client";

import { Panel } from "./Panel";
import { TradingViewWidget } from "./TradingViewWidget";

export function EconomicCalendarWidget() {
  return (
    <Panel
      title="Economic Calendar"
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
      <div className="p-2 h-full">
        <TradingViewWidget
          scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-events.js"
          config={{
            colorTheme: "dark",
            isTransparent: true,
            width: "100%",
            height: "100%",
            locale: "en",
            importanceFilter: "-1,0,1",
            countryFilter: "us,eu,gb,jp,ca",
          }}
          containerClassName="h-full"
          className="h-full"
          fallbackLabel="economic calendar"
        />
      </div>
    </Panel>
  );
}
