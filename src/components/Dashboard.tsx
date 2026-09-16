"use client";

import { useLiveData } from "@/hooks/useLiveData";
import { TickersWidget } from "./TickersWidget";
import { DailyRundown } from "./DailyRundown";
import { MoversTable } from "./MoversTable";
import { FearGreedGauge } from "./FearGreedGauge";
import { SectorPerformance } from "./SectorPerformance";
import { MarketSnapshot } from "./MarketSnapshot";
import { MarketCapTable } from "./MarketCapTable";
import { RelativePerformance } from "./RelativePerformance";
import { EconomicCalendarWidget } from "./EconomicCalendarWidget";
import { StockHeatmapWidget } from "./StockHeatmapWidget";
import { NewsFeed } from "./NewsFeed";
import { LiveFeed } from "./LiveFeed";
import { Resizable } from "./Resizable";
import {
  biggestMovers as mockMovers,
  sectorPerformance as mockSectors,
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

      <DailyRundown />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-start">
        <Resizable
          storageKey="movers"
          defaultHeight={340}
          render={() => <MoversTable data={movers.data} live={movers.live} />}
        />
        <Resizable
          storageKey="feargreed"
          defaultHeight={340}
          render={() => (
            <FearGreedGauge
              score={feargreed.data.score}
              lastUpdated={feargreed.data.lastUpdated}
              live={feargreed.live}
            />
          )}
        />
        <Resizable
          storageKey="sectors"
          defaultHeight={340}
          render={() => <SectorPerformance data={sectors.data} live={sectors.live} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-start">
        <Resizable
          storageKey="snapshot"
          defaultHeight={372}
          render={(h) => <MarketSnapshot height={h - 40} />}
        />
        <Resizable
          storageKey="marketcap"
          defaultHeight={372}
          render={() => <MarketCapTable data={marketCap.data} live={marketCap.live} />}
        />
        <Resizable
          storageKey="performance"
          defaultHeight={400}
          render={(h) => <RelativePerformance height={h - 40} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 items-start">
        <div className="lg:col-span-2">
          <Resizable
            storageKey="calendar"
            defaultHeight={456}
            render={(h) => <EconomicCalendarWidget height={h - 64} />}
          />
        </div>
        <Resizable
          storageKey="news"
          defaultHeight={456}
          render={(h) => <NewsFeed height={h - 40} />}
        />
        <Resizable
          storageKey="livefeed"
          defaultHeight={456}
          render={(h) => <LiveFeed height={h - 40} />}
        />
      </div>

      <Resizable
        storageKey="heatmap"
        defaultHeight={660}
        render={(h) => <StockHeatmapWidget height={h - 40} />}
      />
    </main>
  );
}
