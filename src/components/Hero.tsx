"use client";

import { motion } from "framer-motion";
import { brand } from "@/data/jedlikData";

/**
 * Hero — clean white ground, big display type, single statement, no parallax
 * orbs, no fake 3D. The vehicle is still withheld; only the wordmark appears.
 */
export default function Hero() {
  return (
    <section
      id="title"
      className="relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden bg-paper px-6 pb-12 pt-28 md:px-10 md:pb-20 md:pt-40"
    >
      <div className="relative mx-auto w-full max-w-deck">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow"
        >
          {brand.name} · {brand.year}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="display-xl mt-6 max-w-[14ch] text-ink"
        >
          We are redefining the way the world commutes in cities.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
        >
          {brand.note}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex items-center gap-3 text-sm text-ink"
        >
          <span className="dot" />
          <span className="font-display text-xs font-semibold uppercase tracking-[0.18em]">
            {brand.tagline}
          </span>
        </motion.div>
      </div>
    </section>
  );
}