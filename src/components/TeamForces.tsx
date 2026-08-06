"use client";

import { motion } from "framer-motion";
import { founders, mentors, teamHighlight } from "@/data/jedlikData";

/**
 * Founders + mentors. Real portraits, hairline rules, no glass / glow.
 */
export default function TeamForces() {
  return (
    <section className="relative bg-paper px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-deck">
        <p className="eyebrow">Section 03 — The Forces</p>
        <h2 className="display-lg mt-4 max-w-[16ch] text-ink">
          The team that will bring Jedlik alive.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {founders.map((f, i) => (
            <motion.figure
              key={f.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col"
            >
              {f.image && (
                <div className="aspect-[4/5] w-full overflow-hidden bg-rule">
                  <img
                    src={f.image}
                    alt={f.name}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale"
                  />
                </div>
              )}
              <figcaption className="mt-4 flex flex-col">
                <span className="font-display text-base font-semibold uppercase tracking-tight text-ink md:text-lg">
                  {f.name}
                </span>
                <span className="mt-1 text-sm text-muted">{f.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="mt-14 max-w-3xl border-l-2 border-red pl-5 text-sm font-medium leading-relaxed text-ink md:text-base">
          {teamHighlight}
        </p>

        <div className="mt-20">
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Mentors &amp; Advisors
          </h3>
          <ul className="mt-6 divide-y divide-rule border-t border-rule">
            {mentors.map((m, i) => (
              <motion.li
                key={m.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[1fr_1.5fr] sm:gap-8"
              >
                <span className="font-display text-sm font-semibold uppercase tracking-tight text-ink md:text-base">
                  {m.name}
                </span>
                <span className="text-sm leading-relaxed text-muted md:text-base">
                  <span className="text-ink">{m.role}</span>
                  {m.detail && (
                    <>
                      <span className="mx-2 text-muted">·</span>
                      {m.detail}
                    </>
                  )}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}