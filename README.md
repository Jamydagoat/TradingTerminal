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
