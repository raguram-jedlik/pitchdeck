"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/**
 * KnowMoreCta — the closing section of the brief deck.
 *
 * Sits after the last content section (IP / projection / feedback) and
 * before the footer. Its only job is to open the single detailed
 * information page, so the button is at the bottom of the deck where a
 * reader finishes rather than at the top where it competes with the
 * opening statement.
 */
export default function KnowMoreCta() {
  return (
    <section id="know-more" className="relative border-t border-rule bg-paper px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-deck">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-[46ch]"
        >
          <p className="eyebrow">The detail behind the deck</p>
          <h2 className="display-lg mt-4 text-ink">
            Everything behind this, in one place.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
            The deck is the headline. This page is the evidence — business model,
            unit economics, the manufacturing plan, use of funds, cap table,
            operations, IP and the fourteen-year projection, with every number
            marked and sourced.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mt-10"
        >
          <Link
            href="/detail"
            className="group inline-flex items-center gap-3 bg-red px-7 py-4 font-display text-xs font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-red-deep"
          >
            Know more
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
