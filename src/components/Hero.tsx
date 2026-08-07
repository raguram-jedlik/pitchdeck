"use client";

import { motion } from "framer-motion";
import { brand } from "@/data/jedlikData";

/**
 * Hero — uploaded Jedlik logo at the top (large on mobile and desktop),
 * an animated sketch video fills the section as the backdrop, big
 * statement. The vehicle is still withheld; only the wordmark appears
 * later in the deck.
 */
export default function Hero() {
  return (
    <section
      id="title"
      className="relative flex min-h-[92svh] w-full flex-col overflow-hidden bg-paper px-6 pb-10 pt-20 md:min-h-0 md:px-10 md:pb-14 md:pt-24"
    >
      {/* Background video — desktop (landscape) and mobile (portrait) cuts,
          swapped by breakpoint so only the relevant one downloads/plays. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden h-full w-full select-none object-cover opacity-30 md:block"
      >
        <source src="/assets/hero-bg-desktop.mp4" type="video/mp4" />
      </video>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 block h-full w-full select-none object-cover opacity-30 md:hidden"
      >
        <source src="/assets/hero-bg-mobile.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-paper/40 via-transparent to-paper" />

      <div className="relative mx-auto flex w-full max-w-deck flex-1 flex-col">
        {/* Big company name — the wordmark the user wants visible */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="display-xl text-red"
        >
          {brand.name}
        </motion.h1>

        <div className="mt-10 pt-2 md:mt-12 md:pt-0">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="eyebrow"
          >
            {brand.year}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="display-lg mt-4 max-w-[16ch] text-ink"
          >
            We are redefining the way the world commutes in cities.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 max-w-2xl text-sm leading-relaxed text-muted md:text-base"
          >
            {brand.note}
          </motion.p>
        </div>
      </div>
    </section>
  );
}