import { Panel } from "./Panel";

const CX = 130;
const CY = 130;
const R = 105;
const STROKE = 22;

function polar(score: number) {
  const theta = ((180 - (score / 100) * 180) * Math.PI) / 180;
  return {
    x: CX + R * Math.cos(theta),
    y: CY - R * Math.sin(theta),
  };
}

function arcPath(from: number, to: number) {
  const p1 = polar(from);
  const p2 = polar(to);
  const large = to - from > 50 ? 1 : 0;
  return `M ${p1.x} ${p1.y} A ${R} ${R} 0 ${large} 1 ${p2.x} ${p2.y}`;
}

const BANDS: { from: number; to: number; color: string; label: string }[] = [
  { from: 0, to: 24, color: "#dc2626", label: "Ext. Fear" },
  { from: 24, to: 44, color: "#f97316", label: "Fear" },
  { from: 44, to: 56, color: "#eab308", label: "Neutral" },
  { from: 56, to: 76, color: "#84cc16", label: "Greed" },
  { from: 76, to: 100, color: "#16a34a", label: "Ext. Greed" },
];

function labelFor(score: number) {
  const band = BANDS.find((b) => score >= b.from && score <= b.to) ?? BANDS[2];
  return band.label.replace("Ext. ", "Extreme ");
}

export function FearGreedGauge({
  score,
  lastUpdated,
}: {
  score: number;
  lastUpdated: string;
}) {
  const needle = polar(score);
  const label = labelFor(score);
  const color =
    score <= 24 ? "#dc2626" : score <= 44 ? "#f97316" : score <= 56 ? "#eab308" : score <= 76 ? "#84cc16" : "#16a34a";

  return (
    <Panel title="Fear & Greed Index">
      <div className="flex flex-col items-center justify-center px-4 py-4">
        <svg viewBox="0 0 260 175" className="w-full max-w-[280px]">
          {BANDS.map((b) => (
            <path
              key={b.label}
              d={arcPath(b.from, b.to)}
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
            strokeWidth={3}
            strokeLinecap="round"
          />
          <circle cx={CX} cy={CY} r={6} fill="currentColor" />
          <text x={CX - R - 10} y={CY + 22} fontSize="10" fill="#8b8f9a" fontWeight="700">
            0
          </text>
          <text x={CX + R - 4} y={CY + 22} fontSize="10" fill="#8b8f9a" fontWeight="700">
            100
          </text>
          <text x={CX} y={22} fontSize="10" fill="#8b8f9a" fontWeight="700" textAnchor="middle">
            50
          </text>
        </svg>
        <div className="text-xs text-muted italic -mt-2">Last updated: {lastUpdated}</div>
        <div className="mt-2 text-center">
          <div className="text-2xl font-bold" style={{ color }}>
            {label}{" "}
            <span className="text-foreground">{score}</span>
          </div>
          <div className="text-xs text-muted">Index Score</div>
        </div>
        <div className="mt-4 grid grid-cols-5 gap-1 w-full text-center text-[10px] text-muted">
          {BANDS.map((b) => (
            <div key={b.label}>
              <div className="h-1.5 rounded-full mb-1" style={{ background: b.color }} />
              {b.from}–{b.to}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
