"use client";

import { motion, useReducedMotion } from "framer-motion";
import { chapters } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

const colors = [
  "var(--accent)",
  "rgba(77, 163, 255, 0.75)",
  "rgba(77, 163, 255, 0.55)",
  "rgba(77, 163, 255, 0.38)",
  "rgba(77, 163, 255, 0.22)",
];

export default function StrategyLayers() {
  const reduce = useReducedMotion();
  const layers = chapters.strategy.layers;

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="rounded-xl border border-border bg-surface/30 p-5"
      >
        <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          Decision Architecture
        </p>

        <div className="flex flex-col items-center gap-2">
          {layers.map((layer, i) => {
            const width = 100 - i * 12;
            return (
              <motion.div
                key={layer.name}
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: reduce ? 0 : 0.6,
                  delay: 0.2 + i * 0.12,
                  ease: EASE,
                }}
                style={{ width: `${width}%` }}
                className="origin-center"
              >
                <div
                  className="rounded-lg px-4 py-2.5 text-center"
                  style={{
                    background: colors[i],
                    border: `1px solid ${colors[i]}`,
                  }}
                >
                  <p className="text-xs font-semibold tracking-wide text-background">
                    {layer.name}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Flow arrows */}
        <div className="mt-4 flex justify-center">
          <svg width="20" height="40" viewBox="0 0 20 40" aria-hidden="true">
            <motion.path
              d="M10 0 L10 30 M4 24 L10 32 L16 24"
              fill="none"
              stroke="var(--accent)"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: reduce ? 0 : 0.8, delay: 1 }}
            />
          </svg>
        </div>
        <p className="text-center text-[10px] uppercase tracking-wider text-muted-foreground">
          Compounding advantage
        </p>
      </motion.div>
    </div>
  );
}
