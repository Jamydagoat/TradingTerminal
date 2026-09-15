"use client";

import { useEffect, useRef } from "react";

export function TradingViewWidget({
  scriptSrc,
  config,
  className = "",
  containerClassName = "",
  fallbackLabel = "widget",
}: {
  scriptSrc: string;
  config: Record<string, unknown>;
  className?: string;
  containerClassName?: string;
  fallbackLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const configJson = JSON.stringify(config);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.innerHTML = "";
    const widgetDiv = document.createElement("div");
    widgetDiv.className = `tradingview-widget-container__widget ${className}`;
    el.appendChild(widgetDiv);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = scriptSrc;
    script.async = true;
    script.textContent = configJson;
    script.onerror = () => {
      widgetDiv.innerHTML = `<div class="flex h-full min-h-[44px] items-center justify-center text-xs text-muted p-2 text-center">Couldn't load the ${fallbackLabel} — check your connection or ad blocker.</div>`;
    };
    el.appendChild(script);

    return () => {
      el.innerHTML = "";
    };
  }, [scriptSrc, configJson, className, fallbackLabel]);

  return (
    <div className={`tradingview-widget-container ${containerClassName}`} ref={ref}>
      <div className={`tradingview-widget-container__widget ${className}`} />
    </div>
  );
}
