"use client";

import { motion } from "framer-motion";
import { commuterNeeds } from "@/data/jedlikData";

/**
 * Eleven things a commuter actually wants. Numbered grid, hairline rules,
 * no icons. The red numeral is the only accent.
 */
export default function CommuterNeeds() {
  return (
    <section
      id="commuter-needs"
      className="relative bg-paper px-6 py-20 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-deck">
        <p className="eyebrow">Section 01 — The Need</p>
        <h2 className="display-lg mt-4 max-w-[18ch] text-ink">
          What does an urban commuter really need?
        </h2>
        <p className="mt-4 max-w-xl text-base text-muted md:text-lg">
          Not just a vehicle. A better way to move.
        </p>

        <ol className="mt-14 grid grid-cols-1 border-t border-rule sm:grid-cols-2 lg:grid-cols-3">
          {commuterNeeds.map((need, i) => (
            <motion.li
              key={need.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex items-baseline gap-5 border-b border-rule px-1 py-5 sm:px-4 sm:py-6"
            >
              <span className="font-display text-sm font-semibold text-red">
                {String(need.id).padStart(2, "0")}
              </span>
              <span className="font-display text-base font-medium uppercase leading-tight tracking-tight text-ink md:text-lg">
                {need.title}
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}