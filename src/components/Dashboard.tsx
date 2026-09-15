"use client";

import { useLiveData } from "@/hooks/useLiveData";
import { TickersWidget } from "./TickersWidget";
import { VolumeTable } from "./VolumeTable";
import { FearGreedGauge } from "./FearGreedGauge";
import { SectorPerformance } from "./SectorPerformance";
import { MarketSnapshot } from "./MarketSnapshot";
import { MarketCapTable } from "./MarketCapTable";
import { PerformanceChart } from "./PerformanceChart";
import { EconomicCalendarWidget } from "./EconomicCalendarWidget";
import { StockHeatmapWidget } from "./StockHeatmapWidget";
import { TopStoriesWidget } from "./TopStoriesWidget";
import {
  biggestVolume as mockVolume,
  sectorPerformance as mockSectors,
  marketSnapshot,
  marketCap as mockMarketCap,
  performanceSeries as mockPerformance,
  fearGreed as mockFearGreed,
} from "@/lib/mockData";
import type { Quote, SectorData, MarketCapRow, PerformanceSeries } from "@/lib/types";

export function Dashboard() {
  const volume = useLiveData<Quote[]>("/api/volume", mockVolume, 45000);
  const feargreed = useLiveData<typeof mockFearGreed & { estimated?: boolean }>(
    "/api/feargreed",
    mockFearGreed,
    60000
  );
  const sectors = useLiveData<SectorData[]>("/api/sectors", mockSectors, 45000);
  const marketCap = useLiveData<MarketCapRow[]>("/api/marketcap", mockMarketCap, 300000);
  const performance = useLiveData<PerformanceSeries[]>("/api/performance", mockPerformance, 300000);

  return (
    <main className="w-full flex-1 py-3 space-y-3">
      <TickersWidget />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-stretch">
        <VolumeTable data={volume.data} live={volume.live} />
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
        <PerformanceChart series={performance.data} live={performance.live} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">
        <EconomicCalendarWidget />
        <TopStoriesWidget />
      </div>

      <StockHeatmapWidget />
    </main>
  );
}
