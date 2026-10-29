"use client";

import { motion } from "framer-motion";

/**
 * The "INTRODUCING / E-POD" lockup, overlaid on the reveal video.
 *
 * Letterforms are matched to the E-POD marketing artwork:
 *   - E-POD        Antonio 700, slanted ~12.6 deg, red #C8023B
 *   - INTRODUCING  Roboto Mono 500, tracked wide, near-black
 *
 * Both sit in the upper-left of the frame, over the open sky, so the
 * sunset gradient behind them stays clean and the vehicle on the bridge
 * remains unobstructed.
 */
export default function RevealHeadline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
      className="pointer-events-none absolute left-0 top-0 z-10 w-full select-none"
    >
      {/* Scrim: keeps the type readable over the bright sunset sky
          without flattening the scene. Fades out toward the middle. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 18% 26%, rgba(12,10,14,0.52) 0%, rgba(12,10,14,0.28) 34%, rgba(12,10,14,0) 62%)",
        }}
      />

      <div className="relative px-[4.5%] pt-[4%]">
        {/* INTRODUCING */}
        <p
          className="font-label text-ink/90"
          style={{
            fontSize: "clamp(12px, 1.55vw, 22px)",
            letterSpacing: "0.62em",
            fontWeight: 500,
            lineHeight: 1,
          }}
        >
          INTRODUCING
        </p>

        {/* E-POD */}
        <p
          className="font-headline text-red"
          style={{
            marginTop: "clamp(6px, 1.1vw, 16px)",
            fontSize: "clamp(44px, 8.6vw, 128px)",
            fontWeight: 700,
            lineHeight: 0.86,
            letterSpacing: "-0.015em",
            transform: "skewX(-12.6deg)",
            transformOrigin: "left bottom",
          }}
        >
          E-POD
        </p>
      </div>
    </motion.div>
  );
}
