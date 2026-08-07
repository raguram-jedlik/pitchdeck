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
      <header className="fixed top-0 left-0 right-0 z-40 flex items-start justify-between">
        <a href="#title" aria-label={`${brand.name} — home`} className="block pl-0 pt-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-cropped.png" alt={brand.name} className="h-14 w-auto md:h-20" />
        </a>
        <span className="mr-6 mt-3 font-display text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted md:mr-10 md:mt-4 md:text-xs">
          <span className="text-red">{brand.year}</span>
        </span>
      </header>
    </>
  );
}