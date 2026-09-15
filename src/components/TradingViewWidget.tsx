"use client";

import { useEffect, useRef } from "react";

/**
 * TradingView's scripts size their injected iframe from the config values at
 * load time. Percentage heights race the surrounding flex layout and collapse,
 * so the container is always given a definite pixel height instead.
 */
export function TradingViewWidget({
  scriptSrc,
  config,
  height,
  fallbackLabel = "widget",
  interactive = true,
}: {
  scriptSrc: string;
  config: Record<string, unknown>;
  height: number;
  fallbackLabel?: string;
  /** false locks the widget: no zoom, pan, or scroll inside the iframe. */
  interactive?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const configJson = JSON.stringify({ ...config, width: "100%", height });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.innerHTML = "";
    const widgetDiv = document.createElement("div");
    widgetDiv.className = "tradingview-widget-container__widget";
    widgetDiv.style.height = "100%";
    widgetDiv.style.width = "100%";
    el.appendChild(widgetDiv);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = scriptSrc;
    script.async = true;
    script.textContent = configJson;
    script.onerror = () => {
      widgetDiv.innerHTML = `<div style="display:flex;height:100%;align-items:center;justify-content:center;padding:8px;text-align:center;font-size:12px;color:#8b8b93">Couldn't load the ${fallbackLabel} — check your connection or ad blocker.</div>`;
    };
    el.appendChild(script);

    return () => {
      el.innerHTML = "";
    };
  }, [scriptSrc, configJson, fallbackLabel]);

  return (
    <div
      className={`tradingview-widget-container w-full overflow-hidden ${
        interactive ? "" : "pointer-events-none select-none"
      }`}
      style={{ height }}
      ref={ref}
    />
  );
}
