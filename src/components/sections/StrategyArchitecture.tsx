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
import { chapters } from "@/lib/data";

const strategy = chapters.strategy;

const LAYER_COLORS = [
  "rgba(77,163,255,1)",
  "rgba(77,163,255,0.78)",
  "rgba(77,163,255,0.58)",
  "rgba(77,163,255,0.40)",
  "rgba(77,163,255,0.25)",
];

const LAYER_WIDTHS = [820, 700, 580, 460, 340];
const LAYER_Y = [60, 140, 220, 300, 380];
const BAR_H = 52;
const CX = 500;

function LayerBar({
  progress,
  index,
}: {
  progress: MotionValue<number>;
  index: number;
}) {
  const layer = strategy.layers[index];
  const w = LAYER_WIDTHS[index];
  const y = LAYER_Y[index];
  const x = CX - w / 2;

  const start = 0.08 + index * 0.09;
  const scaleX = useTransform(progress, [start, start + 0.1], [0, 1]);
  const opacity = useTransform(progress, [start, start + 0.06], [0, 1]);
  const textOpacity = useTransform(
    progress,
    [start + 0.06, start + 0.12],
    [0, 1]
  );

  return (
    <motion.g style={{ opacity }}>
      <motion.rect
        x={x}
        y={y}
        width={w}
        height={BAR_H}
        rx={8}
        fill={LAYER_COLORS[index]}
        style={{
          scaleX,
          transformOrigin: `${CX}px ${y + BAR_H / 2}px`,
        }}
      />
      <motion.text
        x={CX}
        y={y + BAR_H / 2 + 1}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={14}
        fontWeight={700}
        letterSpacing="0.12em"
        fill={index < 2 ? "rgba(5,5,7,0.95)" : "rgba(255,255,255,0.95)"}
        style={{ opacity: textOpacity }}
      >
        {layer.name.toUpperCase()}
      </motion.text>
    </motion.g>
  );
}

function FlowArrow({
  progress,
  index,
}: {
  progress: MotionValue<number>;
  index: number;
}) {
  const fromY = LAYER_Y[index] + BAR_H;
  const toY = LAYER_Y[index + 1];
  const midY = (fromY + toY) / 2;

  const start = 0.15 + index * 0.09;
  const pathLength = useTransform(progress, [start, start + 0.08], [0, 1]);
  const opacity = useTransform(progress, [start, start + 0.05], [0, 0.7]);

  const d = `M ${CX} ${fromY + 4} L ${CX} ${midY} M ${CX - 6} ${midY - 6} L ${CX} ${midY + 2} L ${CX + 6} ${midY - 6}`;

  return (
    <motion.path
      d={d}
      fill="none"
      stroke="rgba(77,163,255,0.7)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ pathLength, opacity }}
    />
  );
}

function LayerDescription({
  progress,
  index,
}: {
  progress: MotionValue<number>;
  index: number;
}) {
  const layer = strategy.layers[index];
  const start = 0.52 + index * 0.06;
  const opacity = useTransform(progress, [start, start + 0.06], [0, 1]);
  const x = useTransform(progress, [start, start + 0.06], [-16, 0]);

  return (
    <motion.div
      style={{ opacity, x }}
      className="flex items-start gap-4 py-3"
    >
      <span className="shrink-0 text-2xl font-bold tracking-tight text-accent/30 sm:text-3xl">
        0{index + 1}
      </span>
      <div>
        <h3 className="text-sm font-semibold text-foreground sm:text-base">
          {layer.name}
        </h3>
        <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
          {layer.desc}
        </p>
      </div>
    </motion.div>
  );
}

function PulseRing({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const opacity = useTransform(progress, [0.55, 0.65], [0, 1]);
  const bottomY = LAYER_Y[4] + BAR_H + 20;

  return (
    <motion.g style={{ opacity }}>
      <motion.circle
        cx={CX}
        cy={bottomY}
        r={4}
        fill="rgba(52,211,153,1)"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth={1}
      />
      {!reduce && (
        <motion.circle
          cx={CX}
          cy={bottomY}
          r={4}
          fill="none"
          stroke="rgba(52,211,153,0.8)"
          strokeWidth={1.5}
          animate={{ r: [4, 18], opacity: [0.8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <text
        x={CX}
        y={bottomY + 22}
        textAnchor="middle"
        fontSize={10}
        letterSpacing="0.15em"
        fill="rgba(160,160,170,0.9)"
      >
        COMPOUNDING ADVANTAGE
      </text>
    </motion.g>
  );
}

export default function StrategyArchitecture() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const sceneOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const svgScale = useTransform(scrollYProgress, [0, 0.15], [0.92, 1]);
  const detailsOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
  const detailsY = useTransform(scrollYProgress, [0.5, 0.6], [20, 0]);
  const skillsOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const skillsY = useTransform(scrollYProgress, [0.85, 0.95], [24, 0]);

  return (
    <section
      ref={ref}
      id="strategy"
      className="relative h-[260vh] md:h-[320vh]"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-radial-fade opacity-50"
        />

        <motion.div
          style={{ opacity: sceneOpacity }}
          className="relative mx-auto w-full max-w-6xl px-6 lg:px-8"
        >
          <SectionHeading
            eyebrow={strategy.eyebrow}
            title={strategy.title}
            description={strategy.description}
            align="center"
            className="mx-auto"
          />

          <div className="mx-auto mt-6 grid max-w-5xl items-start gap-6 md:mt-10 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
            {/* SVG pyramid */}
            <motion.div style={{ scale: svgScale }}>
              <svg
                viewBox="0 0 1000 500"
                fill="none"
                aria-hidden="true"
                className="block h-auto w-full"
              >
                <defs>
                  <filter
                    id="strategy-glow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feGaussianBlur stdDeviation={3} />
                  </filter>
                </defs>

                {strategy.layers.map((_, i) => (
                  <LayerBar
                    key={strategy.layers[i].name}
                    progress={scrollYProgress}
                    index={i}
                  />
                ))}

                {[0, 1, 2, 3].map((i) => (
                  <FlowArrow
                    key={`arrow-${i}`}
                    progress={scrollYProgress}
                    index={i}
                  />
                ))}

                <PulseRing progress={scrollYProgress} />
              </svg>
            </motion.div>

            {/* Layer descriptions */}
            <motion.div
              style={{ opacity: detailsOpacity, y: detailsY }}
              className="divide-y divide-border"
            >
              {strategy.layers.map((_, i) => (
                <LayerDescription
                  key={strategy.layers[i].name}
                  progress={scrollYProgress}
                  index={i}
                />
              ))}
            </motion.div>
          </div>

          <motion.div
            style={{ opacity: skillsOpacity, y: skillsY }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2.5 md:mt-10 md:gap-3"
          >
            {strategy.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-border bg-surface px-4 py-1.5 text-[12px] text-muted-foreground md:text-sm"
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
