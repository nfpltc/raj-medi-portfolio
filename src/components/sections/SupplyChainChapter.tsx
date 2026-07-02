"use client";

import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import NetworkFlow from "@/components/visuals/NetworkFlow";
import { chapters, images } from "@/lib/data";

const sc = chapters.supplyChain;

export default function SupplyChainChapter() {
  return (
    <section id="supply-chain" className="relative">
      <div className="lg:flex">
        {/* Sticky image — left */}
        <div className="relative h-[50vh] lg:sticky lg:top-0 lg:h-screen lg:w-[55%]">
          <img
            src={images.supplyChain}
            alt=""
            className="chapter-image"
            loading="lazy"
          />
          <div className="image-overlay image-overlay-bottom lg:hidden" />
          <div className="hidden lg:block image-edge-right" />
          <div className="image-overlay" style={{ background: "rgba(5,5,7,0.15)" }} />
        </div>

        {/* Scrolling content — right */}
        <div className="relative z-10 lg:w-[45%]">
          {/* Panel 1: Title */}
          <div className="flex min-h-[60vh] items-center px-6 py-20 lg:min-h-screen lg:px-14">
            <Reveal>
              <div>
                <p className="text-[13px] uppercase tracking-[0.2em] text-accent">
                  {sc.eyebrow}
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground lg:text-5xl">
                  {sc.title}
                </h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                  {sc.description}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Panel 2: Skills */}
          <div className="flex min-h-[50vh] items-center px-6 py-16 lg:min-h-[70vh] lg:px-14">
            <Reveal delay={0.05}>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Core capabilities
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {sc.skills.map((skill) => (
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

          {/* Panel 3: Network Flow Visual */}
          <div className="flex min-h-[50vh] items-center px-6 py-16 lg:min-h-[70vh] lg:px-14">
            <div className="w-full">
              <NetworkFlow />
            </div>
          </div>

          {/* Panel 4: KPIs */}
          <div className="flex min-h-[50vh] items-center px-6 py-16 lg:min-h-[70vh] lg:px-14">
            <Reveal delay={0.05}>
              <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-3">
                {sc.kpis.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="glass rounded-2xl p-6"
                  >
                    <CountUp
                      value={kpi.value}
                      className="text-3xl font-semibold text-foreground lg:text-4xl"
                    />
                    <p className="mt-2 text-sm text-muted-foreground">
                      {kpi.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
