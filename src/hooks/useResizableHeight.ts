"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MIN_HEIGHT = 120;
const MAX_HEIGHT = 1400;

/**
 * Per-panel height persisted to localStorage. Returns the committed height
 * separately from the live drag height: TradingView widgets re-initialise
 * whenever their height changes, so feeding them every mousemove would thrash
 * the iframe. Panels read `height` while dragging and re-init once on release.
 */
export function useResizableHeight(storageKey: string, defaultHeight: number) {
  const [height, setHeight] = useState(defaultHeight);
  const [committed, setCommitted] = useState(defaultHeight);
  const [dragging, setDragging] = useState(false);
  const startRef = useRef({ y: 0, height: defaultHeight });

  useEffect(() => {
    // Deferred a frame rather than read during render: localStorage is not
    // available server-side, so reading it synchronously would desync
    // hydration against the server-rendered default height.
    const raf = requestAnimationFrame(() => {
      try {
        const saved = window.localStorage.getItem(`tt:h:${storageKey}`);
        if (!saved) return;
        const n = Number(saved);
        if (Number.isFinite(n) && n >= MIN_HEIGHT && n <= MAX_HEIGHT) {
          setHeight(n);
          setCommitted(n);
        }
      } catch {
        // Private mode or blocked storage — defaults are fine.
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [storageKey]);

  useEffect(() => {
    if (!dragging) return;

    const onMove = (e: PointerEvent) => {
      const next = Math.min(
        MAX_HEIGHT,
        Math.max(MIN_HEIGHT, startRef.current.height + (e.clientY - startRef.current.y))
      );
      setHeight(next);
    };

    const onUp = () => {
      setDragging(false);
      setHeight((current) => {
        setCommitted(current);
        try {
          window.localStorage.setItem(`tt:h:${storageKey}`, String(current));
        } catch {
          // Non-fatal: the size just will not survive a reload.
        }
        return current;
      });
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    // Stops the drag selecting text across the page.
    document.body.style.userSelect = "none";
    document.body.style.cursor = "ns-resize";

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [dragging, storageKey]);

  const onResizeStart = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      startRef.current = { y: e.clientY, height };
      setDragging(true);
    },
    [height]
  );

  const reset = useCallback(() => {
    setHeight(defaultHeight);
    setCommitted(defaultHeight);
    try {
      window.localStorage.removeItem(`tt:h:${storageKey}`);
    } catch {
      // ignored
    }
  }, [defaultHeight, storageKey]);

  return { height, committed, dragging, onResizeStart, reset };
}
