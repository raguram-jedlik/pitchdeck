"use client";

import { motion } from "framer-motion";
import { productSpecs } from "@/data/jedlikData";
import RevealHeadline from "@/components/RevealHeadline";

/**
 * The tease + reveal — split into three clearly defined blocks.
 *
 *   Block A: Plain white tease section with the three lines. Standard
 *            scroll, not pinned.
 *
 *   Block B: A viewport-tall white stage with the E-POD cinematic loop
 *            running continuously. The file carries no audio stream and
 *            the element is muted, so playback is silent by construction.
 *            The stage fades + scales in once on first view.
 *
 *   Block C: The feature callouts as bullet points — sits BELOW the stage
 *            so it always appears after the reveal completes.
 */
export default function ProductReveal() {
  return (
    <>
      {/* Block A — Tease */}
      <section className="relative px-6 py-6 md:px-10 md:py-12">
        <div className="mx-auto max-w-deck text-left">
          <p className="eyebrow">Section 05 — The Unveil</p>
          <h2 className="display-lg mt-4 max-w-[16ch] text-ink">
            The dawn of a new class.
          </h2>
        </div>
        <div className="mx-auto max-w-deck mt-10 md:mt-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="display-md mx-auto max-w-3xl text-ink"
          >
            {productSpecs.tease.line1}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="display-md mx-auto mt-4 max-w-3xl text-ink"
          >
            <span className="text-red">{productSpecs.tease.line2}</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="display-md mx-auto mt-4 max-w-3xl text-ink"
          >
            {productSpecs.tease.line3}
          </motion.p>
        </div>
      </section>

      {/* Block B — Section title + reveal stage */}
      <section className="relative flex w-full flex-col items-center justify-center overflow-hidden px-6 py-4 md:py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mt-8 w-full max-w-[900px] md:mt-12"
        >
          <div className="relative overflow-hidden bg-paper-3">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={productSpecs.poster}
              aria-label="The Jedlik E-POD driving on a wet city road at sunset"
              className="block h-auto w-full select-none object-cover"
            >
              <source src={productSpecs.video} type="video/mp4" />
            </video>
            <RevealHeadline />
          </div>
        </motion.div>
      </section>

      {/* Block C — Feature callouts as bullet points, below the video */}
      <section className="relative px-6 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-deck">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow">Section 06 — What the E-POD Comes With</p>
            <ul className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2 md:mt-8">
              {productSpecs.features.map((f) => (
                <li key={f.label} className="flex gap-3">
                  <span className="dot mt-2 shrink-0" aria-hidden="true" />
                  <span>
                    <span className="block text-sm font-semibold uppercase tracking-tight text-ink md:text-base">
                      {f.label}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">
                      {f.note}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </>
  );
}
