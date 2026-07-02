"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import SectionHeading from "@/components/motion/SectionHeading";
import CountUp from "@/components/motion/CountUp";
import { chapters } from "@/lib/data";

const network = chapters.supplyChain;

interface Pt {
  x: number;
  y: number;
}

interface Stage {
  label: string;
  x: number;
  hub: boolean;
  nodes: Pt[];
}

const SUPPLIERS: Pt[] = [
  { x: 70, y: 160 },
  { x: 70, y: 300 },
  { x: 70, y: 440 },
];
const CARRIERS: Pt[] = [
  { x: 260, y: 230 },
  { x: 260, y: 380 },
];
const HUBS: Pt[] = [
  { x: 450, y: 200 },
  { x: 450, y: 400 },
];
const DISTRIBUTION: Pt[] = [
  { x: 640, y: 160 },
  { x: 640, y: 300 },
  { x: 640, y: 440 },
];
const CUSTOMERS: Pt[] = [
  { x: 830, y: 130 },
  { x: 830, y: 250 },
  { x: 830, y: 370 },
  { x: 830, y: 490 },
];

const STAGES: Stage[] = [
  { label: "Suppliers", x: 70, hub: false, nodes: SUPPLIERS },
  { label: "Carriers", x: 260, hub: false, nodes: CARRIERS },
  { label: "Hubs", x: 450, hub: true, nodes: HUBS },
  { label: "Distribution", x: 640, hub: false, nodes: DISTRIBUTION },
  { label: "Customers", x: 830, hub: false, nodes: CUSTOMERS },
];

const LABEL_Y = 560;

function curve(a: Pt, b: Pt): string {
  const mx = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
}

const EDGES: string[] = [
  curve(SUPPLIERS[0], CARRIERS[0]),
  curve(SUPPLIERS[1], CARRIERS[0]),
  curve(SUPPLIERS[1], CARRIERS[1]),
  curve(SUPPLIERS[2], CARRIERS[1]),
  curve(CARRIERS[0], HUBS[0]),
  curve(CARRIERS[0], HUBS[1]),
  curve(CARRIERS[1], HUBS[1]),
  curve(HUBS[0], DISTRIBUTION[0]),
  curve(HUBS[0], DISTRIBUTION[1]),
  curve(HUBS[1], DISTRIBUTION[1]),
  curve(HUBS[1], DISTRIBUTION[2]),
  curve(DISTRIBUTION[0], CUSTOMERS[0]),
  curve(DISTRIBUTION[0], CUSTOMERS[1]),
  curve(DISTRIBUTION[1], CUSTOMERS[2]),
  curve(DISTRIBUTION[2], CUSTOMERS[3]),
];

const STAGE_WINDOWS: [number, number][] = [
  [0.01, 0.075],
  [0.055, 0.12],
  [0.1, 0.165],
  [0.145, 0.21],
  [0.19, 0.255],
];

function StageGroup({
  progress,
  index,
}: {
  progress: MotionValue<number>;
  index: number;
}) {
  const stage = STAGES[index];
  const [a, b] = STAGE_WINDOWS[index];
  const opacity = useTransform(progress, [a, b], [0, 1]);
  const scale = useTransform(progress, [a, b], [0.4, 1]);
  const nodeStyle = {
    scale,
    transformBox: "fill-box",
    transformOrigin: "center",
  } as const;

  return (
    <motion.g style={{ opacity }}>
      {stage.nodes.map((n) => (
        <g key={`${n.x}-${n.y}`}>
          {stage.hub && (
            <>
              <motion.circle
                cx={n.x}
                cy={n.y}
                r={12}
                fill="rgba(77,163,255,0.25)"
                stroke="none"
                filter="url(#network-glow)"
                style={nodeStyle}
              />
              <motion.circle
                cx={n.x}
                cy={n.y}
                r={13}
                fill="none"
                stroke="rgba(77,163,255,0.35)"
                strokeWidth={1.25}
                style={nodeStyle}
              />
            </>
          )}
          <motion.circle
            cx={n.x}
            cy={n.y}
            r={stage.hub ? 7.5 : 5.5}
            fill="rgba(77,163,255,0.10)"
            stroke="rgba(77,163,255,0.95)"
            strokeWidth={1.75}
            style={nodeStyle}
          />
        </g>
      ))}
      <text
        x={stage.x}
        y={LABEL_Y}
        textAnchor="middle"
        fontSize={11}
        letterSpacing="0.12em"
        fill="rgba(160,160,170,0.95)"
      >
        {stage.label.toUpperCase()}
      </text>
    </motion.g>
  );
}

function EdgePath({
  progress,
  index,
  d,
}: {
  progress: MotionValue<number>;
  index: number;
  d: string;
}) {
  const start = 0.2 + (index / (EDGES.length - 1)) * 0.24;
  const pathLength = useTransform(progress, [start, start + 0.16], [0, 1]);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="rgba(255,255,255,0.20)"
      strokeWidth={1.2}
      style={{ pathLength }}
    />
  );
}

function FlowPath({
  progress,
  index,
  d,
}: {
  progress: MotionValue<number>;
  index: number;
  d: string;
}) {
  const reduce = useReducedMotion();
  const start = 0.5 + (index / (EDGES.length - 1)) * 0.1;
  const opacity = useTransform(progress, [start, start + 0.12], [0, 0.9]);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="rgba(77,163,255,0.95)"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeDasharray="3 14"
      style={{ opacity }}
      initial={{ strokeDashoffset: 0 }}
      animate={reduce ? undefined : { strokeDashoffset: [0, -17] }}
      transition={
        reduce
          ? undefined
          : { duration: 2.4, repeat: Infinity, ease: "linear" }
      }
    />
  );
}

function LatePanel({
  progress,
  className = "",
}: {
  progress: MotionValue<number>;
  className?: string;
}) {
  const opacity = useTransform(progress, [0.7, 0.88], [0, 1]);
  const y = useTransform(progress, [0.7, 0.88], [28, 0]);
  return (
    <motion.div style={{ opacity, y }} className={className}>
      <div className="flex flex-wrap gap-2">
        {network.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-[13px] text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {network.kpis.map((kpi) => (
          <div key={kpi.label} className="glass rounded-xl px-4 py-3.5">
            <CountUp
              value={kpi.value}
              className="text-xl font-semibold text-foreground sm:text-2xl"
            />
            <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
              {kpi.label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function NetworkFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const svgOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const svgY = useTransform(scrollYProgress, [0, 0.12], [40, 0]);

  return (
    <section ref={ref} id="supply-chain" className="relative h-[280vh] md:h-[340vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow={network.eyebrow}
                title={network.title}
                description={network.description}
              />
              <LatePanel
                progress={scrollYProgress}
                className="mt-10 hidden lg:block"
              />
            </div>

            <motion.div
              style={{ opacity: svgOpacity, y: svgY }}
              className="relative mx-auto w-full max-w-[440px] sm:max-w-[560px] lg:max-w-none"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-radial-fade opacity-60"
              />
              <svg
                viewBox="0 0 900 620"
                className="relative h-auto w-full"
                aria-hidden="true"
              >
                <defs>
                  <filter
                    id="network-glow"
                    x="-40%"
                    y="-40%"
                    width="180%"
                    height="180%"
                  >
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {EDGES.map((d, i) => (
                  <EdgePath
                    key={`edge-${i}`}
                    progress={scrollYProgress}
                    index={i}
                    d={d}
                  />
                ))}
                <g filter="url(#network-glow)">
                  {EDGES.map((d, i) => (
                    <FlowPath
                      key={`flow-${i}`}
                      progress={scrollYProgress}
                      index={i}
                      d={d}
                    />
                  ))}
                </g>
                {STAGES.map((_, i) => (
                  <StageGroup
                    key={STAGES[i].label}
                    progress={scrollYProgress}
                    index={i}
                  />
                ))}
              </svg>
            </motion.div>

            <LatePanel progress={scrollYProgress} className="lg:hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}
