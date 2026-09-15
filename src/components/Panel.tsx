import type { ReactNode } from "react";

export function Panel({
  title,
  right,
  children,
  className = "",
}: {
  title?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`h-full rounded-md border border-border bg-surface flex flex-col overflow-hidden ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between gap-2 px-3 h-9 border-b border-border shrink-0">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
            {title}
          </h2>
          {right}
        </div>
      )}
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}

export function StatusTag({ live }: { live: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-faint"
      title={
        live
          ? "Live data"
          : "Sample data — set FINNHUB_API_KEY to go live"
      }
    >
      <span className={`h-1 w-1 rounded-full ${live ? "bg-up" : "bg-faint"}`} />
      {live ? "Live" : "Sample"}
    </span>
  );
}

export function RangeTag({ label }: { label: string }) {
  return (
    <span className="rounded border border-border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.06em] text-faint">
      {label}
    </span>
  );
}

export function ChangeText({ value, suffix = "%" }: { value: number; suffix?: string }) {
  const up = value >= 0;
  return (
    <span className={up ? "text-up" : "text-down"}>
      {up ? "+" : ""}
      {value.toFixed(2)}
      {suffix}
    </span>
  );
}
