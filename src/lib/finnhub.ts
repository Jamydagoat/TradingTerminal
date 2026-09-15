const BASE = "https://finnhub.io/api/v1";

export const QUOTE_REVALIDATE = 45;
export const CANDLE_REVALIDATE = 300;
export const PROFILE_REVALIDATE = 86400;

export function hasFinnhubKey() {
  return Boolean(process.env.FINNHUB_API_KEY);
}

async function finnhubGet<T>(
  path: string,
  params: Record<string, string | number>,
  revalidate: number
): Promise<T | null> {
  const key = process.env.FINNHUB_API_KEY;
  if (!key) return null;

  const url = new URL(`${BASE}${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  url.searchParams.set("token", key);

  try {
    const res = await fetch(url.toString(), { next: { revalidate } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export type FinnhubQuote = {
  c: number; // current price
  d: number; // change
  dp: number; // percent change
  h: number;
  l: number;
  o: number;
  pc: number; // previous close
  t: number;
};

export type FinnhubCandle = {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  s: string;
  t: number[];
  v: number[];
};

export type FinnhubProfile = {
  name?: string;
  marketCapitalization?: number; // in millions
  ticker?: string;
  logo?: string;
};

export function getQuote(symbol: string) {
  return finnhubGet<FinnhubQuote>("/quote", { symbol }, QUOTE_REVALIDATE);
}

export function getQuotes(symbols: string[]) {
  return Promise.all(symbols.map((s) => getQuote(s).then((q) => [s, q] as const)));
}

export function getDailyCandle(symbol: string, days: number) {
  const to = Math.floor(Date.now() / 1000);
  const from = to - days * 24 * 60 * 60;
  return finnhubGet<FinnhubCandle>(
    "/stock/candle",
    { symbol, resolution: "D", from, to },
    CANDLE_REVALIDATE
  );
}

export function getMonthlyCandle(symbol: string, months: number) {
  const to = Math.floor(Date.now() / 1000);
  const from = to - months * 31 * 24 * 60 * 60;
  return finnhubGet<FinnhubCandle>(
    "/stock/candle",
    { symbol, resolution: "M", from, to },
    CANDLE_REVALIDATE
  );
}

export function getProfile(symbol: string) {
  return finnhubGet<FinnhubProfile>("/stock/profile2", { symbol }, PROFILE_REVALIDATE);
}
