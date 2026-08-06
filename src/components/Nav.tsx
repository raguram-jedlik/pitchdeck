"use client";

import { motion, useScroll } from "framer-motion";
import { brand } from "@/data/jedlikData";

export default function Nav() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-red"
        style={{ scaleX: scrollYProgress }}
      />
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5 mix-blend-difference md:px-10 md:py-7">
        <a
          href="#title"
          className="font-display text-xs font-bold uppercase tracking-[0.18em] text-paper"
        >
          {brand.name}
        </a>
        <span className="font-display text-xs font-medium uppercase tracking-[0.18em] text-paper/80">
          {brand.year} · {brand.tagline}
        </span>
      </header>
    </>
  );
}