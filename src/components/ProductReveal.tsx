"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { productSpecs } from "@/data/jedlikData";

/**
 * The tease + reveal. Plain white background (consistent with the rest of
 * the page). Scroll-progress driven:
 *   - tease lines fade out as you scroll past
 *   - the e-POD render scales up from a faint blur to full colour
 *   - the red E-POD wordmark lands on top
 *   - below the sticky stage: the callouts as a numbered list
 */
export default function ProductReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const blurAmount = useTransform(scrollYProgress, [0, 0.5], [20, 0]);
  const teaseOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const teaseY = useTransform(scrollYProgress, [0, 0.35], [0, -30]);
  const wordmarkY = useTransform(scrollYProgress, [0.5, 0.75], [40, 0]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const renderOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const renderScale = useTransform(scrollYProgress, [0.35, 0.7], [0.95, 1]);

  return (
    <section ref={ref} className="relative h-[260svh] bg-paper">
      {/* Sticky stage — plain white */}
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden bg-paper">
        <div className="relative flex-1 overflow-hidden bg-paper">
          {/* Tease overlay — fades out as user scrolls past */}
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

          {/* Image — small enough on mobile that the whole thing is visible */}
          <motion.img
            src={productSpecs.image}
            alt="The Jedlik E-POD — a fully enclosed, two-wheeled electric vehicle"
            style={{
              opacity: renderOpacity,
              scale: renderScale,
              filter: useTransform(blurAmount, (v) => `blur(${v}px)`),
            }}
            className="absolute left-1/2 top-1/2 z-10 h-auto w-[78%] max-w-[680px] -translate-x-1/2 -translate-y-1/2 object-contain md:w-[70%]"
          />

          {/* Wordmark overlay — lands last, in red */}
          <motion.div
            style={{ opacity: wordmarkOpacity, y: wordmarkY }}
            className="absolute inset-x-0 bottom-12 z-30 px-6 text-center md:bottom-16"
          >
            <p className="eyebrow text-muted">Introducing</p>
            <p
              className="mt-2 font-display font-extrabold uppercase italic text-red"
              style={{
                fontSize: "clamp(3.5rem, 12vw, 8rem)",
                letterSpacing: "-0.03em",
                lineHeight: 0.9,
              }}
            >
              {productSpecs.name}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Below the sticky: spec list — features live alongside the reveal */}
      <div className="relative z-10 mx-auto -mt-12 max-w-deck bg-paper px-6 pb-20 pt-10 md:px-10 md:pb-24 md:pt-12">
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