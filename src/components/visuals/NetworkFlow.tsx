"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const nodes = [
  { id: "supplier", label: "Suppliers", x: 30, y: 50 },
  { id: "hub1", label: "Hub", x: 120, y: 25 },
  { id: "hub2", label: "Hub", x: 120, y: 75 },
  { id: "warehouse", label: "Warehouse", x: 210, y: 50 },
  { id: "carrier", label: "Carriers", x: 300, y: 35 },
  { id: "last", label: "Last Mile", x: 300, y: 65 },
  { id: "customer", label: "Customer", x: 390, y: 50 },
];

const edges: [string, string][] = [
  ["supplier", "hub1"],
  ["supplier", "hub2"],
  ["hub1", "warehouse"],
  ["hub2", "warehouse"],
  ["warehouse", "carrier"],
  ["warehouse", "last"],
  ["carrier", "customer"],
  ["last", "customer"],
];

function nodePos(id: string) {
  return nodes.find((n) => n.id === id)!;
}

export default function NetworkFlow() {
  const reduce = useReducedMotion();

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="rounded-xl border border-border bg-surface/30 p-4"
      >
        <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          Supply Chain Network
        </p>
        <svg viewBox="0 0 420 100" className="w-full" aria-hidden="true">
          {/* Edges */}
          {edges.map(([from, to], i) => {
            const a = nodePos(from);
            const b = nodePos(to);
            return (
              <motion.line
                key={`${from}-${to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--accent)"
                strokeWidth={1.2}
                strokeOpacity={0.35}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: reduce ? 0 : 0.6,
                  delay: 0.2 + i * 0.08,
                  ease: EASE,
                }}
              />
            );
          })}

          {/* Animated pulses along edges */}
          {!reduce &&
            edges.map(([from, to], i) => {
              const a = nodePos(from);
              const b = nodePos(to);
              return (
                <motion.circle
                  key={`pulse-${from}-${to}`}
                  r={2}
                  fill="var(--accent)"
                  initial={{ cx: a.x, cy: a.y, opacity: 0 }}
                  animate={{
                    cx: [a.x, b.x],
                    cy: [a.y, b.y],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: 1 + i * 0.3,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                />
              );
            })}

          {/* Nodes */}
          {nodes.map((node, i) => (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: reduce ? 0 : 0.5,
                delay: 0.1 + i * 0.08,
                ease: EASE,
              }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={8}
                fill="var(--surface)"
                stroke="var(--accent)"
                strokeWidth={1.5}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={3}
                fill="var(--accent)"
                fillOpacity={0.7}
              />
              <text
                x={node.x}
                y={node.y + 16}
                textAnchor="middle"
                fill="var(--muted-foreground)"
                fontSize={7}
              >
                {node.label}
              </text>
            </motion.g>
          ))}
        </svg>
      </motion.div>

      {/* Route metrics */}
      <div className="mt-3 grid grid-cols-3 gap-3">
        {[
          { label: "Routes", value: "30+", sub: "Active" },
          { label: "Transit", value: "-20%", sub: "Reduction" },
          { label: "Uptime", value: "99.2%", sub: "Network" },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.1, ease: EASE }}
            className="rounded-xl border border-border bg-surface/50 p-3 text-center"
          >
            <p className="text-lg font-semibold tracking-tight text-foreground">
              {m.value}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {m.sub}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
