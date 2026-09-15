"use client";

import { useLiveData } from "@/hooks/useLiveData";
import { marketNews as mockNews } from "@/lib/mockData";
import type { NewsItem } from "@/lib/types";
import { Panel, StatusTag } from "./Panel";

function relativeTime(epochSeconds: number): string {
  if (!epochSeconds) return "";
  const mins = Math.round((Date.now() - epochSeconds * 1000) / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.round(hours / 24)}d`;
}

export function NewsFeed({ symbol, height = 420 }: { symbol?: string; height?: number }) {
  const endpoint = symbol ? `/api/news?symbol=${encodeURIComponent(symbol)}` : "/api/news";
  const { data, live } = useLiveData<NewsItem[]>(endpoint, mockNews, 300000);

  return (
    <Panel title={symbol ? "News" : "Market News"} right={<StatusTag live={live} />}>
      <div className="overflow-y-auto" style={{ height }}>
        {data.length === 0 && (
          <div className="flex h-full items-center justify-center text-xs text-faint">
            No recent headlines.
          </div>
        )}
        {data.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-b border-border px-3 py-2.5 last:border-0 hover:bg-surface-2"
          >
            <div className="text-[13px] leading-snug text-foreground/90">{item.headline}</div>
            <div className="mt-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.06em] text-faint">
              {item.source && <span className="text-muted">{item.source}</span>}
              {item.datetime > 0 && <span>{relativeTime(item.datetime)}</span>}
            </div>
          </a>
        ))}
      </div>
    </Panel>
  );
}
