"use client";

import { useId, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import SectionHeading from "@/components/motion/SectionHeading";
import { chapters } from "@/lib/data";

const planning = chapters.planning;

type Pt = readonly [number, number];

const QUARTER_X = [60, 186, 311, 437, 563, 689, 814, 940] as const;
const FORECAST_Y = [118, 127, 121, 131, 138, 146, 152, 158] as const;
const ACTUAL_Y = [282, 259, 235, 214, 196, 180, 167, 158] as const;

const BASELINE_Y = 372;
const CONVERGE: Pt = [940, 158];

function catmullSegments(pts: readonly Pt[]): string {
  let d = "";
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

const FORECAST_PTS: Pt[] = QUARTER_X.map((x, i) => [x, FORECAST_Y[i]] as const);
const ACTUAL_PTS: Pt[] = QUARTER_X.map((x, i) => [x, ACTUAL_Y[i]] as const);
const ACTUAL_PTS_REV: Pt[] = [...ACTUAL_PTS].reverse();

const FORECAST_PATH = `M ${FORECAST_PTS[0][0]} ${FORECAST_PTS[0][1]}${catmullSegments(FORECAST_PTS)}`;
const ACTUAL_PATH = `M ${ACTUAL_PTS[0][0]} ${ACTUAL_PTS[0][1]}${catmullSegments(ACTUAL_PTS)}`;
const BAND_PATH = `${FORECAST_PATH} L ${ACTUAL_PTS_REV[0][0]} ${ACTUAL_PTS_REV[0][1]}${catmullSegments(ACTUAL_PTS_REV)} L ${FORECAST_PTS[0][0]} ${FORECAST_PTS[0][1]} Z`;

const ANNOTATION_META = [
  { left: 18, at: 0.3, success: false },
  { left: 52, at: 0.55, success: false },
  { left: 86, at: 0.85, success: true },
] as const;

function AnnotationChip({
  progress,
  at,
  left,
  label,
  success,
}: {
  progress: MotionValue<number>;
  at: number;
  left: number;
  label: string;
  success: boolean;
}) {
  const opacity = useTransform(progress, [at, at + 0.08], [0, 1]);
  const y = useTransform(progress, [at, at + 0.08], [16, 0]);
  return (
    <motion.div
      className="absolute top-0 flex flex-col items-center"
      style={{ left: `${left}%`, x: "-50%", y, opacity }}
    >
      <span
        className={`glass whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-medium tracking-wide sm:text-[13px] ${
          success ? "text-success" : "text-foreground"
        }`}
      >
        {label}
      </span>
      <span
        aria-hidden="true"
        className="mt-1 h-7 w-px bg-white/25 sm:h-12"
      />
    </motion.div>
  );
}

export default function ForecastAlignment() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const maskId = useId();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const sceneOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const axisOpacity = useTransform(scrollYProgress, [0.02, 0.12], [0, 1]);
  const forecastDraw = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const actualDraw = useTransform(scrollYProgress, [0.25, 0.75], [0, 1]);
  const bandOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.45, 0.55, 0.9],
    [0, 0.9, 0.9, 0]
  );
  const dotScale = useTransform(scrollYProgress, [0.8, 0.88], [0, 1]);
  const ringScale = useTransform(scrollYProgress, [0.85, 0.98], [0.5, 2.6]);
  const ringOpacity = useTransform(
    scrollYProgress,
    [0.85, 0.9, 0.98],
    [0, 0.55, 0]
  );
  const skillsOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const skillsY = useTransform(scrollYProgress, [0.85, 0.95], [24, 0]);

  return (
    <section
      ref={ref}
      id="planning"
      className="relative h-[240vh] md:h-[300vh]"
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
            eyebrow={planning.eyebrow}
            title={planning.title}
            description={planning.description}
            align="center"
            className="mx-auto"
          />

          <div className="mx-auto mt-8 w-full max-w-5xl md:mt-12">
            <div className="mb-3 flex items-center justify-end gap-5 text-[12px] text-muted-foreground">
              <span className="flex items-center gap-2">
                <svg
                  aria-hidden="true"
                  width="26"
                  height="2"
                  viewBox="0 0 26 2"
                  className="shrink-0"
                >
                  <line
                    x1="0"
                    y1="1"
                    x2="26"
                    y2="1"
                    stroke="#4da3ff"
                    strokeWidth="2"
                    strokeDasharray="4 5"
                  />
                </svg>
                Forecast
              </span>
              <span className="flex items-center gap-2">
                <svg
                  aria-hidden="true"
                  width="26"
                  height="2"
                  viewBox="0 0 26 2"
                  className="shrink-0"
                >
                  <line
                    x1="0"
                    y1="1"
                    x2="26"
                    y2="1"
                    stroke="#34d399"
                    strokeWidth="2"
                  />
                </svg>
                Actual
              </span>
            </div>

            <div className="relative">
              <svg
                viewBox="0 0 1000 420"
                fill="none"
                aria-hidden="true"
                className="block h-auto w-full"
              >
                <defs>
                  <mask
                    id={maskId}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="1000"
                    height="420"
                  >
                    <motion.path
                      d={FORECAST_PATH}
                      stroke="#ffffff"
                      strokeWidth={10}
                      strokeLinecap="round"
                      fill="none"
                      style={{ pathLength: forecastDraw }}
                    />
                  </mask>

                  <filter
                    id={`${maskId}-glow-forecast`}
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feGaussianBlur stdDeviation={4} />
                  </filter>
                  <filter
                    id={`${maskId}-glow-actual`}
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feGaussianBlur stdDeviation={4.5} />
                  </filter>
                  <filter
                    id={`${maskId}-glow-point`}
                    x="-80%"
                    y="-80%"
                    width="260%"
                    height="260%"
                  >
                    <feGaussianBlur stdDeviation={6} />
                  </filter>
                </defs>

                <motion.g style={{ opacity: axisOpacity }}>
                  <line
                    x1={40}
                    y1={BASELINE_Y}
                    x2={960}
                    y2={BASELINE_Y}
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth={1}
                  />
                  {QUARTER_X.map((x, i) => (
                    <g key={x}>
                      <line
                        x1={x}
                        y1={BASELINE_Y}
                        x2={x}
                        y2={BASELINE_Y + 6}
                        stroke="rgba(255,255,255,0.22)"
                        strokeWidth={1.25}
                      />
                      <text
                        x={x}
                        y={BASELINE_Y + 24}
                        textAnchor="middle"
                        fontSize={11}
                        fill="rgba(160,160,170,0.95)"
                      >
                        {`Q${i + 1}`}
                      </text>
                    </g>
                  ))}
                </motion.g>

                <motion.path
                  d={BAND_PATH}
                  fill="rgba(77,163,255,0.12)"
                  style={{ opacity: bandOpacity }}
                />

                <g mask={`url(#${maskId})`}>
                  <path
                    d={FORECAST_PATH}
                    stroke="rgba(77,163,255,0.55)"
                    strokeWidth={4}
                    strokeDasharray="6 8"
                    strokeLinecap="round"
                    fill="none"
                    filter={`url(#${maskId}-glow-forecast)`}
                  />
                  <path
                    d={FORECAST_PATH}
                    stroke="rgba(77,163,255,0.9)"
                    strokeWidth={1.75}
                    strokeDasharray="6 8"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>

                <motion.path
                  d={ACTUAL_PATH}
                  stroke="rgba(52,211,153,0.6)"
                  strokeWidth={5.5}
                  strokeLinecap="round"
                  fill="none"
                  filter={`url(#${maskId}-glow-actual)`}
                  style={{ pathLength: actualDraw }}
                />
                <motion.path
                  d={ACTUAL_PATH}
                  stroke="rgba(52,211,153,0.95)"
                  strokeWidth={2.25}
                  strokeLinecap="round"
                  fill="none"
                  style={{ pathLength: actualDraw }}
                />

                <motion.circle
                  cx={CONVERGE[0]}
                  cy={CONVERGE[1]}
                  r={14}
                  fill="rgba(52,211,153,0.45)"
                  filter={`url(#${maskId}-glow-point)`}
                  style={{
                    scale: dotScale,
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }}
                />
                <motion.circle
                  cx={CONVERGE[0]}
                  cy={CONVERGE[1]}
                  r={9}
                  fill="none"
                  stroke="rgba(52,211,153,0.5)"
                  strokeWidth={1.5}
                  style={{
                    scale: dotScale,
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }}
                />
                <motion.circle
                  cx={CONVERGE[0]}
                  cy={CONVERGE[1]}
                  r={4.5}
                  fill="rgba(52,211,153,1)"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth={1}
                  style={{
                    scale: dotScale,
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }}
                />
                <motion.circle
                  cx={CONVERGE[0]}
                  cy={CONVERGE[1]}
                  r={9}
                  stroke="rgba(52,211,153,0.9)"
                  strokeWidth={1.5}
                  fill="none"
                  style={{
                    scale: ringScale,
                    opacity: reduce ? 0 : ringOpacity,
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }}
                />
              </svg>

              {ANNOTATION_META.map((meta, i) => (
                <AnnotationChip
                  key={planning.annotations[i]}
                  progress={scrollYProgress}
                  at={meta.at}
                  left={meta.left}
                  label={planning.annotations[i]}
                  success={meta.success}
                />
              ))}
            </div>

            <motion.div
              style={{ opacity: skillsOpacity, y: skillsY }}
              className="mt-8 flex flex-wrap items-center justify-center gap-2.5 md:mt-10 md:gap-3"
            >
              {planning.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border bg-surface px-4 py-1.5 text-[12px] text-muted-foreground md:text-sm"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
