"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { productSpecs } from "@/data/jedlikData";

/**
 * The tease + reveal.
 *   0 → ~50% : tease overlay (3 lines) fades out as user scrolls past
 *   ~50% → ~85%: e-POD image lands centred, red E-POD wordmark stamps on top
 *   ~85% → end : callout list scrolls into view AFTER the image reveal
 */
export default function ProductReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const teaseOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const teaseY = useTransform(scrollYProgress, [0, 0.35], [0, -30]);

  const renderOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  const renderScale = useTransform(scrollYProgress, [0.35, 0.7], [0.95, 1]);

  const wordmarkY = useTransform(scrollYProgress, [0.55, 0.75], [40, 0]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);

  const calloutsOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);
  const calloutsY = useTransform(scrollYProgress, [0.75, 0.9], [30, 0]);

  return (
    <section ref={ref} className="relative h-[320svh] bg-paper">
      {/* Sticky stage — plain white */}
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden bg-paper">
        <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-paper">
          {/* Tease overlay — visible at the top of the section, fades out */}
          <motion.div
            style={{ opacity: teaseOpacity, y: teaseY }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="display-md max-w-3xl text-ink">
              {productSpecs.tease.line1}
            </p>
            <p className="display-md mt-3 max-w-3xl text-ink">
              <span className="text-red">{productSpecs.tease.line2}</span>
            </p>
            <p className="display-md mt-3 max-w-3xl text-ink">
              {productSpecs.tease.line3}
            </p>
          </motion.div>

          {/* e-POD image — dead-centre, sized to be fully visible on mobile */}
          <motion.img
            src={productSpecs.image}
            alt="The Jedlik E-POD — a fully enclosed, two-wheeled electric vehicle"
            style={{ opacity: renderOpacity, scale: renderScale }}
            className="relative z-10 h-auto w-[88%] max-w-[820px] object-contain md:w-[75%]"
          />

          {/* Wordmark — bottom-left, lands after the image */}
          <motion.div
            style={{ opacity: wordmarkOpacity, y: wordmarkY }}
            className="absolute bottom-8 left-6 z-30 md:bottom-12 md:left-10"
          >
            <p className="eyebrow text-muted">Introducing</p>
            <p
              className="mt-1 font-display font-extrabold uppercase italic text-red"
              style={{
                fontSize: "clamp(3rem, 10vw, 6.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 0.9,
              }}
            >
              {productSpecs.name}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Below the sticky — callouts appear AFTER the reveal completes */}
      <motion.div
        style={{ opacity: calloutsOpacity, y: calloutsY }}
        className="relative z-10 mx-auto max-w-deck bg-paper px-6 pb-20 pt-12 md:px-10 md:pb-24 md:pt-16"
      >
        <p className="eyebrow">Section 05 — The Unveil</p>
        <h2 className="display-lg mt-4 max-w-[18ch] text-ink">
          The {productSpecs.fullName}.
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-4 sm:grid-cols-2">
          {productSpecs.callouts.map((c, i) => (
            <div
              key={c}
              className="flex items-baseline gap-5 border-b border-rule py-4"
            >
              <span className="font-display text-xs font-semibold text-red">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-sm font-semibold uppercase tracking-tight text-ink md:text-base">
                {c}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}