"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { roadmap } from "@/data/jedlikData";

/**
 * Funding roadmap. Mobile: horizontal snap-scroll row. Desktop: vertical
 * timeline with a single black rule that fills red as the user scrolls past
 * each milestone. Pre-Seed (FY2026) is the NOW raise.
 */
export default function RoadmapScrolly() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const fillHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className="relative bg-paper px-6 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-deck">
        <p className="eyebrow">Section 04 — The Fuel</p>
        <h2 className="display-lg mt-4 max-w-[18ch] text-ink">
          The fuel needed to bring Jedlik alive.
        </h2>

        {/* Mobile: horizontal snap-scroll row */}
        <div className="relative mt-12 -mx-6 overflow-x-auto pb-4 md:hidden">
          <ol className="flex w-max snap-x snap-mandatory gap-4 px-6">
            {roadmap.map((m, i) => (
              <motion.li
                key={`${m.year}-${m.label}-${i}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className={`relative w-[260px] shrink-0 snap-center border ${
                  m.isNow ? "border-red" : "border-rule"
                } bg-paper p-4`}
              >
                {m.isNow && (
                  <span className="absolute -top-3 left-3 inline-block bg-red px-2 py-0.5 font-display text-[0.6rem] font-bold uppercase tracking-wider text-paper">
                    Now
                  </span>
                )}
                <span
                  className={`font-display text-xl font-bold tracking-tight ${
                    m.isNow ? "text-red" : "text-ink"
                  }`}
                >
                  {m.year}
                </span>
                <span className="mt-1 block font-display text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  {m.label}
                </span>
                <ul className="mt-3 space-y-1 text-xs leading-relaxed text-ink">
                  {m.points.map((p) => (
                    <li key={p}>— {p}</li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Desktop: vertical timeline */}
        <div className="relative mt-12 hidden md:block">
          {/* base rule */}
          <div className="absolute top-0 bottom-0 left-2 w-px bg-rule md:left-3" />
          {/* red fill */}
          <motion.div
            style={{ height: fillHeight }}
            className="absolute top-0 left-2 w-px bg-red md:left-3"
          />

          <ol className="flex flex-col gap-8">
            {roadmap.map((m, i) => (
              <motion.li
                key={`${m.year}-${m.label}-${i}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="relative pl-10 md:pl-14"
              >
                <span
                  className={`absolute top-2 left-2 -translate-x-1/2 h-2 w-2 rounded-full md:left-3 ${
                    m.isNow ? "bg-red" : "bg-ink"
                  }`}
                />
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
                  <span
                    className={`font-display text-2xl font-bold tracking-tight md:text-3xl ${
                      m.isNow ? "text-red" : "text-ink"
                    }`}
                  >
                    {m.year}
                  </span>
                  <span
                    className={`font-display text-xs font-semibold uppercase tracking-[0.16em] ${
                      m.isNow ? "text-red" : "text-muted"
                    }`}
                  >
                    {m.isNow && "Now · "}
                    {m.label}
                  </span>
                </div>
                <ul className="mt-2 space-y-1 text-sm leading-relaxed text-ink md:text-base">
                  {m.points.map((p) => (
                    <li key={p}>— {p}</li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}