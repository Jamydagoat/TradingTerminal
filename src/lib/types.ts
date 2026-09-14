export type Quote = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
};

export type IndexCardData = Quote & {
  marketClosedPrice: number;
  preMarketPrice: number;
  preMarketChangePercent: number;
  sparkline: number[];
};

export type SectorData = {
  name: string;
  icon: string;
  changePercent: number;
};

export type MarketCapRow = {
  symbol: string;
  name: string;
  marketCapTrillions: number;
  price: number;
};

export type SnapshotRow = {
  symbol: string;
  name: string;
  flag: string;
  changePercent: number;
  value: string;
};

export type CalendarEvent = {
  time: string;
  event: string;
  est: string;
  actual: string;
  impact: 1 | 2 | 3;
};

export type HeatmapTile = {
  symbol: string;
  name: string;
  changePercent: number;
  sector: string;
};

export type PerformanceSeries = {
  symbol: string;
  color: string;
  totalReturnPercent: number;
  points: { date: string; value: number }[];
};
