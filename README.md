# Trading Terminal

A markets dashboard inspired by tradingterminal.com — index cards, biggest
pre-market movers, a Fear & Greed gauge, sector performance, market cap
leaders, a normalized 1Y performance chart, an economic calendar, and a
sector heatmap.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Recharts

## Live data

Every panel ships with realistic sample data out of the box — no setup
required. Panels are tagged **Sample** or **Live** in their top-right corner.

To turn on live quotes, get a free API key at
[finnhub.io](https://finnhub.io/register) (no credit card, real-time
US stock/ETF quotes, 60 requests/min) and set it locally:

```bash
cp .env.local.example .env.local
# edit .env.local and paste your key into FINNHUB_API_KEY
npm run dev
```

**Live via Finnhub:** index cards, sector performance, market cap table,
heatmap, biggest-volume table, and the normalized performance chart.

**Not live (no reliable free source, stays Sample):**
- Fear & Greed Index score is a computed proxy (market breadth + VIXY
  momentum) since CNN's index has no public API.
- Market Snapshot (international indices, yields) and the Economic
  Calendar need a paid data feed on Finnhub's side, so these stay as
  sample data.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```
