"use client";

import Reveal, { WordReveal } from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-3xl ${alignCls} ${className}`}>
      <Reveal>
        <p className="mb-5 text-[13px] font-medium uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      </Reveal>
      <h2 className="mb-6 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        <WordReveal text={title} />
      </h2>
      {description && (
        <Reveal delay={0.15}>
          <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
