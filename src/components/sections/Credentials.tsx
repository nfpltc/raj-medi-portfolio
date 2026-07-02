"use client";

import Reveal from "@/components/motion/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import { education, testimonials } from "@/lib/data";

export default function Credentials() {
  return (
    <section id="credentials" className="relative py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <p className="text-[13px] uppercase tracking-[0.2em] text-accent">
            Credentials
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground lg:text-5xl">
            Foundation and endorsements.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            The training behind the discipline — and the words of the people who
            watched it work.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:mt-20 lg:grid-cols-2">
          {/* Education */}
          <div>
            <Reveal delay={0.05}>
              <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Education
              </p>
            </Reveal>

            <div className="mt-4">
              {education.map((entry, i) => (
                <Reveal key={entry.degree} delay={0.1 + i * 0.12}>
                  <div
                    className={`py-8 ${i > 0 ? "border-t border-border" : ""}`}
                  >
                    <p className="text-[13px] font-medium tracking-[0.08em] text-accent">
                      {entry.year}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                      {entry.degree}
                    </h3>
                    <p className="mt-1.5 leading-relaxed text-muted-foreground">
                      {entry.field}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {entry.institution}
                    </p>
                    <p className="mt-3 text-xs italic text-accent/50">
                      {entry.note}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Endorsements */}
          <div>
            <Reveal delay={0.15}>
              <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Endorsements
              </p>
            </Reveal>

            <div className="mt-4">
              {testimonials.map((t, i) => (
                <Reveal key={t.name} delay={0.2 + i * 0.12}>
                  <div
                    className={`py-8 ${i > 0 ? "border-t border-border" : ""}`}
                  >
                    <TiltCard max={3} scale={1.01} className="rounded-xl">
                      <blockquote>
                        <span
                          aria-hidden="true"
                          className="block select-none font-serif text-5xl leading-none text-border"
                        >
                          &ldquo;
                        </span>
                        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                          {t.quote}
                        </p>
                        <footer className="mt-5">
                          <p className="text-sm font-medium text-foreground">
                            {t.name}
                          </p>
                          <p className="mt-0.5 text-[13px] text-muted-foreground">
                            {t.role}
                          </p>
                          <p className="mt-3 text-xs italic text-accent/50">
                            {t.note}
                          </p>
                        </footer>
                      </blockquote>
                    </TiltCard>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
