"use client";

import { Panel, StatusTag } from "./Panel";
import { TradingViewWidget } from "./TradingViewWidget";

export function EconomicCalendarWidget() {
  return (
    <Panel title="Economic Calendar" right={<StatusTag live />}>
      <TradingViewWidget
        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-events.js"
        config={{
          colorTheme: "dark",
          isTransparent: true,
          locale: "en",
          importanceFilter: "-1,0,1",
          countryFilter: "us,eu,gb,jp,ca",
        }}
        height={420}
        fallbackLabel="economic calendar"
      />
    </Panel>
  );
}
