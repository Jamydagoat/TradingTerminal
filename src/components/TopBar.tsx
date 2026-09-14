"use client";

import { useEffect, useState } from "react";

export function TopBar() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    const raf = requestAnimationFrame(() => setNow(new Date()));
    return () => {
      clearInterval(id);
      cancelAnimationFrame(raf);
    };
  }, []);

  const timeStr = now
    ? now.toLocaleString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "America/New_York",
      })
    : "";

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-[1600px] flex items-center gap-4 px-4 py-3">
        <div className="flex items-center gap-2 shrink-0">
          <div className="h-8 w-8 rounded-md bg-brand flex items-center justify-center text-white font-bold text-sm">
            TT
          </div>
          <span className="font-bold tracking-tight text-lg whitespace-nowrap">
            TRADING <span className="text-brand">TERMINAL</span>
          </span>
        </div>

        <div className="flex-1 max-w-md hidden sm:block">
          <input
            type="text"
            placeholder="Search ticker"
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>

        <div className="hidden md:flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5">
          <span className="rounded bg-brand px-1.5 py-0.5 text-[10px] font-bold text-white">
            LIVE
          </span>
          <span className="text-sm">News</span>
          <span className="text-[10px] text-muted">Powered by Benzinga</span>
        </div>

        <div className="ml-auto flex items-center gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-2 text-right">
            <div className="h-8 w-8 rounded-full bg-surface-2 flex items-center justify-center text-brand">
              ●
            </div>
            <div className="leading-tight text-xs">
              <div className="font-semibold">Pre-market</div>
              <div className="text-muted">{timeStr ? `${timeStr} ET` : " "}</div>
            </div>
          </div>
          <div className="h-8 w-8 rounded-full bg-surface-2" />
        </div>
      </div>
    </header>
  );
}
