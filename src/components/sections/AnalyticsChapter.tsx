"use client";

import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import { chapters, images } from "@/lib/data";

const analytics = chapters.analytics;

export default function AnalyticsChapter() {
  return (
    <section id="analytics" className="relative">
      {/* Reversed: content left, image right */}
      <div className="lg:flex lg:flex-row-reverse">
        {/* Sticky image — right */}
        <div className="relative h-[50vh] lg:sticky lg:top-0 lg:h-screen lg:w-[55%]">
          <img
            src={images.analytics}
            alt=""
            className="chapter-image"
            loading="lazy"
          />
          <div className="image-overlay image-overlay-bottom lg:hidden" />
          <div
            className="hidden lg:block absolute inset-y-0 left-0 w-32"
            style={{ background: "linear-gradient(to right, var(--background), transparent)" }}
          />
          <div className="image-overlay" style={{ background: "rgba(5,5,7,0.2)" }} />
        </div>

        {/* Scrolling content — left */}
        <div className="relative z-10 lg:w-[45%]">
          {/* Panel 1: Title */}
          <div className="flex min-h-[60vh] items-center px-6 py-20 lg:min-h-screen lg:px-14">
            <Reveal>
              <div>
                <p className="text-[13px] uppercase tracking-[0.2em] text-accent">
                  {analytics.eyebrow}
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground lg:text-5xl">
                  {analytics.title}
                </h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                  {analytics.description}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Panel 2: KPI dashboard */}
          <div className="flex min-h-[60vh] items-center px-6 py-16 lg:min-h-[80vh] lg:px-14">
            <Reveal delay={0.05}>
              <div className="w-full">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Operations Scorecard
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {analytics.kpis.map((kpi) => {
                    const isGreen =
                      kpi.value.startsWith("-") ||
                      kpi.value === "100%";
                    return (
                      <div
                        key={kpi.label}
                        className="glass rounded-2xl p-5"
                      >
                        <CountUp
                          value={kpi.value}
                          className={`text-2xl font-semibold tracking-tight lg:text-3xl ${
                            isGreen ? "text-success" : "text-foreground"
                          }`}
                        />
                        <p className="mt-1.5 text-xs text-muted-foreground">
                          {kpi.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Panel 3: Skills */}
          <div className="flex min-h-[50vh] items-center px-6 py-16 lg:min-h-[70vh] lg:px-14">
            <Reveal delay={0.05}>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Disciplines
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {analytics.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground transition-colors hover:border-accent/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
