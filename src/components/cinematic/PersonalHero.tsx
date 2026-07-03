"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { siteConfig, hero, intro } from "@/lib/data";

export default function PersonalHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const nameY = useTransform(
    scrollYProgress,
    [0, 0.35],
    reduce ? [0, 0] : [0, -60],
  );
  const nameOpacity = useTransform(scrollYProgress, [0.1, 0.22], [1, 0]);
  const statsOpacity = useTransform(scrollYProgress, [0.05, 0.12, 0.22, 0.32], [0, 1, 1, 0]);
  const statsY = useTransform(
    scrollYProgress,
    [0.05, 0.15],
    reduce ? [0, 0] : [40, 0],
  );
  const quoteOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.65, 0.78], [0, 1, 1, 0]);
  const quoteY = useTransform(
    scrollYProgress,
    [0.4, 0.5],
    reduce ? [0, 0] : [30, 0],
  );
  const overlayOpacity = useTransform(scrollYProgress, [0.82, 1], [0, 0.95]);

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-[#050507]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(77,163,255,0.04)_0%,transparent_70%)]" />

        <motion.div
          className="absolute inset-0 bg-[#050507]"
          style={{ opacity: overlayOpacity }}
        />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 lg:px-12">
          <motion.div style={{ y: nameY, opacity: nameOpacity }}>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
              {hero.greeting}
            </p>
            <h1 className="mt-5 text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
              {hero.firstName}
              <br />
              <span className="text-gradient">{hero.lastName}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">
              {hero.subtitle}
            </p>
          </motion.div>

          <motion.div
            className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-10"
            style={{ opacity: statsOpacity, y: statsY }}
          >
            {intro.stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-semibold text-white sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-white/50">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center bg-[#050507] px-6"
          style={{ opacity: quoteOpacity, y: quoteY }}
        >
          <blockquote className="max-w-2xl text-center text-xl leading-relaxed text-white/90 italic sm:text-2xl lg:text-3xl">
            &ldquo;{intro.statement}&rdquo;
          </blockquote>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center text-white/30"
          style={{ opacity: nameOpacity }}
        >
          <p className="text-[11px] uppercase tracking-[0.3em]">
            Scroll to explore
          </p>
          <div className="mx-auto mt-3 h-10 w-px bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
