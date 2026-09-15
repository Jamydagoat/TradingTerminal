"use client";

import { useState } from "react";

function colorForSymbol(symbol: string): string {
  let hash = 0;
  for (let i = 0; i < symbol.length; i++) {
    hash = symbol.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 18%, 26%)`;
}

export function Avatar({
  symbol,
  logo,
  className = "h-6 w-6",
}: {
  symbol: string;
  logo?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (logo && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo}
        alt=""
        className={`${className} shrink-0 rounded-full bg-white/90 object-contain p-1`}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div
      className={`${className} shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold text-white/90`}
      style={{ background: colorForSymbol(symbol) }}
    >
      {symbol.slice(0, 2)}
    </div>
  );
}
