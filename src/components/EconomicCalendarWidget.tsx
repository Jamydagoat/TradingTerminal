"use client";

import { Panel, StatusTag } from "./Panel";
import { TradingViewWidget } from "./TradingViewWidget";

export function EconomicCalendarWidget({ height = 392 }: { height?: number }) {
  return (
    <Panel title="Economic Calendar" right={<StatusTag live />}>
      {/*
        The widget is a cross-origin iframe, so its columns can't be labelled
        from here. This strip approximates the value columns it renders on the
        right-hand side.
      */}
      <div className="flex items-center border-b border-border px-3 py-1 text-[10px] uppercase tracking-[0.08em] text-faint">
        <span className="flex-1">Event</span>
        <span className="w-[22%] min-w-16 text-right">Actual</span>
        <span className="w-[22%] min-w-16 text-right">Forecast</span>
        <span className="w-[22%] min-w-16 text-right">Prior</span>
      </div>
      <TradingViewWidget
        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-events.js"
        config={{
          colorTheme: "dark",
          isTransparent: true,
          locale: "en",
          importanceFilter: "-1,0,1",
          countryFilter: "us,eu,gb,jp,ca",
        }}
        height={height}
        fallbackLabel="economic calendar"
      />
    </Panel>
  );
}
