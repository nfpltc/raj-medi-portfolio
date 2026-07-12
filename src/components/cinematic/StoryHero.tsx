"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { siteConfig } from "@/lib/data";

export default function StoryHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const imgScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [1, 1.15],
  );
  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, -100],
  );
  const titleOpacity = useTransform(scrollYProgress, [0.3, 0.8], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0.4, 1], [0, 0.92]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
          <img
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?fm=jpg&w=1920&q=80&fit=crop"
            alt=""
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
        <motion.div
          className="absolute inset-0 bg-[#050507]"
          style={{ opacity: overlayOpacity }}
        />

        <motion.div
          className="relative z-10 text-center"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent drop-shadow-lg">
            {siteConfig.name}
          </p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
            From Source
            <br />
            <span className="text-gradient">to Customer.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base text-white/80 sm:text-lg">
            A visual journey through every stage of the supply chain — the
            networks, the systems, and the decisions that move the world.
          </p>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center text-white/30"
          style={{ opacity: titleOpacity }}
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
