import { Panel, StatusTag } from "./Panel";

const CX = 130;
const CY = 130;
const R = 100;
const STROKE = 10;

// Rounded so server and client render byte-identical path data; raw trig
// output differs in the last float digit between Node and the browser.
function polar(score: number) {
  const theta = ((180 - (score / 100) * 180) * Math.PI) / 180;
  return {
    x: Number((CX + R * Math.cos(theta)).toFixed(3)),
    y: Number((CY - R * Math.sin(theta)).toFixed(3)),
  };
}

function arcPath(from: number, to: number) {
  const p1 = polar(from);
  const p2 = polar(to);
  return `M ${p1.x} ${p1.y} A ${R} ${R} 0 ${to - from > 50 ? 1 : 0} 1 ${p2.x} ${p2.y}`;
}

const BANDS = [
  { from: 0, to: 24, color: "#b3453e", label: "Extreme Fear" },
  { from: 24, to: 44, color: "#c07a43", label: "Fear" },
  { from: 44, to: 56, color: "#8b8b93", label: "Neutral" },
  { from: 56, to: 76, color: "#4f9166", label: "Greed" },
  { from: 76, to: 100, color: "#2ea06b", label: "Extreme Greed" },
];

function bandFor(score: number) {
  return BANDS.find((b) => score >= b.from && score <= b.to) ?? BANDS[2];
}

export function FearGreedGauge({
  score,
  lastUpdated,
  live,
}: {
  score: number;
  lastUpdated: string;
  live: boolean;
}) {
  const needle = polar(score);
  const band = bandFor(score);

  return (
    <Panel title="Fear & Greed" right={<StatusTag live={live} />}>
      <div className="flex h-full flex-col items-center justify-center px-3 py-3">
        <svg viewBox="0 0 260 150" className="w-full max-w-[260px]">
          {BANDS.map((b) => (
            <path
              key={b.label}
              d={arcPath(b.from + 0.6, b.to - 0.6)}
              fill="none"
              stroke={b.color}
              strokeWidth={STROKE}
              strokeLinecap="butt"
            />
          ))}
          <line
            x1={CX}
            y1={CY}
            x2={needle.x}
            y2={needle.y}
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <circle cx={CX} cy={CY} r={4} fill="currentColor" />
          <text x={CX - R - 6} y={CY + 16} fontSize="9" fill="#5f5f67">
            0
          </text>
          <text x={CX + R - 8} y={CY + 16} fontSize="9" fill="#5f5f67">
            100
          </text>
        </svg>

        <div className="mt-1 text-center tabular">
          <div className="text-3xl font-semibold tracking-tight">{score}</div>
          <div
            className="text-[11px] font-medium uppercase tracking-[0.08em]"
            style={{ color: band.color }}
          >
            {band.label}
          </div>
        </div>

        <div className="mt-3 text-[10px] text-faint">{lastUpdated}</div>
      </div>
    </Panel>
  );
}
