import { useMemo, useState } from 'react';
import { formatMoney, revenueSeries } from './data';

export default function RevenueChart() {
  const [active, setActive] = useState(8);
  const max = useMemo(() => Math.max(...revenueSeries.map((r) => r.value)), []);
  const w = 640;
  const h = 180;
  const pad = { t: 16, r: 8, b: 28, l: 8 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;

  const points = revenueSeries.map((row, i) => {
    const x = pad.l + (innerW * i) / (revenueSeries.length - 1);
    const y = pad.t + innerH - (row.value / max) * innerH;
    return { ...row, x, y, i };
  });

  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const area = `${line} L ${points[points.length - 1].x} ${pad.t + innerH} L ${points[0].x} ${pad.t + innerH} Z`;
  const tip = points[active] || points[0];

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-[160px] w-full min-[640px]:h-[180px] min-[1600px]:h-[200px]" role="img" aria-label="Revenue chart">
        <defs>
          <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#023d26" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#023d26" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {points.map((p) => (
          <rect
            key={`bar-${p.label}`}
            x={p.x - 3}
            y={p.y}
            width={6}
            height={pad.t + innerH - p.y}
            rx={2}
            fill="#023d26"
            opacity={0.12}
          />
        ))}
        <path d={area} fill="url(#revFill)" />
        <path d={line} fill="none" stroke="#023d26" strokeWidth="2.5" strokeLinejoin="round" />
        {points.map((p) => (
          <circle
            key={p.label}
            cx={p.x}
            cy={p.y}
            r={active === p.i ? 5 : 3.5}
            fill={active === p.i ? '#c82425' : '#023d26'}
            stroke="#fff"
            strokeWidth="2"
            className="cursor-pointer"
            onMouseEnter={() => setActive(p.i)}
            onFocus={() => setActive(p.i)}
            tabIndex={0}
          />
        ))}
        {points.map((p) => (
          <text key={`lbl-${p.label}`} x={p.x} y={h - 6} textAnchor="middle" className="fill-primary/45" style={{ fontSize: 10, fontWeight: 700 }}>
            {p.label}
          </text>
        ))}
      </svg>
      <div className="pointer-events-none absolute left-2 top-1 rounded-lg border border-primary/10 bg-white px-2.5 py-1.5 shadow-[0_6px_16px_rgb(2_70_46/0.1)] min-[640px]:left-3">
        <p className="m-0 text-[10px] font-extrabold uppercase tracking-[0.06em] text-primary/45">{tip.label} 2026</p>
        <p className="m-0 text-[14px] font-black text-primary">{formatMoney(tip.value)}</p>
      </div>
    </div>
  );
}
