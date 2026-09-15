"use client";

import { useLiveData } from "@/hooks/useLiveData";
import { TickersWidget } from "./TickersWidget";
import { MoversTable } from "./MoversTable";
import { FearGreedGauge } from "./FearGreedGauge";
import { SectorPerformance } from "./SectorPerformance";
import { MarketSnapshot } from "./MarketSnapshot";
import { MarketCapTable } from "./MarketCapTable";
import { RelativePerformance } from "./RelativePerformance";
import { EconomicCalendarWidget } from "./EconomicCalendarWidget";
import { StockHeatmapWidget } from "./StockHeatmapWidget";
import { NewsFeed } from "./NewsFeed";
import {
  biggestMovers as mockMovers,
  sectorPerformance as mockSectors,
  marketSnapshot,
  marketCap as mockMarketCap,
  fearGreed as mockFearGreed,
} from "@/lib/mockData";
import type { Quote, SectorData, MarketCapRow } from "@/lib/types";

export function Dashboard() {
  const movers = useLiveData<Quote[]>("/api/movers", mockMovers, 45000);
  const feargreed = useLiveData<typeof mockFearGreed & { estimated?: boolean }>(
    "/api/feargreed",
    mockFearGreed,
    60000
  );
  const sectors = useLiveData<SectorData[]>("/api/sectors", mockSectors, 45000);
  const marketCap = useLiveData<MarketCapRow[]>("/api/marketcap", mockMarketCap, 300000);

  return (
    <main className="w-full flex-1 py-3 space-y-3">
      <TickersWidget />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-stretch">
        <MoversTable data={movers.data} live={movers.live} />
        <FearGreedGauge
          score={feargreed.data.score}
          lastUpdated={feargreed.data.lastUpdated}
          live={feargreed.live}
        />
        <SectorPerformance data={sectors.data} live={sectors.live} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-stretch">
        <MarketSnapshot data={marketSnapshot} />
        <MarketCapTable data={marketCap.data} live={marketCap.live} />
        <RelativePerformance />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">
        <EconomicCalendarWidget />
        <NewsFeed />
      </div>

      <StockHeatmapWidget />
    </main>
  );
}
