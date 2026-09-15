export type Quote = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  logo?: string;
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
  logo?: string;
};

export type NewsItem = {
  id: string;
  headline: string;
  url: string;
  source: string;
  datetime: number;
  related: string;
};

export type SnapshotRow = {
  symbol: string;
  name: string;
  flag: string;
  changePercent: number;
  value: string;
};
