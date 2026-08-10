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
      <section className="relative bg-paper px-6 py-6 md:px-10 md:py-12">
        <div className="mx-auto max-w-deck text-left">
          <p className="eyebrow">Section 05 — The Dawn of a New Class</p>
        </div>
        <div className="mx-auto max-w-deck text-center">
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
      <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-paper px-6 py-4 md:py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mt-8 md:mt-12"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <picture>
            <source media="(max-width: 767px)" srcSet="/assets/epod-reveal-mobile.jpg" />
            <img
              src={productSpecs.image}
              alt="The Jedlik E-POD — a fully enclosed, two-wheeled electric vehicle"
              className="block h-auto w-[88vw] max-w-[820px] object-contain md:w-[70vw]"
            />
          </picture>
        </motion.div>
      </section>
    </>
  );
}