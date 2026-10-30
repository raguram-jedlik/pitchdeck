"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/**
 * KnowMoreCta — the closing call to action of the brief deck.
 *
 * It carries the single "Know more" button that opens the detailed
 * information page. It now lives INSIDE Section 11 (Feedback), so the
 * deck has one fewer top-level section: the reader votes, then — in the
 * same frame — follows the link onward. A separate closing section left
 * a large empty screen between the verdict and the button, and pushed the
 * link past the reader's eye on phones.
 *
 * The button and its caption are unchanged from the Hero — this is the
 * same link, relocated, not a new call to action.
 *
 * The wrapper is a <div>, never a <section>: DeckShell's section
 * selector is ".deck-shell > section", so a <section> here would be
 * picked up as a top-level slide again.
 */
export default function KnowMoreCta() {
  return (
    <div className="border-t border-rule pt-8 md:pt-10">
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
  );
}
