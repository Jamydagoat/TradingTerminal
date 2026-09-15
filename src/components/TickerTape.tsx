"use client";

import { TradingViewWidget } from "./TradingViewWidget";

const SYMBOLS = [
  { proName: "AMEX:SPY", title: "S&P 500" },
  { proName: "NASDAQ:QQQ", title: "Nasdaq" },
  { proName: "AMEX:IWM", title: "Russell 2K" },
  { proName: "AMEX:DIA", title: "Dow Jones" },
  { proName: "NASDAQ:NVDA", title: "NVIDIA" },
  { proName: "NASDAQ:AAPL", title: "Apple" },
  { proName: "NASDAQ:MSFT", title: "Microsoft" },
  { proName: "NASDAQ:TSLA", title: "Tesla" },
  { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
];

export function TickerTape() {
  return (
    <div className="border-b border-border bg-surface min-h-[46px]">
      <TradingViewWidget
        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
        config={{
          symbols: SYMBOLS,
          showSymbolLogo: true,
          isTransparent: true,
          displayMode: "adaptive",
          colorTheme: "dark",
          locale: "en",
        }}
        fallbackLabel="ticker tape"
      />
    </div>
  );
}
