"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/motion/SectionHeading";
import CountUp from "@/components/motion/CountUp";
import { chapters, type StoryKpi } from "@/lib/data";

const analytics = chapters.analytics;

const BAR_HEIGHTS = [44, 50, 47, 58, 63, 60, 71, 78];

const LINE_PATH =
  "M10 30 C36 26 52 42 78 40 C104 38 122 52 148 55 C174 58 192 62 218 68 C244 74 262 74 284 80 C294 82 304 84 310 85";
const AREA_PATH = `${LINE_PATH} L310 108 L10 108 Z`;

const AUDIT_ROWS = [
  "Q3 vendor audit",
  "SOP compliance review",
  "Carrier SLA review",
];

function KpiTile({
  progress,
  index,
  kpi,
}: {
  progress: MotionValue<number>;
  index: number;
  kpi: StoryKpi;
}) {
  const start = 0.3 + index * 0.045;
  const opacity = useTransform(progress, [start, start + 0.09], [0, 1]);
  const y = useTransform(progress, [start, start + 0.09], [22, 0]);
  const [active, setActive] = useState(false);
  useMotionValueEvent(progress, "change", (v) => {
    if (v >= start) setActive(true);
  });
  const isCostVariance = kpi.value.startsWith("-");
  return (
    <motion.div
      style={{ opacity, y }}
      className="rounded-xl bg-surface p-3 sm:p-4"
    >
      <div
        className={`text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl ${
          isCostVariance ? "text-success" : "text-foreground"
        }`}
      >
        {active ? (
          <CountUp value={kpi.value} />
        ) : (
          <span className="opacity-0">{kpi.value}</span>
        )}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{kpi.label}</div>
    </motion.div>
  );
}

function BarRect({
  progress,
  index,
  x,
  height,
}: {
  progress: MotionValue<number>;
  index: number;
  x: number;
  height: number;
}) {
  const start = 0.4 + index * 0.028;
  const scaleY = useTransform(progress, [start, start + 0.1], [0, 1]);
  return (
    <motion.rect
      x={x}
      y={108 - height}
      width={24}
      height={height}
      rx={2}
      fill="url(#vendorBarFill)"
      style={{ scaleY, originY: 1, transformBox: "fill-box" }}
    />
  );
}

function CostCurve({ progress }: { progress: MotionValue<number> }) {
  const pathLength = useTransform(progress, [0.55, 0.8], [0, 1]);
  const areaOpacity = useTransform(progress, [0.72, 0.85], [0, 1]);
  const markerOpacity = useTransform(progress, [0.8, 0.88], [0, 1]);
  return (
    <div className="rounded-xl bg-surface p-3 sm:p-4">
      <p className="mb-2 text-xs text-muted-foreground">Cost per shipment</p>
      <svg viewBox="0 0 320 120" className="w-full" aria-hidden="true">
        <defs>
          <linearGradient id="costAreaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(77,163,255,0.22)" />
            <stop offset="100%" stopColor="rgba(77,163,255,0)" />
          </linearGradient>
          <filter
            id="costLineGlow"
            x="-20%"
            y="-40%"
            width="140%"
            height="180%"
          >
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <line
          x1="6"
          y1="108.5"
          x2="314"
          y2="108.5"
          className="stroke-white/[0.18]"
          strokeWidth="1"
        />
        <motion.path
          d={AREA_PATH}
          fill="url(#costAreaFill)"
          style={{ opacity: areaOpacity }}
        />
        <motion.path
          d={LINE_PATH}
          fill="none"
          stroke="rgba(77,163,255,0.9)"
          strokeWidth={2}
          strokeLinecap="round"
          filter="url(#costLineGlow)"
          style={{ pathLength }}
        />
        <motion.g style={{ opacity: markerOpacity }}>
          <circle cx={310} cy={85} r={7} className="fill-success/25" />
          <circle
            cx={310}
            cy={85}
            r={3.5}
            className="fill-success stroke-success"
            strokeWidth={1.5}
          />
          <rect
            x={210}
            y={44}
            width={88}
            height={20}
            rx={10}
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(52,211,153,0.5)"
            strokeWidth={1}
          />
          <text
            x={254}
            y={57.5}
            textAnchor="middle"
            fontSize={10}
            fontWeight={600}
            fill="rgba(52,211,153,1)"
          >
            -12.3% cost
          </text>
        </motion.g>
      </svg>
    </div>
  );
}

function AuditRow({
  progress,
  index,
  label,
}: {
  progress: MotionValue<number>;
  index: number;
  label: string;
}) {
  const start = 0.78 + index * 0.05;
  const opacity = useTransform(progress, [start, start + 0.08], [0, 1]);
  const x = useTransform(progress, [start, start + 0.08], [-12, 0]);
  const check = useTransform(progress, [start + 0.03, start + 0.1], [0, 1]);
  return (
    <motion.div
      style={{ opacity, x }}
      className="flex items-center justify-between py-2.5"
    >
      <span className="text-[13px] text-muted-foreground">{label}</span>
      <span className="flex items-center gap-2">
        <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
          <motion.path
            d="M2.5 6.5 5 9l4.5-5.5"
            fill="none"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-success"
            style={{ pathLength: check }}
          />
        </svg>
        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          Closed
        </span>
      </span>
    </motion.div>
  );
}

function LiveBadge() {
  const reduce = useReducedMotion();
  return (
    <span className="flex items-center gap-1.5">
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        <motion.span
          className="absolute inset-0 rounded-full bg-success"
          animate={
            reduce ? undefined : { opacity: [0.9, 0.2, 0.9], scale: [1, 1.9, 1] }
          }
          transition={
            reduce
              ? undefined
              : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <span className="relative h-1.5 w-1.5 rounded-full bg-success" />
      </span>
      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Live
      </span>
    </span>
  );
}

export default function AnalyticsDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const rotateX = useTransform(scrollYProgress, [0.05, 0.35], [18, 0]);
  const panelY = useTransform(scrollYProgress, [0.05, 0.35], [90, 0]);
  const panelOpacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0.28, 0.45], [0, 1]);

  return (
    <section
      ref={ref}
      id="analytics"
      className="relative h-[260vh] md:h-[320vh]"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-radial-fade opacity-60"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
          <div className="max-w-xl">
            <SectionHeading eyebrow={analytics.eyebrow} title={analytics.title} />
            <Reveal delay={0.15} className="hidden sm:block">
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                {analytics.description}
              </p>
            </Reveal>
          </div>

          <div style={{ perspective: "1200px" }} className="mt-6 sm:mt-10">
            <motion.div
              style={{ opacity: panelOpacity, rotateX, y: panelY }}
              className="glass relative mx-auto w-full max-w-4xl rounded-3xl lg:ml-auto lg:mr-0"
            >
              <motion.div
                style={{
                  opacity: glowOpacity,
                  boxShadow:
                    "0 0 60px rgba(77,163,255,0.22), 0 0 140px rgba(77,163,255,0.09), inset 0 0 0 1px rgba(77,163,255,0.14)",
                }}
                className="pointer-events-none absolute inset-0 rounded-3xl"
                aria-hidden="true"
              />

              <div className="flex items-center gap-3 border-b border-border px-4 py-3 sm:px-5">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full border border-border" />
                  <span className="h-2 w-2 rounded-full border border-border" />
                  <span className="h-2 w-2 rounded-full border border-border" />
                </span>
                <span className="text-[13px] text-muted-foreground">
                  Operations Scorecard
                </span>
                <span className="ml-auto">
                  <LiveBadge />
                </span>
              </div>

              <div className="space-y-3 p-4 sm:space-y-4 sm:p-6">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {analytics.kpis.map((kpi, i) => (
                    <KpiTile
                      key={kpi.label}
                      progress={scrollYProgress}
                      index={i}
                      kpi={kpi}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="rounded-xl bg-surface p-3 sm:p-4">
                    <p className="mb-2 text-xs text-muted-foreground">
                      Vendor performance
                    </p>
                    <svg
                      viewBox="0 0 320 120"
                      className="w-full"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient
                          id="vendorBarFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="rgba(77,163,255,0.85)"
                          />
                          <stop
                            offset="100%"
                            stopColor="rgba(77,163,255,0.45)"
                          />
                        </linearGradient>
                      </defs>
                      <line
                        x1="6"
                        y1="108.5"
                        x2="314"
                        y2="108.5"
                        className="stroke-white/[0.18]"
                        strokeWidth="1"
                      />
                      {BAR_HEIGHTS.map((h, i) => (
                        <BarRect
                          key={i}
                          progress={scrollYProgress}
                          index={i}
                          x={10 + i * 38}
                          height={h}
                        />
                      ))}
                    </svg>
                  </div>
                  <CostCurve progress={scrollYProgress} />
                </div>

                <div className="divide-y divide-border rounded-xl bg-surface px-4 sm:px-5">
                  {AUDIT_ROWS.map((label, i) => (
                    <AuditRow
                      key={label}
                      progress={scrollYProgress}
                      index={i}
                      label={label}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
