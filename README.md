# Trading Terminal

A markets dashboard: index tickers, most-active names, a Fear & Greed gauge,
sector performance, market cap leaders, a relative performance chart, an
economic calendar, market news, and an S&P 500 heatmap.

Clicking any ticker in the Most Active or Market Cap tables opens a security
detail view at `/stock/<SYMBOL>` — chart, technical analysis gauge, company
profile, fundamentals, and symbol news, with a back arrow and a Trade button
(currently a no-op placeholder).

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Recharts, lucide-react
- TradingView embed widgets (free, no API key)

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

**Live via Finnhub (free key):** sector performance (1D), biggest movers,
market cap leaders, and market/company news with source attribution.

**Live via TradingView embeds (no key needed):** ticker tape, index tickers,
relative performance comparison chart, economic calendar, heatmap, and the
chart / technical analysis / profile / fundamentals on the detail view.

**Known free-tier limits:**
- Finnhub's `/stock/candle` endpoint is premium-only (403 on free keys), so
  there is no historical OHLC or volume. "Biggest Movers" is therefore ranked
  by absolute daily move rather than volume, and the relative performance
  chart is a TradingView comparison rather than a locally drawn series.
- Fear & Greed is a computed proxy (market breadth + VIXY momentum); CNN's
  index has no public API.
- Market Snapshot (international indices, yields) stays sample data.
- The economic calendar is a cross-origin iframe, so its Actual/Forecast/Prior
  labels are an approximate strip rendered above the widget.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Deploy to Cloudflare Workers

Deployed via [OpenNext's Cloudflare adapter](https://opennext.js.org/cloudflare), which is
Cloudflare's current recommended way to run a full Next.js app (including these API routes)
on Workers — you get a free `*.workers.dev` URL out of the box.

```bash
npx wrangler login              # one-time browser auth
npm run cf:deploy               # builds + deploys
```

To enable live data in production, set the Finnhub key as a Worker secret (never commit it):

```bash
npx wrangler secret put FINNHUB_API_KEY
```

For local testing against the actual Workers runtime (as opposed to `next dev`):

```bash
cp .dev.vars.example .dev.vars  # add your key here for local preview
npm run cf:preview
```

The worker name in `wrangler.jsonc` (`tradingterminal`) determines your URL:
`https://tradingterminal.<your-subdomain>.workers.dev`. First deploy will prompt you to
claim a `workers.dev` subdomain if your account doesn't have one yet.

### Deploying via Cloudflare's git integration (Workers Builds)

If you connected the GitHub repo directly in the Cloudflare dashboard instead of using
the CLI, set:
- **Build command:** `npm run cf:build` (not `npm run build` — that skips the OpenNext
  bundling step and `wrangler deploy` will fail with a missing `.open-next/worker.js`)
- **Deploy command:** `npx wrangler deploy`

Add `FINNHUB_API_KEY` under the project's environment variables/secrets in the dashboard
to enable live data.
