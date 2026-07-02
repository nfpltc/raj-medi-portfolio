"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 36,
  blur = false,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : y, filter: blur ? "blur(10px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function WordReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.05,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className={`inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] ${
            i < words.length - 1 ? "mr-[0.26em]" : ""
          }`}
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            initial={{ y: reduce ? 0 : "110%", opacity: reduce ? 0 : 1 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, delay: delay + i * stagger, ease: EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
