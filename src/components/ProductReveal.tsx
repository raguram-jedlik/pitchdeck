"use client";

import { motion } from "framer-motion";
import { productSpecs } from "@/data/jedlikData";

/**
 * The tease + reveal — split into two clearly defined blocks.
 *
 *   Block A: Plain white tease section with the three lines. Standard
 *            scroll, not pinned.
 *
 *   Block B: A viewport-tall white stage with the uploaded e-POD PNG
 *            centred and the red E-POD wordmark stamped on top. The
 *            image and wordmark fade + scale in once on first view.
 *
 *   Block C: Callouts as a numbered list — sits BELOW the stage so it
 *            always appears after the reveal completes.
 */
export default function ProductReveal() {
  return (
    <>
      {/* Block A — Tease */}
      <section className="relative bg-paper px-6 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-deck text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="display-md max-w-3xl text-ink"
          >
            {productSpecs.tease.line1}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="display-md mt-4 max-w-3xl text-ink"
          >
            <span className="text-red">{productSpecs.tease.line2}</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="display-md mt-4 max-w-3xl text-ink"
          >
            {productSpecs.tease.line3}
          </motion.p>
        </div>
      </section>

      {/* Block B — Reveal stage */}
      <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-paper px-6 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={productSpecs.image}
            alt="The Jedlik E-POD — a fully enclosed, two-wheeled electric vehicle"
            className="block h-auto w-[88vw] max-w-[820px] object-contain md:w-[70vw]"
          />

          {/* Wordmark — overlaid on top of the image, top-right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="pointer-events-none absolute inset-x-0 top-4 text-center md:top-8"
          >
            <p className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-ink md:text-[0.7rem]">
              Introducing
            </p>
            <p
              className="mt-1 font-display font-extrabold uppercase italic text-red"
              style={{
                fontSize: "clamp(3rem, 12vw, 8rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.85,
                textShadow: "0 0 24px rgba(255,255,255,0.6)",
              }}
            >
              {productSpecs.name}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Block C — Callouts (strictly AFTER the reveal) */}
      <section className="relative bg-paper px-6 pb-20 pt-8 md:px-10 md:pb-24 md:pt-12">
        <div className="mx-auto max-w-deck">
          <p className="eyebrow">Section 05 — The Unveil</p>
          <h2 className="display-lg mt-4 max-w-[18ch] text-ink">
            The {productSpecs.fullName}.
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-4 sm:grid-cols-2">
            {productSpecs.callouts.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-baseline gap-5 border-b border-rule py-4"
              >
                <span className="font-display text-xs font-semibold text-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-sm font-semibold uppercase tracking-tight text-ink md:text-base">
                  {c}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}