"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Reveal, { WordReveal } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { hero, images } from "@/lib/data";

export default function HeroCinematic() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
    >
      {/* Full-bleed background image */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: reduce ? 1 : imgScale }}
      >
        <img
          src={images.hero}
          alt=""
          className="chapter-image"
          loading="eager"
        />
        <div className="image-overlay image-overlay-bottom" />
        <div className="image-overlay" style={{ background: "rgba(5,5,7,0.45)" }} />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{
          opacity: reduce ? 1 : contentOpacity,
          y: reduce ? 0 : contentY,
        }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-8"
      >
        <div className="flex flex-col items-center text-center">
          <Reveal delay={0.1} y={20}>
            <p className="text-[13px] uppercase tracking-[0.2em] text-accent">
              {hero.greeting}
            </p>
          </Reveal>

          <h1 className="mt-6 text-gradient text-6xl font-bold tracking-tight sm:text-8xl lg:text-[9rem] lg:leading-[0.88]">
            <span className="block">
              <WordReveal text={hero.firstName} delay={0.2} stagger={0.1} />
            </span>
            <span className="block">
              <WordReveal text={hero.lastName} delay={0.4} stagger={0.1} />
            </span>
          </h1>

          <Reveal delay={0.6} y={24}>
            <p className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.8} y={24}>
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
              <Magnetic>
                <motion.a
                  href="#intro"
                  whileHover={reduce ? undefined : { scale: 1.04 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="group relative inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background"
                >
                  <span
                    aria-hidden="true"
                    className="glow-accent pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  {hero.cta}
                </motion.a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border border-border px-8 py-3.5 text-sm font-medium text-foreground transition-colors duration-300 hover:bg-surface"
                >
                  {hero.ctaSecondary}
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: reduce ? 1 : contentOpacity }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          Scroll
        </span>
        <motion.span
          aria-hidden="true"
          className="block h-12 w-px origin-top bg-foreground/25"
          animate={
            reduce
              ? { scaleY: 1, opacity: 0.6 }
              : { scaleY: [0, 1, 1], opacity: [1, 1, 0] }
          }
          transition={
            reduce
              ? { duration: 0 }
              : {
                  duration: 2.2,
                  times: [0, 0.7, 1],
                  repeat: Infinity,
                  repeatDelay: 0.4,
                  ease: "easeInOut",
                }
          }
        />
      </motion.div>
    </section>
  );
}
