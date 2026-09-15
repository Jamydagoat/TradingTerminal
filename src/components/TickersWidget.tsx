"use client";

import { Panel } from "./Panel";
import { TradingViewWidget } from "./TradingViewWidget";

const SYMBOLS = [
  { proName: "AMEX:SPY", title: "S&P 500" },
  { proName: "NASDAQ:QQQ", title: "Nasdaq" },
  { proName: "AMEX:IWM", title: "Russell 2K" },
  { proName: "AMEX:DIA", title: "Dow Jones" },
];

export function TickersWidget() {
  return (
    <Panel className="min-h-[110px]">
      <TradingViewWidget
        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-tickers.js"
        config={{
          symbols: SYMBOLS,
          colorTheme: "dark",
          isTransparent: true,
          showSymbolLogo: true,
          locale: "en",
        }}
        containerClassName="h-full"
        className="h-full"
        fallbackLabel="index tickers"
      />
    </Panel>
  );
}
