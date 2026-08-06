"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { founders, mentors, teamHighlight } from "@/data/jedlikData";

/**
 * Founders + mentors. Both rows are user-scrollable right-to-left on mobile
 * via a horizontal scroll container; no auto-marquee. Desktop lays out the
 * rows as static grids.
 */
export default function TeamForces() {
  const mentorsScrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (ref: React.RefObject<HTMLDivElement>, dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * 240, behavior: "smooth" });
  };

  return (
    <section className="relative bg-paper px-6 py-12 md:px-10 md:py-20">
      <div className="mx-auto max-w-deck">
        <p className="eyebrow">Section 03 — The Forces</p>
        <h2 className="display-lg mt-4 max-w-[16ch] text-ink">
          The team that will bring Jedlik alive.
        </h2>

        {/* Founders — static grid on desktop, scrollable row on mobile */}
        <div className="mt-10 -mx-6 overflow-x-auto pb-2 md:mx-0 md:overflow-visible md:pb-0">
          <div className="flex w-max gap-6 px-6 md:grid md:w-full md:grid-cols-3 md:gap-6 md:px-0">
            {founders.map((f, i) => (
              <motion.figure
                key={f.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="w-[220px] shrink-0 md:w-auto"
              >
                {f.image && (
                  <div className="aspect-[4/5] w-full overflow-hidden bg-rule">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={f.image}
                      alt={f.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <figcaption className="mt-3 flex flex-col">
                  <span className="font-display text-sm font-semibold uppercase tracking-tight text-ink md:text-base">
                    {f.name}
                  </span>
                  <span className="mt-1 text-xs text-muted md:text-sm">{f.role}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>

        <p className="mt-10 max-w-3xl border-l-2 border-red pl-5 text-sm font-medium leading-relaxed text-ink md:text-base">
          {teamHighlight}
        </p>

        {/* Mentors — scrollable row on mobile, static grid on desktop */}
        <div className="mt-14">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Mentors &amp; Advisors
            </h3>
            <div className="hidden gap-1 md:flex">
              <button
                type="button"
                aria-label="Scroll mentors left"
                onClick={() => scrollBy(mentorsScrollRef, -1)}
                className="flex h-8 w-8 items-center justify-center border border-rule text-ink hover:bg-rule"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Scroll mentors right"
                onClick={() => scrollBy(mentorsScrollRef, 1)}
                className="flex h-8 w-8 items-center justify-center border border-rule text-ink hover:bg-rule"
              >
                →
              </button>
            </div>
          </div>
          <div
            ref={mentorsScrollRef}
            className="-mx-6 mt-5 flex w-max snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-3 md:mx-0 md:grid md:w-full md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0"
          >
            {mentors.map((m, i) => (
              <motion.article
                key={m.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex w-[260px] shrink-0 snap-center flex-col md:w-auto"
              >
                {m.image && (
                  <div className="aspect-[4/5] w-full overflow-hidden bg-rule">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.image}
                      alt={m.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="mt-3 flex flex-col">
                  <span className="font-display text-sm font-semibold uppercase tracking-tight text-ink md:text-base">
                    {m.name}
                  </span>
                  <span className="mt-1 text-xs text-ink md:text-sm">{m.role}</span>
                  {m.detail && (
                    <span className="mt-1 text-xs leading-relaxed text-muted">
                      {m.detail}
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}