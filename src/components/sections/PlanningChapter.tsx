"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import { chapters, images } from "@/lib/data";

const planning = chapters.planning;

export default function PlanningChapter() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section
      ref={ref}
      id="planning"
      className="relative h-[180vh] md:h-[220vh]"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Full-bleed background image */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: reduce ? 1 : imgScale }}
        >
          <img
            src={images.planning}
            alt=""
            className="chapter-image"
            loading="lazy"
          />
        </motion.div>
        <div className="image-overlay image-overlay-full" />
        <div className="image-overlay bg-radial-fade opacity-40" />

        {/* Content centered over image */}
        <motion.div
          style={{ opacity: reduce ? 1 : sceneOpacity }}
          className="relative z-10 mx-auto w-full max-w-5xl px-6 lg:px-8"
        >
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-[13px] uppercase tracking-[0.2em] text-accent">
                {planning.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {planning.title}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {planning.description}
              </p>
            </Reveal>

            {/* Highlight metrics */}
            <Reveal delay={0.3}>
              <div className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-4">
                {planning.highlights.map((h) => (
                  <div key={h.label} className="glass rounded-2xl p-5">
                    <CountUp
                      value={h.metric}
                      className="text-3xl font-semibold text-foreground lg:text-4xl"
                    />
                    <p className="mt-2 text-xs text-muted-foreground">
                      {h.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Skills */}
            <Reveal delay={0.4}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                {planning.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
