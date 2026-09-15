import type { SectorData, MarketCapRow, NewsItem, Quote } from "./types";

export const biggestMovers: Quote[] = [
  { symbol: "NOK", name: "Nokia Corporation", price: 10.1, change: -1.04, changePercent: -9.34 },
  { symbol: "NVDA", name: "Nvidia Corp", price: 213.15, change: -5.04, changePercent: -2.31 },
  { symbol: "CRBP", name: "Corbus Pharmaceuticals", price: 9.14, change: 1.01, changePercent: 12.42 },
  { symbol: "RUM", name: "RUM Group", price: 7.98, change: 0.81, changePercent: 11.26 },
  { symbol: "ELMT", name: "The Elmet", price: 23.62, change: 7.42, changePercent: 45.86 },
  { symbol: "INTC", name: "Intel Corp", price: 96.7, change: -6.22, changePercent: -6.04 },
];

export const sectorPerformance: SectorData[] = [
  { name: "Energy", icon: "zap", changePercent: 1.23 },
  { name: "Communication Services", icon: "phone", changePercent: 0.99 },
  { name: "Health Care", icon: "heart", changePercent: 0.93 },
  { name: "Consumer Staples", icon: "shopping-basket", changePercent: 0.86 },
  { name: "Financials", icon: "landmark", changePercent: 0.45 },
  { name: "Real Estate", icon: "building", changePercent: 0.28 },
  { name: "Utilities", icon: "lightbulb", changePercent: -0.21 },
  { name: "Consumer Discretionary", icon: "shopping-cart", changePercent: -0.5 },
  { name: "Basic Materials", icon: "shuffle", changePercent: -0.88 },
  { name: "Technology", icon: "monitor", changePercent: -2.0 },
];


export const marketCap: MarketCapRow[] = [
  { symbol: "NVDA", name: "NVIDIA Corporation", marketCapTrillions: 5.287, price: 213.15 },
  { symbol: "AAPL", name: "Apple Inc.", marketCapTrillions: 4.88, price: 333.88 },
  { symbol: "GOOG", name: "Alphabet Inc.", marketCapTrillions: 4.071, price: 340.0 },
  { symbol: "MSFT", name: "Microsoft Corporation", marketCapTrillions: 3.68, price: 497.0 },
  { symbol: "AMZN", name: "Amazon.com, Inc.", marketCapTrillions: 2.762, price: 254.95 },
  { symbol: "SPCX", name: "Space Exploration", marketCapTrillions: 1.977, price: 148.06 },
  { symbol: "AVGO", name: "Broadcom Inc.", marketCapTrillions: 1.722, price: 350.03 },
];

export const fearGreed = {
  score: 33,
  label: "Fear",
  lastUpdated: "Sep 14, 7:25 AM ET",
};

export const marketNews: NewsItem[] = [
  {
    id: "sample-1",
    headline: "Futures steady as investors weigh rate path ahead of inflation print",
    url: "https://finnhub.io/",
    source: "Reuters",
    datetime: 0,
    related: "",
  },
  {
    id: "sample-2",
    headline: "Chip stocks lead premarket declines after cautious sector guidance",
    url: "https://finnhub.io/",
    source: "CNBC",
    datetime: 0,
    related: "",
  },
  {
    id: "sample-3",
    headline: "Treasury yields edge higher as traders trim rate-cut expectations",
    url: "https://finnhub.io/",
    source: "MarketWatch",
    datetime: 0,
    related: "",
  },
];
