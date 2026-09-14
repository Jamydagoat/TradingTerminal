"use client";

import { useEffect, useRef, useState } from "react";

export function useLiveData<T>(endpoint: string, fallback: T, intervalMs = 45000) {
  const [data, setData] = useState<T>(fallback);
  const [live, setLive] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    async function fetchOnce() {
      try {
        const res = await fetch(endpoint, { cache: "no-store" });
        if (!res.ok) return;
        const json = await res.json();
        if (!mounted.current) return;
        if (json && "data" in json) {
          setData(json.data as T);
          setLive(Boolean(json.live));
        }
      } catch {
        // keep previous data on transient errors
      }
    }

    fetchOnce();
    const id = setInterval(fetchOnce, intervalMs);
    return () => {
      mounted.current = false;
      clearInterval(id);
    };
  }, [endpoint, intervalMs]);

  return { data, live };
}
