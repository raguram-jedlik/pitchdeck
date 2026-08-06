"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { roadmap } from "@/data/jedlikData";

/**
 * Funding roadmap. Single black vertical rule with a red fill that grows as
 * the user scrolls past each milestone. NOW is the active raise — marked with
 * a red dot and red label.
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
      className="relative bg-paper px-6 py-20 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-deck">
        <p className="eyebrow">Section 04 — The Fuel</p>
        <h2 className="display-lg mt-4 max-w-[18ch] text-ink">
          The fuel needed to bring Jedlik alive.
        </h2>

        <div className="relative mt-16">
          {/* base rule */}
          <div className="absolute top-0 bottom-0 left-2 w-px bg-rule md:left-3" />
          {/* red fill */}
          <motion.div
            style={{ height: fillHeight }}
            className="absolute top-0 left-2 w-px bg-red md:left-3"
          />

          <ol className="flex flex-col gap-10">
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
                <ul className="mt-3 space-y-1 text-sm leading-relaxed text-ink md:text-base">
                  {m.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="text-muted" aria-hidden="true">
                        —
                      </span>
                      <span>{p}</span>
                    </li>
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