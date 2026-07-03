"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { hero, intro } from "@/lib/data";

/* ── text scramble hook ── */

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789&·";

function useScramble(text: string, delay = 0) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  const start = useCallback(() => {
    let iteration = 0;
    const target = text.toUpperCase();
    const interval = setInterval(() => {
      setDisplay(
        target
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < iteration) return target[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(""),
      );
      iteration += 1 / 2;
      if (iteration >= target.length) {
        setDisplay(target);
        setDone(true);
        clearInterval(interval);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    const t = setTimeout(start, delay);
    return () => clearTimeout(t);
  }, [start, delay]);

  return { display, done };
}

/* ── counting number ── */

function CountUp({
  target,
  suffix = "",
  duration = 2000,
  delay = 0,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [inView, target, duration, delay]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/* ── floating particles ── */

function Particles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: `${(i * 2.5) % 100}%`,
    y: `${(i * 7.3) % 100}%`,
    size: 1 + (i % 3),
    dur: 4 + (i % 5) * 2,
    del: (i % 8) * 0.5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent/20"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.del,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ── horizontal light sweep ── */

function LightSweep() {
  return (
    <motion.div
      className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(77,163,255,0.3) 50%, transparent 100%)",
      }}
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{ duration: 3.5, delay: 1.5, ease: "easeInOut" }}
    />
  );
}

/* ── word drop animation ── */

const wordDrop = {
  hidden: { y: -80, opacity: 0, rotateX: 45 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      delay: 0.6 + i * 0.15,
    },
  }),
};

const subtitleWord = {
  hidden: { y: 20, opacity: 0, filter: "blur(8px)" },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      delay: 1.8 + i * 0.04,
      ease: "easeOut",
    },
  }),
};

/* ── main component ── */

export default function PersonalHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const { display: scrambled } = useScramble(hero.greeting, 200);

  const nameOpacity = useTransform(scrollYProgress, [0.1, 0.22], [1, 0]);
  const nameY = useTransform(
    scrollYProgress,
    [0, 0.35],
    reduce ? [0, 0] : [0, -60],
  );
  const statsOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.12, 0.22, 0.32],
    [0, 1, 1, 0],
  );
  const statsY = useTransform(
    scrollYProgress,
    [0.05, 0.15],
    reduce ? [0, 0] : [40, 0],
  );
  const quoteOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.65, 0.78],
    [0, 1, 1, 0],
  );
  const quoteY = useTransform(
    scrollYProgress,
    [0.4, 0.5],
    reduce ? [0, 0] : [30, 0],
  );
  const overlayOpacity = useTransform(scrollYProgress, [0.82, 1], [0, 0.95]);

  const nameWords = [hero.firstName, hero.lastName];
  const subtitleWords = hero.subtitle.split(" ");

  const statsParsed = intro.stats.map((s) => {
    const num = parseInt(s.value.replace(/[^0-9]/g, ""), 10);
    const suffix = s.value.replace(/[0-9]/g, "");
    return { ...s, num, suffix };
  });

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-[#050507]">
        <Particles />
        <LightSweep />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(77,163,255,0.05)_0%,transparent_65%)]" />

        <motion.div
          className="absolute inset-0 bg-[#050507]"
          style={{ opacity: overlayOpacity }}
        />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 lg:px-12">
          <motion.div style={{ y: nameY, opacity: nameOpacity }}>
            <p className="font-mono text-[13px] font-medium tracking-[0.25em] text-accent">
              {scrambled}
            </p>

            <h1 className="mt-5 text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl [perspective:800px]">
              {nameWords.map((word, i) => (
                <motion.span
                  key={word}
                  className={`inline-block ${i === 1 ? "text-gradient" : ""}`}
                  variants={wordDrop}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  style={{ transformOrigin: "top center" }}
                >
                  {word}
                  {i === 0 && <br />}
                </motion.span>
              ))}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl [perspective:400px]">
              {subtitleWords.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  className="mr-[0.3em] inline-block"
                  variants={subtitleWord}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </motion.div>

          <motion.div
            className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-10"
            style={{ opacity: statsOpacity, y: statsY }}
          >
            {statsParsed.map((s, i) => (
              <div key={s.label}>
                <p className="text-3xl font-semibold text-white sm:text-4xl">
                  <CountUp
                    target={s.num}
                    suffix={s.suffix}
                    duration={1800}
                    delay={200 + i * 300}
                  />
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
          className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center text-white/30"
          style={{ opacity: nameOpacity }}
        >
          <p className="text-[11px] uppercase tracking-[0.3em]">
            Scroll to explore
          </p>
          <motion.div
            className="mx-auto mt-3 h-10 w-px bg-gradient-to-b from-white/30 to-transparent"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
