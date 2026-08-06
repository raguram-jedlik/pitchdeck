"use client";

import { motion } from "framer-motion";
import { personas } from "@/data/jedlikData";

/**
 * Three target customers. Numbered, hairline rules, single red accent on
 * the TAM share and the number marker.
 */
export default function Personas() {
  return (
    <section className="relative bg-paper px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-deck">
        <p className="eyebrow">Section 08 — The Customers</p>
        <h2 className="display-lg mt-4 max-w-[16ch] text-ink">
          Target customers.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-px bg-rule sm:grid-cols-3">
          {personas.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-paper p-6 md:p-8"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-sm font-bold text-red">
                  {p.number}
                </span>
                <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-red">
                  {p.tam}
                </span>
              </div>

              <h3 className="mt-5 font-display text-lg font-semibold uppercase leading-tight tracking-tight text-ink md:text-xl">
                {p.title}
              </h3>

              <dl className="mt-6 space-y-3 text-sm md:text-base">
                {[
                  ["Age", p.age],
                  ["Income", p.income],
                  ["Location", p.location],
                  ["Trigger", p.trigger],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[6rem_1fr] gap-3">
                    <dt className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                      {k}
                    </dt>
                    <dd className="text-ink">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 border-t border-rule pt-4">
                <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  LTV
                </span>
                <p className="mt-1 font-display text-base font-bold text-ink md:text-lg">
                  {p.ltv}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}