"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10">
        <span className="font-display text-lg font-semibold tracking-widest text-slate-50">
          JEDLIK<span className="text-cyan-400">.</span>
        </span>
        <span className="hidden text-xs uppercase tracking-[0.3em] text-slate-400 md:block">
          Redefine the Class
        </span>
      </div>
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-gradient-to-r from-cyan-400 to-emerald-400"
        style={{ scaleX }}
      />
    </>
  );
}
