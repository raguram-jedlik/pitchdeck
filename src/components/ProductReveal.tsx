"use client";

import { motion } from "framer-motion";
import { productSpecs } from "@/data/jedlikData";

/**
 * Callout icon — small inline SVG keyed off the callout copy so the list
 * doesn't depend on external icon files.
 */
function CalloutIcon({ label }: { label: string }) {
  const common = { viewBox: "0 0 64 64", className: "h-6 w-6 shrink-0 md:h-7 md:w-7", "aria-hidden": true } as const;
  if (/enclosed/i.test(label)) {
    return (
      <svg {...common}>
        <path d="M8 40 Q8 24 24 22 L40 22 Q56 24 56 40 L56 46 H8 Z" fill="none" stroke="#000" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="20" cy="48" r="5" fill="none" stroke="#E5091E" strokeWidth="2" />
        <circle cx="44" cy="48" r="5" fill="none" stroke="#000" strokeWidth="2" />
      </svg>
    );
  }
  if (/airbag/i.test(label)) {
    return (
      <svg {...common}>
        <circle cx="32" cy="32" r="20" fill="none" stroke="#000" strokeWidth="2" />
        <path d="M32 12 L32 52 M12 32 L52 32 M18 18 L46 46 M46 18 L18 46" stroke="#E5091E" strokeWidth="1.5" />
      </svg>
    );
  }
  if (/air condition/i.test(label)) {
    return (
      <svg {...common}>
        <path d="M32 6 V58 M12 15 L52 49 M52 15 L12 49" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <path d="M32 6 L26 14 M32 6 L38 14 M32 58 L26 50 M32 58 L38 50" stroke="#E5091E" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (/top speed/i.test(label)) {
    return (
      <svg {...common}>
        <path d="M10 40 A22 22 0 0 1 54 40" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <line x1="32" y1="40" x2="44" y2="26" stroke="#E5091E" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="40" r="3" fill="#000" />
      </svg>
    );
  }
  if (/range/i.test(label)) {
    return (
      <svg {...common}>
        <path d="M8 46 Q22 46 26 34 Q30 22 44 22 Q54 22 56 12" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
        <circle cx="8" cy="46" r="3" fill="#000" />
        <circle cx="56" cy="12" r="3" fill="#E5091E" />
      </svg>
    );
  }
  // Pushback seats
  return (
    <svg {...common}>
      <path d="M18 50 V26 Q18 20 26 20 H34 Q42 20 42 28 V32" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 50 H42 M18 38 H36" stroke="#000" strokeWidth="2" strokeLinecap="round" />
      <path d="M42 28 L50 22" stroke="#E5091E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

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
        <div className="mx-auto w-full max-w-deck text-left">
          <p className="eyebrow">Section 05 — The Unveil</p>
          <h2 className="display-lg mt-4 max-w-[18ch] text-ink">
            The {productSpecs.fullName}.
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mt-8 md:mt-12"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <picture>
            <source media="(max-width: 767px)" srcSet="/assets/epod-reveal-mobile.png" />
            <img
              src={productSpecs.image}
              alt="The Jedlik E-POD — a fully enclosed, two-wheeled electric vehicle"
              className="block h-auto w-[88vw] max-w-[820px] object-contain md:w-[70vw]"
            />
          </picture>

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
      <section className="relative bg-paper px-6 pb-10 pt-4 md:px-10 md:pb-12 md:pt-6">
        <div className="mx-auto max-w-deck">
          <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-4 sm:grid-cols-2">
            {productSpecs.callouts.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-center gap-4 border-b border-rule py-4"
              >
                <span className="font-display text-xs font-semibold text-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <CalloutIcon label={c} />
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