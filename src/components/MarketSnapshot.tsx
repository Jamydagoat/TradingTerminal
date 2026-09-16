"use client";

import { Panel, StatusTag } from "./Panel";
import { TradingViewWidget } from "./TradingViewWidget";

/**
 * Finnhub's free tier covers US stocks and ETFs only — no yields, no
 * volatility indices, no international benchmarks. This widget carries the
 * real values instead of ETF proxies that would only approximate them.
 * Exchange data here is delayed; forex is real-time.
 */
const SYMBOL_GROUPS = [
  {
    name: "Volatility & Rates",
    originalName: "Volatility & Rates",
    symbols: [
      { name: "CBOE:VIX", displayName: "VIX" },
      { name: "TVC:US10Y", displayName: "US 10Y" },
      { name: "TVC:US02Y", displayName: "US 2Y" },
      { name: "TVC:DXY", displayName: "Dollar Index" },
    ],
  },
  {
    name: "Global Indices",
    originalName: "Global Indices",
    symbols: [
      { name: "TVC:NI225", displayName: "Nikkei 225" },
      { name: "TVC:UKX", displayName: "FTSE 100" },
      { name: "TVC:DAX", displayName: "DAX" },
      { name: "TVC:HSI", displayName: "Hang Seng" },
    ],
  },
  {
    name: "Commodities",
    originalName: "Commodities",
    symbols: [
      { name: "TVC:GOLD", displayName: "Gold" },
      { name: "TVC:USOIL", displayName: "Crude Oil" },
    ],
  },
];

export function MarketSnapshot({ height = 332 }: { height?: number }) {
  return (
    <Panel title="Market Snapshot" right={<StatusTag live />}>
      <TradingViewWidget
        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js"
        config={{
          symbolsGroups: SYMBOL_GROUPS,
          showSymbolLogo: true,
          isTransparent: true,
          colorTheme: "dark",
          locale: "en",
          backgroundColor: "rgba(20, 20, 22, 1)",
        }}
        height={height}
        interactive={false}
        fallbackLabel="market snapshot"
      />
    </Panel>
  );
}
