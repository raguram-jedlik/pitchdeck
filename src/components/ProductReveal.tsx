"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { productSpecs } from "@/data/jedlikData";

/**
 * The tease + reveal. The blur of the e-POD pulls to zero on scroll, then
 * the full-bleed render lands with the red E-POD wordmark and a numbered
 * list of specifications.
 */
export default function ProductReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const blurAmount = useTransform(scrollYProgress, [0, 0.5], [26, 0]);
  const teaseOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const wordmarkY = useTransform(scrollYProgress, [0.5, 0.75], [40, 0]);
  const wordmarkOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.7],
    [0, 1]
  );

  return (
    <section ref={ref} className="relative h-[260vh] bg-paper">
      {/* Sticky stage */}
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Image */}
        <div className="relative flex-1 overflow-hidden">
          <motion.img
            src={productSpecs.blurImage}
            alt=""
            aria-hidden="true"
            style={{ filter: useTransform(blurAmount, (v) => `blur(${v}px)`) }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <motion.img
            src={productSpecs.image}
            alt="The Jedlik E-POD — a fully enclosed, two-wheeled electric vehicle"
            style={{ opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]) }}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Tease overlay */}
          <motion.div
            style={{ opacity: teaseOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="display-md max-w-3xl text-paper">
              {productSpecs.tease.line1}
            </p>
            <p className="display-md mt-3 max-w-3xl text-paper">
              <span className="text-red">{productSpecs.tease.line2}</span>
            </p>
            <p className="display-md mt-3 max-w-3xl text-paper">
              {productSpecs.tease.line3}
            </p>
          </motion.div>

          {/* Wordmark overlay */}
          <motion.div
            style={{ opacity: wordmarkOpacity, y: wordmarkY }}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 text-center md:top-12 md:translate-y-0"
          >
            <p className="eyebrow text-paper/90">Introducing</p>
            <p
              className="mt-2 font-display font-extrabold uppercase italic text-red"
              style={{
                fontSize: "clamp(4rem, 14vw, 10rem)",
                letterSpacing: "-0.03em",
                lineHeight: 0.9,
              }}
            >
              {productSpecs.name}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Below the sticky: spec list */}
      <div className="relative z-10 mx-auto -mt-24 max-w-deck bg-paper px-6 pb-24 pt-12 md:px-10">
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
  );
}