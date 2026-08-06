"use client";

import { motion, useScroll } from "framer-motion";

export default function Nav() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-red"
        style={{ scaleX: scrollYProgress }}
      />
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 mix-blend-difference md:px-10 md:py-6">
        <a href="#title" aria-label="Jedlik Motors — home" className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-mark-dark.svg"
            alt="Jedlik"
            className="h-6 w-auto md:h-7"
          />
        </a>
        <span className="font-display text-[0.65rem] font-medium uppercase tracking-[0.18em] text-paper/80 md:text-xs">
          <span className="text-red">2026</span> · Redefine the Class
        </span>
      </header>
    </>
  );
}