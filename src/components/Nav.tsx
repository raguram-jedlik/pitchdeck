"use client";

import { motion, useScroll } from "framer-motion";
import { brand } from "@/data/jedlikData";

/**
 * Nav — the year mark only. The hero carries the full logo so the brand
 * mark isn't duplicated. A 2px red progress bar sits above.
 */
export default function Nav() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-red"
        style={{ scaleX: scrollYProgress }}
      />
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-2 mix-blend-difference md:px-10 md:py-3">
        <a href="#title" aria-label={`${brand.name} — home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={brand.logo} alt={brand.name} className="h-12 w-auto md:h-16" />
        </a>
        <span className="font-display text-[0.65rem] font-medium uppercase tracking-[0.18em] text-paper/80 md:text-xs">
          <span className="text-red">{brand.year}</span>
        </span>
      </header>
    </>
  );
}