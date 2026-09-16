"use client";

import type { ReactNode } from "react";
import { useResizableHeight } from "@/hooks/useResizableHeight";

/**
 * Wraps a panel with a drag handle on its bottom edge.
 *
 * `render` receives the committed height rather than the live one so embedded
 * widgets re-initialise once on release instead of on every pointer move.
 */
export function Resizable({
  storageKey,
  defaultHeight,
  render,
}: {
  storageKey: string;
  defaultHeight: number;
  render: (committedHeight: number) => ReactNode;
}) {
  const { height, committed, dragging, onResizeStart, reset } = useResizableHeight(
    storageKey,
    defaultHeight
  );

  return (
    <div className="group/resize relative flex flex-col" style={{ height }}>
      <div className="min-h-0 flex-1 overflow-hidden">{render(committed)}</div>

      <div
        onPointerDown={onResizeStart}
        onDoubleClick={reset}
        role="separator"
        aria-orientation="horizontal"
        aria-label="Resize panel — double click to reset"
        title="Drag to resize · double click to reset"
        className={`absolute inset-x-0 -bottom-1 z-10 flex h-2.5 cursor-ns-resize items-center justify-center ${
          dragging ? "opacity-100" : "opacity-0 group-hover/resize:opacity-100"
        } transition-opacity`}
      >
        <span className="h-[3px] w-10 rounded-full bg-border-strong" />
      </div>
    </div>
  );
}
