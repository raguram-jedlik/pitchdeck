"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/**
 * KnowMoreCta — the closing section of the brief deck.
 *
 * Carries the single "Know more" button that opens the detailed
 * information page. It sits at the bottom of the deck, after the last
 * content section and before the footer, so it does not compete with
 * the opening statement in the Hero.
 *
 * The button and its caption are unchanged from the Hero — this is the
 * same link, relocated, not a new call to action.
 */
export default function KnowMoreCta() {
  return (
    <section className="border-t border-rule px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-deck">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/detail"
            className="group inline-flex items-center gap-3 bg-red px-6 py-3.5 font-display text-xs font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-red-deep"
          >
            Know more
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
          <p className="mt-3 text-xs text-muted">
            The full picture — model, economics, factory, round, projection.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
