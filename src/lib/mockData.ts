import type {
  IndexCardData,
  SectorData,
  MarketCapRow,
  SnapshotRow,
  CalendarEvent,
  HeatmapTile,
  PerformanceSeries,
  Quote,
} from "./types";

function spark(seed: number, points = 24, drift = -1): number[] {
  const out: number[] = [];
  let v = 100;
  for (let i = 0; i < points; i++) {
    v += Math.sin(i * 0.7 + seed) * 2 + drift * 0.3 + (Math.random() - 0.5);
    out.push(v);
  }
  return out;
}

export const indexCards: IndexCardData[] = [
  {
    symbol: "SPY",
    name: "S&P 500",
    price: 759.68,
    marketClosedPrice: 764.29,
    preMarketPrice: 759.68,
    change: -4.61,
    changePercent: -0.6,
    preMarketChangePercent: -0.6,
    sparkline: spark(1),
  },
  {
    symbol: "QQQ",
    name: "Nasdaq",
    price: 704.33,
    marketClosedPrice: 714.88,
    preMarketPrice: 704.33,
    change: -10.55,
    changePercent: -1.48,
    preMarketChangePercent: -1.48,
    sparkline: spark(2),
  },
  {
    symbol: "IWM",
    name: "Russell 2K",
    price: 287.75,
    marketClosedPrice: 288.89,
    preMarketPrice: 287.75,
    change: -1.14,
    changePercent: -0.39,
    preMarketChangePercent: -0.39,
    sparkline: spark(3),
  },
  {
    symbol: "DIA",
    name: "Dow Jones",
    price: 524.53,
    marketClosedPrice: 525.79,
    preMarketPrice: 524.53,
    change: -1.26,
    changePercent: -0.24,
    preMarketChangePercent: -0.24,
    sparkline: spark(4),
  },
];

export const biggestVolume: Quote[] = [
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

export const marketSnapshot: SnapshotRow[] = [
  { symbol: "TNX", name: "10-Year Yield", flag: "us", changePercent: 0.61, value: "4.97%" },
  { symbol: "VIX", name: "S&P 500 Volatility", flag: "us", changePercent: 10.48, value: "17.50" },
  { symbol: "VXN", name: "Nasdaq 100 Volatility", flag: "us", changePercent: -9.9, value: "21.02" },
  { symbol: "SKEW", name: "S&P 500 SKEW", flag: "us", changePercent: 5.08, value: "154.49" },
  { symbol: "N225", name: "Nikkei 225", flag: "jp", changePercent: -0.81, value: "63,493" },
  { symbol: "FTSE", name: "FTSE 100", flag: "gb", changePercent: 0.64, value: "10,718" },
  { symbol: "GSPTSE", name: "S&P/TSX Composite", flag: "ca", changePercent: 0.54, value: "35,697" },
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

export const economicCalendar: CalendarEvent[] = [
  { time: "11:30 AM ET", event: "6-Month Bill Auction", est: "-", actual: "-", impact: 2 },
  { time: "11:30 AM ET", event: "3-Month Bill Auction", est: "3.81%", actual: "-", impact: 2 },
];

export const heatmap: HeatmapTile[] = [
  { symbol: "NVDA", name: "NVIDIA", changePercent: -2.35, sector: "Technology" },
  { symbol: "AAPL", name: "Apple", changePercent: 0.43, sector: "Technology" },
  { symbol: "MSFT", name: "Microsoft", changePercent: 0.26, sector: "Technology" },
  { symbol: "GOOGL", name: "Alphabet", changePercent: 1.62, sector: "Communication" },
  { symbol: "META", name: "Meta", changePercent: 2.46, sector: "Communication" },
  { symbol: "AMZN", name: "Amazon", changePercent: -0.69, sector: "Consumer Cyclical" },
  { symbol: "TSLA", name: "Tesla", changePercent: -1.8, sector: "Consumer Cyclical" },
];

function buildSeries(symbol: string, color: string, total: number): PerformanceSeries {
  const points: { date: string; value: number }[] = [];
  let v = 0;
  const months = ["Sep 25", "Oct", "Nov", "Dec", "Jan 26", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep 26"];
  for (let i = 0; i < months.length; i++) {
    const t = i / (months.length - 1);
    v = total * t + Math.sin(i * 1.3) * (total * 0.25);
    points.push({ date: months[i], value: Number(v.toFixed(2)) });
  }
  points[points.length - 1].value = total;
  return { symbol, color, totalReturnPercent: total, points };
}

export const performanceSeries: PerformanceSeries[] = [
  buildSeries("QQQ", "#3b82f6", 22.39),
  buildSeries("IWM", "#f59e0b", 19.97),
  buildSeries("SPY", "#ef4444", 16.22),
  buildSeries("DIA", "#10b981", 13.83),
];

export const fearGreed = {
  score: 33,
  label: "Fear",
  lastUpdated: "Sep 14, 7:25 AM ET",
};
