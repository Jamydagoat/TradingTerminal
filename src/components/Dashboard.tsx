"use client";

import { useLiveData } from "@/hooks/useLiveData";
import { IndexCards } from "./IndexCards";
import { VolumeTable } from "./VolumeTable";
import { FearGreedGauge } from "./FearGreedGauge";
import { SectorPerformance } from "./SectorPerformance";
import { MarketSnapshot } from "./MarketSnapshot";
import { MarketCapTable } from "./MarketCapTable";
import { PerformanceChart } from "./PerformanceChart";
import { EconomicCalendar } from "./EconomicCalendar";
import { Heatmap } from "./Heatmap";
import {
  indexCards as mockIndexCards,
  biggestVolume as mockVolume,
  sectorPerformance as mockSectors,
  marketSnapshot,
  marketCap as mockMarketCap,
  performanceSeries as mockPerformance,
  economicCalendar,
  heatmap as mockHeatmap,
  fearGreed as mockFearGreed,
} from "@/lib/mockData";
import type {
  IndexCardData,
  Quote,
  SectorData,
  MarketCapRow,
  PerformanceSeries,
  HeatmapTile,
} from "@/lib/types";

function LiveDot({ live }: { live: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide"
      title={live ? "Live data from Finnhub" : "Static sample data — set FINNHUB_API_KEY to go live"}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-up animate-pulse" : "bg-muted"}`} />
      <span className={live ? "text-up" : "text-muted"}>{live ? "Live" : "Sample"}</span>
    </span>
  );
}

export function Dashboard() {
  const indices = useLiveData<IndexCardData[]>("/api/indices", mockIndexCards, 45000);
  const volume = useLiveData<Quote[]>("/api/volume", mockVolume, 45000);
  const feargreed = useLiveData<typeof mockFearGreed & { estimated?: boolean }>(
    "/api/feargreed",
    mockFearGreed,
    60000
  );
  const sectors = useLiveData<SectorData[]>("/api/sectors", mockSectors, 45000);
  const marketCap = useLiveData<MarketCapRow[]>("/api/marketcap", mockMarketCap, 300000);
  const performance = useLiveData<PerformanceSeries[]>("/api/performance", mockPerformance, 300000);
  const heatmap = useLiveData<HeatmapTile[]>("/api/heatmap", mockHeatmap, 45000);

  return (
    <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 py-4 space-y-4">
      <IndexCards data={indices.data} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        <div className="relative h-full">
          <VolumeTable data={volume.data} />
          <div className="absolute right-4 top-3.5">
            <LiveDot live={volume.live} />
          </div>
        </div>
        <div className="relative h-full">
          <FearGreedGauge score={feargreed.data.score} lastUpdated={feargreed.data.lastUpdated} />
          <div className="absolute right-4 top-3.5">
            <LiveDot live={feargreed.live} />
          </div>
        </div>
        <div className="relative h-full">
          <SectorPerformance data={sectors.data} />
          <div className="absolute right-16 top-3.5">
            <LiveDot live={sectors.live} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        <div className="relative h-full">
          <MarketSnapshot data={marketSnapshot} />
          <div className="absolute right-4 top-3.5">
            <LiveDot live={false} />
          </div>
        </div>
        <div className="relative h-full">
          <MarketCapTable data={marketCap.data} />
          <div className="absolute right-4 top-3.5">
            <LiveDot live={marketCap.live} />
          </div>
        </div>
        <div className="relative h-full">
          <PerformanceChart series={performance.data} />
          <div className="absolute right-16 top-3.5">
            <LiveDot live={performance.live} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
        <div className="relative h-full">
          <EconomicCalendar data={economicCalendar} />
          <div className="absolute right-16 top-3.5">
            <LiveDot live={false} />
          </div>
        </div>
        <div className="relative h-full">
          <Heatmap data={heatmap.data} />
          <div className="absolute right-16 top-3.5">
            <LiveDot live={heatmap.live} />
          </div>
        </div>
      </div>
    </main>
  );
}
