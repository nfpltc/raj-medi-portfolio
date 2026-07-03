"use client";

import { type ReactNode, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  useReducedMotion,
} from "framer-motion";

/* ── chapter scroll ranges (fractions of total scroll-through) ── */

const R = {
  sourcing: [0.0, 0.22] as const,
  production: [0.19, 0.41] as const,
  transport: [0.38, 0.6] as const,
  warehouse: [0.57, 0.79] as const,
  delivery: [0.78, 1.0] as const,
};

type Range = readonly [number, number];

/* ── shared transition hook ── */

function useChapter(
  progress: MotionValue<number>,
  [s, e]: Range,
  reduce: boolean | null,
) {
  const local = useTransform(progress, [s, e], [0, 1]);
  return {
    local,
    imgScale: useTransform(
      local,
      [0, 0.1, 0.85, 1],
      reduce ? [1, 1, 1, 1] : [1.3, 1, 1, 0.85],
    ),
    layer: useTransform(local, [0, 0.08, 0.88, 1], [0, 1, 1, 0]),
    content: useTransform(local, [0.08, 0.16, 0.78, 0.88], [0, 1, 1, 0]),
    y: useTransform(
      local,
      [0.08, 0.16, 0.78, 0.88],
      reduce ? [0, 0, 0, 0] : [50, 0, 0, -30],
    ),
  };
}

/* ── chapter layout ── */

function Chapter({
  progress,
  reduce,
  range,
  image,
  eyebrow,
  title,
  desc,
  stats,
  visual,
}: {
  progress: MotionValue<number>;
  reduce: boolean | null;
  range: Range;
  image: string;
  eyebrow: string;
  title: string;
  desc: string;
  stats: { value: string; label: string }[];
  visual: (local: MotionValue<number>) => ReactNode;
}) {
  const { local, imgScale, layer, content, y } = useChapter(
    progress,
    range,
    reduce,
  );

  return (
    <motion.div className="absolute inset-0" style={{ opacity: layer }}>
      <motion.img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ scale: imgScale }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />

      <motion.div
        className="absolute inset-0 flex items-center"
        style={{ opacity: content, y }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="rounded-2xl bg-black/30 p-6 backdrop-blur-sm sm:p-8">
              <p className="text-[13px] font-medium uppercase tracking-[0.25em] text-accent">
                {eyebrow}
              </p>
              <h2 className="mt-4 whitespace-pre-line text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {title}
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
                {desc}
              </p>
              <div className="mt-10 grid grid-cols-3 gap-5">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-semibold text-white sm:text-3xl">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs text-white/70 sm:text-sm">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden items-center justify-center lg:flex">
              {visual(local)}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── SVG: supplier network ── */

function NetworkSVG({ p }: { p: MotionValue<number> }) {
  const lo = useTransform(p, [0.2, 0.4], [0, 1]);
  const no = useTransform(p, [0.35, 0.55], [0, 1]);
  const nodes: [number, number, string][] = [
    [140, 100, "India"],
    [380, 70, "China"],
    [300, 200, "Vietnam"],
    [100, 250, "Brazil"],
    [470, 150, "Japan"],
    [250, 320, "Australia"],
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 2],
    [0, 3],
    [1, 4],
    [2, 5],
    [3, 5],
  ];

  return (
    <svg viewBox="0 0 560 400" className="w-full max-w-md" fill="none">
      <motion.g style={{ opacity: lo }}>
        {edges.map(([f, t], i) => (
          <line
            key={i}
            x1={nodes[f][0]}
            y1={nodes[f][1]}
            x2={nodes[t][0]}
            y2={nodes[t][1]}
            stroke="rgba(77,163,255,0.2)"
            strokeWidth={1}
          />
        ))}
      </motion.g>
      <motion.g style={{ opacity: no }}>
        {nodes.map(([cx, cy, label], i) => (
          <g key={i}>
            <circle
              cx={cx}
              cy={cy}
              r={20}
              fill="rgba(77,163,255,0.06)"
              stroke="rgba(77,163,255,0.3)"
              strokeWidth={1}
            />
            <circle cx={cx} cy={cy} r={4} fill="#4da3ff" />
            <text
              x={cx}
              y={cy + 34}
              textAnchor="middle"
              fill="rgba(255,255,255,0.5)"
              fontSize={11}
            >
              {label}
            </text>
          </g>
        ))}
      </motion.g>
    </svg>
  );
}

/* ── SVG: production flow ── */

function FlowSVG({ p }: { p: MotionValue<number> }) {
  const o1 = useTransform(p, [0.2, 0.32], [0, 1]);
  const o2 = useTransform(p, [0.28, 0.4], [0, 1]);
  const o3 = useTransform(p, [0.36, 0.48], [0, 1]);
  const o4 = useTransform(p, [0.44, 0.56], [0, 1]);
  const ops = [o1, o2, o3, o4];
  const labels = ["Raw\nMaterial", "Processing", "Quality\nControl", "Packaging"];

  return (
    <svg viewBox="0 0 600 120" className="w-full max-w-lg" fill="none">
      <defs>
        <marker
          id="flow-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth={6}
          markerHeight={6}
          orient="auto"
        >
          <path d="M0 0L10 5L0 10z" fill="rgba(77,163,255,0.5)" />
        </marker>
      </defs>
      {labels.map((label, i) => {
        const x = 10 + i * 152;
        const lines = label.split("\n");
        return (
          <motion.g key={i} style={{ opacity: ops[i] }}>
            <rect
              x={x}
              y={20}
              width={125}
              height={55}
              rx={10}
              fill="rgba(77,163,255,0.08)"
              stroke="rgba(77,163,255,0.3)"
              strokeWidth={1}
            />
            {lines.map((ln, li) => (
              <text
                key={li}
                x={x + 62}
                y={lines.length === 1 ? 53 : 44 + li * 16}
                textAnchor="middle"
                fill="white"
                fontSize={12}
              >
                {ln}
              </text>
            ))}
            {i < 3 && (
              <line
                x1={x + 130}
                y1={47}
                x2={x + 147}
                y2={47}
                stroke="rgba(77,163,255,0.4)"
                strokeWidth={1.5}
                markerEnd="url(#flow-arrow)"
              />
            )}
          </motion.g>
        );
      })}
    </svg>
  );
}

/* ── SVG: transport modes ── */

function ModesSVG({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.25, 0.5], [0, 1]);
  const modes = [
    { label: "Road Transport", w: 340 },
    { label: "Rail Freight", w: 260 },
    { label: "Ocean Shipping", w: 380 },
    { label: "Air Cargo", w: 180 },
  ];

  return (
    <svg viewBox="0 0 440 260" className="w-full max-w-md" fill="none">
      <motion.g style={{ opacity }}>
        {modes.map((m, i) => {
          const y = 20 + i * 60;
          return (
            <g key={i}>
              <text
                x={0}
                y={y + 12}
                fill="rgba(255,255,255,0.6)"
                fontSize={13}
                fontWeight={500}
              >
                {m.label}
              </text>
              <rect
                x={0}
                y={y + 22}
                width={420}
                height={6}
                rx={3}
                fill="rgba(255,255,255,0.06)"
              />
              <rect
                x={0}
                y={y + 22}
                width={m.w}
                height={6}
                rx={3}
                fill="rgba(77,163,255,0.5)"
              />
            </g>
          );
        })}
      </motion.g>
    </svg>
  );
}

/* ── SVG: warehouse grid ── */

function GridSVG({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.25, 0.5], [0, 1]);
  const filled = [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1];

  return (
    <svg viewBox="0 0 420 270" className="w-full max-w-sm" fill="none">
      <motion.g style={{ opacity }}>
        {filled.map((f, i) => {
          const x = (i % 5) * 82 + 5;
          const y = Math.floor(i / 5) * 58 + 5;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={72}
              height={48}
              rx={6}
              fill={f ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0.02)"}
              stroke={
                f ? "rgba(52,211,153,0.25)" : "rgba(255,255,255,0.06)"
              }
              strokeWidth={1}
            />
          );
        })}
        <text
          x={210}
          y={258}
          textAnchor="middle"
          fill="rgba(52,211,153,0.6)"
          fontSize={12}
        >
          80% fill rate
        </text>
      </motion.g>
    </svg>
  );
}

/* ── SVG: delivery channels ── */

function ChannelsSVG({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.25, 0.5], [0, 1]);
  const channels = [
    { label: "B2B", desc: "Enterprise", endY: 50 },
    { label: "B2C", desc: "Consumer", endY: 130 },
    { label: "B2D", desc: "Distributor", endY: 210 },
  ];

  return (
    <svg viewBox="0 0 400 260" className="w-full max-w-md" fill="none">
      <motion.g style={{ opacity }}>
        {channels.map((ch) => (
          <g key={ch.label}>
            <path
              d={`M 50 130 C 140 130, 220 ${ch.endY}, 300 ${ch.endY}`}
              stroke="rgba(77,163,255,0.25)"
              strokeWidth={1.5}
              fill="none"
            />
            <circle
              cx={300}
              cy={ch.endY}
              r={26}
              fill="rgba(77,163,255,0.06)"
              stroke="rgba(77,163,255,0.3)"
              strokeWidth={1}
            />
            <text
              x={300}
              y={ch.endY + 5}
              textAnchor="middle"
              fill="white"
              fontSize={14}
              fontWeight={600}
            >
              {ch.label}
            </text>
            <text
              x={340}
              y={ch.endY + 5}
              fill="rgba(255,255,255,0.4)"
              fontSize={11}
            >
              {ch.desc}
            </text>
          </g>
        ))}
        <circle cx={50} cy={130} r={8} fill="#4da3ff" />
        <text
          x={50}
          y={168}
          textAnchor="middle"
          fill="rgba(255,255,255,0.4)"
          fontSize={11}
        >
          Origin
        </text>
      </motion.g>
    </svg>
  );
}

/* ── progress dot ── */

function ProgressDot({
  progress,
  range,
  label,
}: {
  progress: MotionValue<number>;
  range: Range;
  label: string;
}) {
  const [s, e] = range;
  const mid = (s + e) / 2;
  const active = useTransform(progress, [s, mid, e], [0.2, 1, 0.2]);
  const labelOp = useTransform(active, [0.2, 0.7], [0, 1]);
  const scale = useTransform(active, [0.2, 1], [0.5, 1]);

  return (
    <div className="flex items-center gap-3">
      <motion.div
        className="h-2 w-2 rounded-full bg-accent"
        style={{ opacity: active, scale }}
      />
      <motion.span
        className="text-[10px] uppercase tracking-widest text-white/60"
        style={{ opacity: labelOp }}
      >
        {label}
      </motion.span>
    </div>
  );
}

/* ── main component ── */

export default function SupplyChainCinematic() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const p = scrollYProgress;

  return (
    <div ref={ref} id="story" className="relative h-[1200vh] md:h-[1600vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050507]">
        {/* Ch 1 — Sourcing */}
        <Chapter
          progress={p}
          reduce={reduce}
          range={R.sourcing}
          image="https://images.unsplash.com/photo-1500382017468-9049fed747ef?fm=jpg&w=1920&q=80&fit=crop"
          eyebrow="01 — Sourcing"
          title={"The supplier\nnetwork."}
          desc="Every supply chain begins with sourcing — identifying reliable suppliers, negotiating contracts, and building partnerships across global markets."
          stats={[
            { value: "50+", label: "Suppliers" },
            { value: "6", label: "Countries" },
            { value: "30%", label: "Cost savings" },
          ]}
          visual={(l) => <NetworkSVG p={l} />}
        />

        {/* Ch 2 — Production */}
        <Chapter
          progress={p}
          reduce={reduce}
          range={R.production}
          image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?fm=jpg&w=1920&q=80&fit=crop"
          eyebrow="02 — Production"
          title={"Transformation\nat scale."}
          desc="Raw materials become finished goods through a carefully orchestrated production pipeline — quality-controlled at every stage."
          stats={[
            { value: "25%", label: "Productivity gain" },
            { value: "99.2%", label: "Quality rate" },
            { value: "4", label: "Process stages" },
          ]}
          visual={(l) => <FlowSVG p={l} />}
        />

        {/* Ch 3 — Transportation */}
        <Chapter
          progress={p}
          reduce={reduce}
          range={R.transport}
          image="https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?fm=jpg&w=1920&q=80&fit=crop"
          eyebrow="03 — Transportation"
          title={"Every mode.\nEvery route."}
          desc="Road, rail, sea, and air — a multi-modal network optimized for speed, cost, and reliability across global corridors."
          stats={[
            { value: "4", label: "Transport modes" },
            { value: "20%", label: "Faster transit" },
            { value: "30+", label: "Active routes" },
          ]}
          visual={(l) => <ModesSVG p={l} />}
        />

        {/* Ch 4 — Warehousing */}
        <Chapter
          progress={p}
          reduce={reduce}
          range={R.warehouse}
          image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?fm=jpg&w=1920&q=80&fit=crop"
          eyebrow="04 — Warehousing"
          title={"Storage meets\nprecision."}
          desc="Inventory visibility, warehouse optimization, and fulfillment accuracy — building the infrastructure that keeps shelves stocked."
          stats={[
            { value: "99.7%", label: "Pick accuracy" },
            { value: "80%", label: "Fill rate" },
            { value: "2.4h", label: "Cycle time" },
          ]}
          visual={(l) => <GridSVG p={l} />}
        />

        {/* Ch 5 — Delivery */}
        <Chapter
          progress={p}
          reduce={reduce}
          range={R.delivery}
          image="https://images.unsplash.com/photo-1521791136064-7986c2920216?fm=jpg&w=1920&q=80&fit=crop"
          eyebrow="05 — Delivery"
          title={"The final\nmile."}
          desc="Whether B2B, B2C, or B2D — the last mile is where operations become experience. On-time, every time."
          stats={[
            { value: "96%", label: "On-time delivery" },
            { value: "3", label: "Channels" },
            { value: "4.8/5", label: "Satisfaction" },
          ]}
          visual={(l) => <ChannelsSVG p={l} />}
        />

        {/* Progress indicator */}
        <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-4 md:flex">
          <ProgressDot progress={p} range={R.sourcing} label="Sourcing" />
          <ProgressDot progress={p} range={R.production} label="Production" />
          <ProgressDot progress={p} range={R.transport} label="Transport" />
          <ProgressDot progress={p} range={R.warehouse} label="Warehouse" />
          <ProgressDot progress={p} range={R.delivery} label="Delivery" />
        </div>
      </div>
    </div>
  );
}
