export const INDEX_SYMBOLS = [
  { symbol: "SPY", name: "S&P 500" },
  { symbol: "QQQ", name: "Nasdaq" },
  { symbol: "IWM", name: "Russell 2K" },
  { symbol: "DIA", name: "Dow Jones" },
] as const;

export const SECTOR_ETFS = [
  { symbol: "XLE", name: "Energy", icon: "zap" },
  { symbol: "XLC", name: "Communication Services", icon: "phone" },
  { symbol: "XLV", name: "Health Care", icon: "heart" },
  { symbol: "XLP", name: "Consumer Staples", icon: "shopping-basket" },
  { symbol: "XLF", name: "Financials", icon: "landmark" },
  { symbol: "XLRE", name: "Real Estate", icon: "building" },
  { symbol: "XLU", name: "Utilities", icon: "lightbulb" },
  { symbol: "XLY", name: "Consumer Discretionary", icon: "shopping-cart" },
  { symbol: "XLB", name: "Basic Materials", icon: "shuffle" },
  { symbol: "XLK", name: "Technology", icon: "monitor" },
] as const;

export const MEGACAPS = [
  { symbol: "NVDA", name: "NVIDIA Corporation", sector: "Technology" },
  { symbol: "AAPL", name: "Apple Inc.", sector: "Technology" },
  { symbol: "MSFT", name: "Microsoft Corporation", sector: "Technology" },
  { symbol: "GOOGL", name: "Alphabet Inc.", sector: "Communication" },
  { symbol: "META", name: "Meta Platforms, Inc.", sector: "Communication" },
  { symbol: "AMZN", name: "Amazon.com, Inc.", sector: "Consumer Cyclical" },
  { symbol: "TSLA", name: "Tesla, Inc.", sector: "Consumer Cyclical" },
  { symbol: "AVGO", name: "Broadcom Inc.", sector: "Technology" },
] as const;

export const VOLUME_WATCHLIST = [
  "NVDA",
  "AAPL",
  "TSLA",
  "AMD",
  "INTC",
  "PLTR",
  "SOFI",
  "F",
  "BAC",
  "NIO",
  "AMZN",
  "META",
] as const;

export const VOLATILITY_PROXY_SYMBOL = "VIXY";
