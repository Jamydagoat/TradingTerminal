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
      className={`h-full rounded-xl border border-border bg-surface flex flex-col overflow-hidden ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
          <h2 className="text-[15px] font-semibold text-foreground">{title}</h2>
          {right}
        </div>
      )}
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}

export function ChangeBadge({ value }: { value: number }) {
  const up = value >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ${
        up ? "bg-up/15 text-up" : "bg-down/15 text-down"
      }`}
    >
      {up ? "↗" : "↘"} {Math.abs(value).toFixed(2)}%
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
