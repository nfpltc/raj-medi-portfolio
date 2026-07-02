"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const forecast = [20, 35, 30, 45, 55, 50, 60, 68, 72, 78, 85, 90] as const;
const actual = [18, 32, 34, 42, 52, 53, 58, 65, 74, 80, 83, 91] as const;

function toPath(data: readonly number[], w: number, h: number) {
  const step = w / (data.length - 1);
  return data
    .map((v, i) => {
      const x = i * step;
      const y = h - (v / 100) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export default function ForecastAlignment() {
  const reduce = useReducedMotion();
  const w = 260;
  const h = 110;

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="rounded-xl border border-border bg-surface/30 p-4"
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
            Forecast vs Actual
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[9px] text-muted-foreground">
              <span className="inline-block h-px w-4 bg-accent" />
              Forecast
            </span>
            <span className="flex items-center gap-1.5 text-[9px] text-muted-foreground">
              <span className="inline-block h-px w-4 bg-success" />
              Actual
            </span>
          </div>
        </div>

        <svg viewBox={`-4 -4 ${w + 8} ${h + 24}`} className="w-full" aria-hidden="true">
          {/* Grid */}
          {[0, 25, 50, 75, 100].map((v) => (
            <g key={v}>
              <line
                x1={0}
                y1={h - (v / 100) * h}
                x2={w}
                y2={h - (v / 100) * h}
                stroke="var(--border)"
                strokeWidth={0.5}
              />
              <text
                x={-4}
                y={h - (v / 100) * h + 3}
                textAnchor="end"
                fill="var(--muted-foreground)"
                fontSize={7}
                opacity={0.5}
              >
                {v}
              </text>
            </g>
          ))}

          {/* Month labels */}
          {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map(
            (m, i) => (
              <text
                key={`${m}-${i}`}
                x={(i / 11) * w}
                y={h + 14}
                textAnchor="middle"
                fill="var(--muted-foreground)"
                fontSize={7}
                opacity={0.5}
              >
                {m}
              </text>
            )
          )}

          {/* Forecast line */}
          <motion.path
            d={toPath(forecast, w, h)}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="4 3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 1.5, delay: 0.3, ease: EASE }}
          />

          {/* Actual line */}
          <motion.path
            d={toPath(actual, w, h)}
            fill="none"
            stroke="var(--success)"
            strokeWidth={2}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 1.5, delay: 0.5, ease: EASE }}
          />

          {/* Alignment dots at end */}
          <motion.circle
            cx={w}
            cy={h - (forecast[11] / 100) * h}
            r={3}
            fill="var(--accent)"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 1.8 }}
          />
          <motion.circle
            cx={w}
            cy={h - (actual[11] / 100) * h}
            r={3}
            fill="var(--success)"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 1.9 }}
          />
        </svg>
      </motion.div>

      {/* Accuracy badges */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
          className="rounded-xl border border-border bg-surface/50 p-3 text-center"
        >
          <p className="text-xl font-semibold tracking-tight text-success">98%</p>
          <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
            Accuracy
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8, ease: EASE }}
          className="rounded-xl border border-border bg-surface/50 p-3 text-center"
        >
          <p className="text-xl font-semibold tracking-tight text-foreground">Q/Q</p>
          <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
            Improving
          </p>
        </motion.div>
      </div>
    </div>
  );
}
