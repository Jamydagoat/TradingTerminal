"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { Rundown } from "@/lib/types";
import { Panel, StatusTag } from "./Panel";

type State =
  | { status: "loading" }
  | { status: "ready"; data: Rundown }
  | { status: "unavailable"; reason: string };

export function DailyRundown() {
  const [state, setState] = useState<State>({ status: "loading" });
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    async function load() {
      try {
        const res = await fetch("/api/rundown", { cache: "no-store" });
        const json = await res.json();
        if (!mounted.current) return;
        if (json?.live && json.data) {
          setState({ status: "ready", data: json.data as Rundown });
        } else {
          setState({
            status: "unavailable",
            reason: json?.error ?? "Rundown unavailable.",
          });
        }
      } catch {
        if (mounted.current) {
          setState({ status: "unavailable", reason: "Couldn't reach the rundown service." });
        }
      }
    }

    load();
    // Regenerates at most once per day server-side; this just picks up the rollover.
    const id = setInterval(load, 1_800_000);
    return () => {
      mounted.current = false;
      clearInterval(id);
    };
  }, []);

  return (
    <Panel
      title="Today's Rundown"
      right={
        <span className="flex items-center gap-2">
          <StatusTag live={state.status === "ready"} />
          <span className="flex items-center gap-1 text-[10px] uppercase tracking-[0.08em] text-faint">
            <Sparkles className="h-3 w-3" />
            AI
          </span>
        </span>
      }
    >
      <div className="px-3 py-3">
        {state.status === "loading" && (
          <div className="text-[13px] text-faint">Generating today&apos;s brief…</div>
        )}

        {state.status === "unavailable" && (
          <div className="text-[13px] text-faint">{state.reason}</div>
        )}

        {state.status === "ready" && (
          <div className="flex flex-col gap-3 lg:flex-row lg:gap-6">
            <p className="flex-1 text-[13px] leading-relaxed text-foreground/90">
              {state.data.summary}
            </p>

            {state.data.watchlist.length > 0 && (
              <div className="lg:w-[46%] lg:shrink-0">
                <div className="mb-1.5 text-[10px] uppercase tracking-[0.08em] text-faint">
                  Watching
                </div>
                <ul className="flex flex-col gap-1.5">
                  {state.data.watchlist.map((item) => (
                    <li key={item.symbol} className="flex gap-2 text-[13px]">
                      <Link
                        href={`/stock/${item.symbol}`}
                        className="shrink-0 rounded-sm border border-border bg-surface-2 px-1.5 py-0.5 font-medium tabular hover:border-border-strong"
                      >
                        {item.symbol}
                      </Link>
                      <span className="text-muted leading-relaxed">{item.catalyst}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </Panel>
  );
}
