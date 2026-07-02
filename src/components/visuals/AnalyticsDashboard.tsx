"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const bars = [
  { label: "Q1", value: 72, color: "var(--accent)" },
  { label: "Q2", value: 85, color: "var(--accent)" },
  { label: "Q3", value: 64, color: "var(--accent)" },
  { label: "Q4", value: 96, color: "var(--success)" },
];

const linePoints = [
  [0, 68],
  [1, 55],
  [2, 70],
  [3, 62],
  [4, 78],
  [5, 72],
  [6, 88],
  [7, 82],
  [8, 91],
  [9, 96],
] as const;

function toPath(pts: readonly (readonly [number, number])[], w: number, h: number) {
  return pts
    .map(([x, y], i) => {
      const px = (x / 9) * w;
      const py = h - (y / 100) * h;
      return `${i === 0 ? "M" : "L"}${px.toFixed(1)},${py.toFixed(1)}`;
    })
    .join(" ");
}

export default function AnalyticsDashboard() {
  const reduce = useReducedMotion();
  const chartW = 220;
  const chartH = 100;

  return (
    <div className="w-full">
      {/* Mini KPI row */}
      <div className="mb-5 grid grid-cols-3 gap-3">
        {[
          { label: "On-time", value: "96.4%", accent: true },
          { label: "Cost Δ", value: "-12.3%", accent: false },
          { label: "Vendor", value: "4.8", accent: false },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            className="rounded-xl border border-border bg-surface/50 p-3 text-center"
          >
            <p
              className={`text-lg font-semibold tracking-tight ${
                kpi.accent ? "text-success" : "text-foreground"
              }`}
            >
              {kpi.value}
            </p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              {kpi.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bar chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        className="rounded-xl border border-border bg-surface/30 p-4"
      >
        <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          Quarterly Performance
        </p>
        <svg viewBox="0 0 200 120" className="w-full" aria-hidden="true">
          {bars.map((bar, i) => {
            const barW = 30;
            const gap = (200 - bars.length * barW) / (bars.length + 1);
            const x = gap + i * (barW + gap);
            const barH = (bar.value / 100) * 90;
            return (
              <g key={bar.label}>
                <motion.rect
                  x={x}
                  y={100 - barH}
                  width={barW}
                  rx={4}
                  fill={bar.color}
                  fillOpacity={0.85}
                  initial={{ height: 0, y: 100 }}
                  whileInView={{ height: barH, y: 100 - barH }}
                  viewport={{ once: true }}
                  transition={{
                    duration: reduce ? 0 : 0.8,
                    delay: 0.3 + i * 0.12,
                    ease: EASE,
                  }}
                />
                <text
                  x={x + barW / 2}
                  y={112}
                  textAnchor="middle"
                  fill="var(--muted-foreground)"
                  fontSize={9}
                >
                  {bar.label}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Line chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
        className="mt-3 rounded-xl border border-border bg-surface/30 p-4"
      >
        <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          Delivery Trend
        </p>
        <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full" aria-hidden="true">
          {/* Grid lines */}
          {[25, 50, 75].map((y) => (
            <line
              key={y}
              x1={0}
              y1={chartH - (y / 100) * chartH}
              x2={chartW}
              y2={chartH - (y / 100) * chartH}
              stroke="var(--border)"
              strokeWidth={0.5}
            />
          ))}
          {/* Area fill */}
          <motion.path
            d={`${toPath(linePoints, chartW, chartH)} L${chartW},${chartH} L0,${chartH} Z`}
            fill="var(--accent)"
            fillOpacity={0.08}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          {/* Line */}
          <motion.path
            d={toPath(linePoints, chartW, chartH)}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 1.4, delay: 0.5, ease: EASE }}
          />
          {/* End dot */}
          <motion.circle
            cx={chartW}
            cy={chartH - (96 / 100) * chartH}
            r={3.5}
            fill="var(--accent)"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1.8 }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
