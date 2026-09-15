import { Panel, StatusTag } from "./Panel";

/**
 * Bloomberg Television's channel id. YouTube's `live_stream?channel=` form
 * always resolves to whatever is live on the channel right now, so this
 * survives Bloomberg restarting the stream under a new video id.
 */
const BLOOMBERG_CHANNEL_ID = "UCIALMKvObZNtJ6AmdCLP7Lg";

export function LiveFeed({ height = 392 }: { height?: number }) {
  return (
    <Panel title="Live Feed" right={<StatusTag live />}>
      <div className="flex flex-col" style={{ height }}>
        <iframe
          src={`https://www.youtube.com/embed/live_stream?channel=${BLOOMBERG_CHANNEL_ID}`}
          title="Bloomberg Television — live"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full flex-1 border-0 bg-black"
        />
        <div className="shrink-0 border-t border-border px-3 py-1.5 text-[10px] uppercase tracking-[0.08em] text-faint">
          Bloomberg Television
        </div>
      </div>
    </Panel>
  );
}
