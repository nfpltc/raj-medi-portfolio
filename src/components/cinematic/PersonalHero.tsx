"use client";

import { useRef, useState, useEffect, useCallback } from "react";
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

/* ── text scramble hook ── */

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789&·▓░▒█";

function useScramble(text: string, delay = 0) {
  const [display, setDisplay] = useState("");

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
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    const t = setTimeout(start, delay);
    return () => clearTimeout(t);
  }, [start, delay]);

  return display;
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
            `radial-gradient(600px circle at ${px * 100}% ${py * 100}%, rgba(77,163,255,0.08), transparent 60%)`,
        ),
      }}
    />
  );
}

/* ── animated grid background ── */

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.04]">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(0deg, transparent 0%, rgba(77,163,255,0.3) 50%, transparent 100%)",
          height: "30%",
        }}
        animate={{ y: ["-30%", "130%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
      />
    </div>
  );
}

/* ── floating particles with connections ── */

function ParticleField() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: `${(i * 2.1 + 3) % 100}%`,
    y: `${(i * 7.7 + 5) % 100}%`,
    size: 1 + (i % 4),
    dur: 5 + (i % 7) * 1.5,
    del: (i % 10) * 0.4,
    range: 20 + (i % 5) * 15,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: p.id % 3 === 0 ? "rgba(77,163,255,0.4)" : "rgba(255,255,255,0.15)",
            boxShadow: p.id % 5 === 0 ? "0 0 6px rgba(77,163,255,0.3)" : "none",
          }}
          animate={{
            y: [0, -p.range, 0],
            x: [0, (p.id % 2 === 0 ? 1 : -1) * (p.range / 2), 0],
            opacity: [0.15, 0.5, 0.15],
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

/* ── gradient orbs ── */

function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, rgba(77,163,255,1) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 80, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-48 -right-48 h-[600px] w-[600px] rounded-full opacity-[0.025]"
        style={{
          background: "radial-gradient(circle, rgba(52,211,153,1) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full opacity-[0.02]"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,1) 0%, transparent 70%)",
        }}
        animate={{
          y: [0, 50, 0],
          scale: [0.8, 1.15, 0.8],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
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
    }, 2500);
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
            y: i === idx ? 0 : i === (idx - 1 + ROLES.length) % ROLES.length ? -40 : 40,
            opacity: i === idx ? 1 : 0,
            filter: i === idx ? "blur(0px)" : "blur(4px)",
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {role}
        </motion.span>
      ))}
    </span>
  );
}

/* ── animated line that draws itself ── */

function DrawLine({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  return (
    <motion.div
      className={`h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent ${className}`}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
    />
  );
}

/* ── character-by-character name reveal ── */

function CharReveal({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={className}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className="inline-block"
          initial={{ y: 80, opacity: 0, rotateX: 90, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, rotateX: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 14,
            delay: delay + i * 0.045,
          }}
          style={{ transformOrigin: "bottom center" }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ── glitch flash on name ── */

function GlitchFlash({ children }: { children: React.ReactNode }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const fire = () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    };
    const t1 = setTimeout(fire, 3000);
    const interval = setInterval(fire, 8000);
    return () => {
      clearTimeout(t1);
      clearInterval(interval);
    };
  }, []);

  return (
    <span className="relative">
      {children}
      {glitch && (
        <>
          <span
            className="absolute left-0 top-0 text-red-500/30"
            style={{ clipPath: "inset(10% 0 60% 0)", transform: "translate(-3px, -1px)" }}
          >
            {children}
          </span>
          <span
            className="absolute left-0 top-0 text-cyan-400/30"
            style={{ clipPath: "inset(50% 0 20% 0)", transform: "translate(3px, 1px)" }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
}

/* ── film grain overlay ── */

function FilmGrain() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-30 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}

/* ── stat card with glassmorphism ── */

function StatCard({
  stat,
  index,
}: {
  stat: { num: number; suffix: string; label: string };
  index: number;
}) {
  return (
    <motion.div
      className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 backdrop-blur-sm"
      initial={{ scale: 0, opacity: 0, y: 30, rotateY: -15 }}
      whileInView={{ scale: 1, opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.12,
      }}
      whileHover={{
        scale: 1.05,
        borderColor: "rgba(77,163,255,0.2)",
        transition: { duration: 0.2 },
      }}
    >
      <p className="text-3xl font-semibold text-white sm:text-4xl">
        <CountUp
          target={stat.num}
          suffix={stat.suffix}
          duration={1800}
          delay={300 + index * 250}
        />
      </p>
      <motion.div
        className="my-2 h-px w-8 bg-accent/30"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 + index * 0.15, duration: 0.6 }}
      />
      <p className="text-sm text-white/50">{stat.label}</p>
    </motion.div>
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

  const scrambled = useScramble(hero.greeting, 200);

  const nameOpacity = useTransform(scrollYProgress, [0.1, 0.22], [1, 0]);
  const nameY = useTransform(
    scrollYProgress,
    [0, 0.35],
    reduce ? [0, 0] : [0, -80],
  );
  const nameScale = useTransform(scrollYProgress, [0, 0.22], [1, 0.95]);
  const statsOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.12, 0.22, 0.32],
    [0, 1, 1, 0],
  );
  const statsY = useTransform(
    scrollYProgress,
    [0.05, 0.15],
    reduce ? [0, 0] : [50, 0],
  );
  const quoteOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.65, 0.78],
    [0, 1, 1, 0],
  );
  const quoteScale = useTransform(scrollYProgress, [0.35, 0.5], [0.9, 1]);
  const quoteY = useTransform(
    scrollYProgress,
    [0.4, 0.5],
    reduce ? [0, 0] : [30, 0],
  );
  const overlayOpacity = useTransform(scrollYProgress, [0.82, 1], [0, 0.95]);

  const subtitleWords = hero.subtitle.split(" ");

  const statsParsed = intro.stats.map((s) => {
    const num = parseInt(s.value.replace(/[^0-9]/g, ""), 10);
    const suffix = s.value.replace(/[0-9]/g, "");
    return { ...s, num, suffix };
  });

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-[#050507]">
        <GradientOrbs />
        <AnimatedGrid />
        <ParticleField />
        <Spotlight />
        <FilmGrain />

        <motion.div
          className="absolute inset-0 z-30 bg-[#050507]"
          style={{ opacity: overlayOpacity }}
        />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 lg:px-12">
          <motion.div style={{ y: nameY, opacity: nameOpacity, scale: nameScale }}>
            <motion.p
              className="font-mono text-[13px] font-medium tracking-[0.25em] text-accent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {scrambled}
              <motion.span
                className="ml-1 inline-block h-4 w-[2px] bg-accent"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              />
            </motion.p>

            <DrawLine delay={0.8} className="mt-4 max-w-xs" />

            <h1 className="mt-5 text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl [perspective:1000px]">
              <GlitchFlash>
                <CharReveal text={hero.firstName} delay={0.4} />
              </GlitchFlash>
              <br />
              <CharReveal text={hero.lastName} delay={0.9} className="text-gradient" />
            </h1>

            <motion.div
              className="mt-4 text-xl font-light text-white/60 sm:text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              <RoleRotator />
            </motion.div>

            <DrawLine delay={2.2} className="mt-5 max-w-lg" />

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg [perspective:400px]">
              {subtitleWords.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  className="mr-[0.3em] inline-block"
                  initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 0.4,
                    delay: 2.4 + i * 0.035,
                    ease: "easeOut",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </motion.div>

          <motion.div
            className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
            style={{ opacity: statsOpacity, y: statsY }}
          >
            {statsParsed.map((s, i) => (
              <StatCard key={s.label} stat={s} index={i} />
            ))}
          </motion.div>
        </div>

        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center bg-[#050507] px-6"
          style={{ opacity: quoteOpacity, y: quoteY, scale: quoteScale }}
        >
          <div className="text-center">
            <motion.div
              className="mx-auto mb-6 h-px w-16 bg-accent/30"
              style={{ opacity: quoteOpacity }}
            />
            <blockquote className="max-w-2xl text-xl leading-relaxed text-white/90 italic sm:text-2xl lg:text-3xl">
              &ldquo;{intro.statement}&rdquo;
            </blockquote>
            <motion.div
              className="mx-auto mt-6 h-px w-16 bg-accent/30"
              style={{ opacity: quoteOpacity }}
            />
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center text-white/30"
          style={{ opacity: nameOpacity }}
        >
          <motion.p
            className="text-[11px] uppercase tracking-[0.3em]"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Scroll to explore
          </motion.p>
          <motion.div
            className="mx-auto mt-3 h-10 w-px"
            style={{
              background: "linear-gradient(to bottom, rgba(77,163,255,0.4), transparent)",
            }}
            animate={{ scaleY: [0, 1, 0], y: [0, 0, 10] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
