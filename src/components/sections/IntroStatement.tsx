"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { intro, images } from "@/lib/data";
import CountUp from "@/components/motion/CountUp";

function Word({
  progress,
  index,
  total,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  children: string;
}) {
  const reduce = useReducedMotion();
  const start = 0.05 + (index / total) * 0.45;
  const end = start + 0.15;
  const opacity = useTransform(progress, [start, end], [0.12, 1]);

  return (
    <motion.span
      aria-hidden="true"
      className="mr-[0.28em] inline-block"
      style={reduce ? undefined : { opacity }}
    >
      {children}
    </motion.span>
  );
}

export default function IntroStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const words = intro.statement.split(" ");
  const eyebrowOpacity = useTransform(scrollYProgress, [0.02, 0.1], [0, 1]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const statsOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
  const statsY = useTransform(scrollYProgress, [0.7, 0.9], [28, 0]);

  return (
    <section ref={ref} id="intro" className="relative h-[200vh] md:h-[260vh]">
      <div className="sticky top-0 flex h-screen overflow-hidden">
        {/* Image side (desktop only) */}
        <div className="hidden lg:block lg:w-[50%] relative overflow-hidden">
          <motion.img
            src={images.philosophy}
            alt=""
            className="chapter-image"
            style={{ scale: reduce ? 1 : imgScale }}
          />
          <div className="image-edge-right" />
          <div className="image-edge-bottom" />
        </div>

        {/* Text side */}
        <div className="flex w-full flex-col justify-center px-6 lg:w-[50%] lg:px-16">
          <motion.p
            className="text-[13px] uppercase tracking-[0.2em] text-accent"
            style={reduce ? undefined : { opacity: eyebrowOpacity }}
          >
            Philosophy
          </motion.p>

          <h2
            aria-label={intro.statement}
            className="mt-6 text-3xl font-medium leading-[1.25] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {words.map((word, i) => (
              <Word
                key={`${word}-${i}`}
                progress={scrollYProgress}
                index={i}
                total={words.length}
              >
                {word}
              </Word>
            ))}
          </h2>

          <motion.div
            className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 md:mt-16"
            style={reduce ? undefined : { opacity: statsOpacity, y: statsY }}
          >
            {intro.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={
                  "flex flex-col gap-1.5" +
                  (i % 2 !== 0 ? " border-l border-border pl-8" : "")
                }
              >
                <CountUp
                  value={stat.value}
                  className="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl"
                />
                <span className="text-[13px] text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
