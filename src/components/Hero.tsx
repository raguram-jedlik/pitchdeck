"use client";

import { motion } from "framer-motion";
import { brand } from "@/data/jedlikData";

/**
 * Hero — uploaded Jedlik logo, street-sketch background that fills the
 * section, big statement. The vehicle is still withheld; only the wordmark
 * appears later in the deck.
 */
export default function Hero() {
  return (
    <section
      id="title"
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-paper px-6 pb-12 pt-24 md:px-10 md:pb-16 md:pt-32"
    >
      {/* Background image — fills the section */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/street-sketch.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-paper/40 via-transparent to-paper" />

      <div className="relative mx-auto flex w-full max-w-deck flex-1 flex-col">
        {/* Uploaded logo, top of the section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brand.logo}
            alt={`${brand.name} logo`}
            className="h-14 w-auto md:h-20"
          />
        </motion.div>

        <div className="mt-auto pt-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="eyebrow"
          >
            {brand.name} · {brand.year}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="display-xl mt-4 max-w-[14ch] text-ink"
          >
            We are redefining the way the world commutes in cities.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 max-w-2xl text-sm leading-relaxed text-muted md:text-base"
          >
            {brand.note}
          </motion.p>
        </div>
      </div>
    </section>
  );
}