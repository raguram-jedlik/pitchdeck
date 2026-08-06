"use client";

import { motion } from "framer-motion";
import { founders, mentors, teamHighlight } from "@/data/jedlikData";

/**
 * Founders + mentors. Real portraits in colour (no grayscale), hairline rules.
 * Founder row is a static grid; mentor row is a right-to-left marquee so all
 * three mentors are visible without crowding.
 */
export default function TeamForces() {
  return (
    <section className="relative bg-paper px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-deck">
        <p className="eyebrow">Section 03 — The Forces</p>
        <h2 className="display-lg mt-4 max-w-[16ch] text-ink">
          The team that will bring Jedlik alive.
        </h2>

        {/* Founders — static grid, large portraits */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={f.image}
                    alt={f.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
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

        <p className="mt-12 max-w-3xl border-l-2 border-red pl-5 text-sm font-medium leading-relaxed text-ink md:text-base">
          {teamHighlight}
        </p>

        {/* Mentors — right-to-left marquee so the row scrolls naturally */}
        <div className="mt-16">
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Mentors &amp; Advisors
          </h3>
          <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="flex w-max animate-marquee gap-6 motion-reduce:animate-none motion-reduce:[transform:none]">
              {[...mentors, ...mentors].map((m, i) => (
                <motion.article
                  key={`${m.name}-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: (i % mentors.length) * 0.08 }}
                  className="flex w-[260px] shrink-0 flex-col md:w-[300px]"
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
                    <span className="mt-1 text-xs text-ink">{m.role}</span>
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
      </div>
    </section>
  );
}