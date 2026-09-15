"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function SymbolHeader({ symbol }: { symbol: string }) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 border-b border-border bg-surface px-3 h-14 shrink-0">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Back to dashboard"
        className="flex h-8 w-8 items-center justify-center rounded border border-border text-muted transition-colors hover:border-border-strong hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>

      <div className="min-w-0">
        <div className="text-sm font-semibold tracking-tight">{symbol}</div>
        <div className="text-[11px] uppercase tracking-[0.08em] text-faint">
          Security overview
        </div>
      </div>

      <button
        type="button"
        className="ml-auto rounded border border-accent/50 bg-accent/10 px-4 h-8 text-xs font-semibold uppercase tracking-[0.08em] text-accent transition-colors hover:bg-accent/20"
      >
        Trade
      </button>
    </div>
  );
}
