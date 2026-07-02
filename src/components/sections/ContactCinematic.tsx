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
import { siteConfig, images } from "@/lib/data";

export default function ContactCinematic() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative flex min-h-[90vh] items-center overflow-hidden py-32"
    >
      {/* Full-bleed background image */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: reduce ? 1 : imgScale }}
      >
        <img
          src={images.contact}
          alt=""
          className="chapter-image"
          loading="lazy"
        />
      </motion.div>
      <div className="image-overlay image-overlay-full" />
      <div className="image-overlay bg-radial-fade opacity-50" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="text-[13px] uppercase tracking-[0.2em] text-accent">
              Contact
            </p>
          </Reveal>

          <h2 className="mt-6 text-5xl font-semibold tracking-tight sm:text-7xl lg:text-8xl">
            <WordReveal
              text="Let's build what's next."
              className="text-gradient text-balance"
              delay={0.1}
              stagger={0.08}
            />
          </h2>

          <Reveal delay={0.35}>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted-foreground">
              Open to operations leadership roles, supply-chain consulting, and
              strategic partnerships.
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group relative inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background transition-transform duration-300 hover:scale-[1.04]"
                >
                  <span
                    aria-hidden="true"
                    className="glow-accent absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <span className="relative">Email Sumanraj</span>
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-border px-8 py-3.5 text-sm font-medium text-foreground transition-colors duration-300 hover:border-white/20 hover:bg-surface"
                >
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.4v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                  </svg>
                  LinkedIn
                </a>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.6}>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-16 inline-block text-lg text-muted-foreground underline-offset-8 transition-colors duration-300 hover:text-foreground hover:underline md:text-2xl"
            >
              {siteConfig.email}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
