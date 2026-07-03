"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { hero, intro } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

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

/* ── mouse-following spotlight ── */

function Spotlight() {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const smoothX = useSpring(x, { stiffness: 40, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 40, damping: 30 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      x.set(e.clientX / window.innerWidth);
      y.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      style={{
        background: useTransform(
          [smoothX, smoothY],
          ([px, py]: number[]) =>
            `radial-gradient(600px circle at ${px * 100}% ${py * 100}%, rgba(77,163,255,0.06), transparent 60%)`,
        ),
      }}
    />
  );
}

/* ── role rotator ── */

const ROLES = [
  "Supply Chain Leader",
  "Operations Strategist",
  "Logistics Optimizer",
  "Process Architect",
];

function RoleRotator() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block h-[1.2em] w-full overflow-hidden align-bottom">
      {ROLES.map((role, i) => (
        <motion.span
          key={role}
          className="absolute left-0 top-0 whitespace-nowrap text-accent"
          initial={false}
          animate={{
            y: i === idx ? 0 : i === (idx - 1 + ROLES.length) % ROLES.length ? -36 : 36,
            opacity: i === idx ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {role}
        </motion.span>
      ))}
    </span>
  );
}

/* ── main component ── */

export default function PersonalHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

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
    reduce ? [0, 0] : [30, 0],
  );
  const quoteOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.65, 0.78],
    [0, 1, 1, 0],
  );
  const quoteY = useTransform(
    scrollYProgress,
    [0.4, 0.5],
    reduce ? [0, 0] : [20, 0],
  );
  const overlayOpacity = useTransform(scrollYProgress, [0.82, 1], [0, 0.95]);

  const statsParsed = intro.stats.map((s) => {
    const num = parseInt(s.value.replace(/[^0-9]/g, ""), 10);
    const suffix = s.value.replace(/[0-9]/g, "");
    return { ...s, num, suffix };
  });

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-[#050507]">
        {/* ambient: two slow gradient orbs + spotlight + grain */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full opacity-[0.03]"
            style={{
              background: "radial-gradient(circle, rgba(77,163,255,1) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-48 -right-48 h-[600px] w-[600px] rounded-full opacity-[0.025]"
            style={{
              background: "radial-gradient(circle, rgba(52,211,153,1) 0%, transparent 70%)",
            }}
          />
        </div>
        <Spotlight />
        <div
          className="pointer-events-none absolute inset-0 z-30 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* exit overlay */}
        <motion.div
          className="absolute inset-0 z-30 bg-[#050507]"
          style={{ opacity: overlayOpacity }}
        />

        {/* content */}
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 lg:px-12">
          <motion.div style={{ y: nameY, opacity: nameOpacity }}>
            {/* greeting label */}
            <motion.p
              className="font-mono text-[13px] font-medium tracking-[0.25em] text-accent"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {hero.greeting}
            </motion.p>

            <motion.div
              className="mt-4 h-px max-w-xs bg-gradient-to-r from-transparent via-accent/30 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: EASE }}
            />

            {/* name — word-level reveal */}
            <h1 className="mt-5 text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
              <motion.span
                className="inline-block"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              >
                {hero.firstName}
              </motion.span>
              <br />
              <motion.span
                className="text-gradient inline-block"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
              >
                {hero.lastName}
              </motion.span>
            </h1>

            {/* rotating role */}
            <motion.div
              className="mt-4 text-xl font-light text-white/60 sm:text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
            >
              <RoleRotator />
            </motion.div>

            {/* subtitle */}
            <motion.p
              className="mt-6 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7, ease: EASE }}
            >
              {hero.subtitle}
            </motion.p>
          </motion.div>

          {/* stats */}
          <motion.div
            className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
            style={{ opacity: statsOpacity, y: statsY }}
          >
            {statsParsed.map((s, i) => (
              <motion.div
                key={s.label}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: EASE,
                }}
              >
                <p className="text-3xl font-semibold text-white sm:text-4xl">
                  <CountUp
                    target={s.num}
                    suffix={s.suffix}
                    duration={1800}
                    delay={300 + i * 200}
                  />
                </p>
                <div className="my-2 h-px w-8 bg-accent/20" />
                <p className="text-sm text-white/50">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* quote phase */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center bg-[#050507] px-6"
          style={{ opacity: quoteOpacity, y: quoteY }}
        >
          <div className="text-center">
            <div className="mx-auto mb-6 h-px w-16 bg-accent/20" />
            <blockquote className="max-w-2xl text-xl leading-relaxed text-white/90 italic sm:text-2xl lg:text-3xl">
              &ldquo;{intro.statement}&rdquo;
            </blockquote>
            <div className="mx-auto mt-6 h-px w-16 bg-accent/20" />
          </div>
        </motion.div>

        {/* scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center text-white/25"
          style={{ opacity: nameOpacity }}
        >
          <p className="text-[11px] uppercase tracking-[0.3em]">
            Scroll to explore
          </p>
          <motion.div
            className="mx-auto mt-3 h-10 w-px"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)",
            }}
            animate={{ scaleY: [0.3, 1, 0.3] }}
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
