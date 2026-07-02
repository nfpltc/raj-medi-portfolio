"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { experience, type Experience } from "@/lib/data";
import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";

const EASE = [0.22, 1, 0.36, 1] as const;

function HighlightTick() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="mt-[3px] shrink-0 text-accent"
    >
      <path
        d="M2 6.5 4.75 9.25 10 3.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TimelineNode() {
  return (
    <div
      aria-hidden="true"
      className="absolute left-4 top-9 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-accent bg-background lg:left-1/2"
    >
      <motion.div
        className="absolute inset-[2px] rounded-full bg-accent"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
      />
    </div>
  );
}

function TimelineEntry({ item, index }: { item: Experience; index: number }) {
  const reduce = useReducedMotion();
  const isLeft = index % 2 === 0;
  const side = isLeft ? -1 : 1;

  return (
    <div className="relative">
      <TimelineNode />

      <motion.div
        initial={{ opacity: 0, x: reduce ? 0 : side * 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className={`ml-12 lg:w-[calc(50%-3rem)] ${
          isLeft ? "lg:ml-0" : "lg:ml-auto"
        }`}
      >
        <TiltCard max={5} className="glass rounded-2xl p-8">
          <h3 className="text-xl font-semibold tracking-tight text-foreground">
            {item.role}
          </h3>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {item.company}
            <span className="mx-2 text-border" aria-hidden="true">
              &middot;
            </span>
            {item.location}
          </p>

          <span className="mt-4 inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
            {item.period}
          </span>

          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            {item.description}
          </p>

          <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
            {item.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3">
                <HighlightTick />
                <span className="text-[13px] leading-relaxed text-muted-foreground">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>
        </TiltCard>
      </motion.div>
    </div>
  );
}

export default function ExperienceJourney() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.6"],
  });
  const drawProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="relative py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-[13px] uppercase tracking-[0.2em] text-accent">
            Experience
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground lg:text-5xl">
            A decade of operational impact.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            From e-commerce warehouses in India to pharmaceutical operations in
            the United States — each role a larger system, run more quietly.
          </p>
        </Reveal>

        <div ref={timelineRef} className="relative mt-20 lg:mt-28">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-4 top-0 w-px lg:left-1/2 lg:-translate-x-1/2"
          >
            <div className="absolute inset-0 bg-border" />
            <motion.div
              className="absolute inset-0 origin-top bg-gradient-to-b from-accent via-accent/40 to-transparent"
              style={{ scaleY: reduce ? 1 : drawProgress }}
            />
          </div>

          <div className="space-y-14 lg:space-y-20">
            {experience.map((item, index) => (
              <TimelineEntry key={item.company} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
