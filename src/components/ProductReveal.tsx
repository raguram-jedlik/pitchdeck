"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { productSpecs } from "@/data/jedlikData";
import { Gauge, MapPinned, ShieldCheck } from "lucide-react";

export default function ProductReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.15]);
  const speedOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.55], [0, 1, 1]);
  const speedY = useTransform(scrollYProgress, [0.15, 0.35], [30, 0]);
  const rangeOpacity = useTransform(scrollYProgress, [0.35, 0.55, 0.75], [0, 1, 1]);
  const rangeY = useTransform(scrollYProgress, [0.35, 0.55], [30, 0]);
  const safetyOpacity = useTransform(scrollYProgress, [0.55, 0.75, 0.95], [0, 1, 1]);
  const safetyY = useTransform(scrollYProgress, [0.55, 0.75], [30, 0]);

  return (
    <section ref={ref} className="relative h-[320vh] bg-slate-950">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6 md:px-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

        <motion.div style={{ opacity: headerOpacity }} className="relative z-10 mb-10 max-w-3xl text-center">
          <p className="mb-3 font-display text-xs uppercase tracking-[0.4em] text-slate-500">
            Once in every generation, a new class of vehicle is born.
            <br />
            Now, we unveil ours&hellip;
          </p>
          <h2 className="font-display text-4xl font-bold text-glow-cyan sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              {productSpecs.name}
            </span>
          </h2>
        </motion.div>

        <div className="glass relative z-10 mb-10 flex h-40 w-full max-w-2xl items-center justify-center overflow-hidden rounded-2xl transition duration-500 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/10" />
          <svg width="240" height="90" viewBox="0 0 240 90" fill="none">
            <path
              d="M20 70 C20 40 60 20 120 20 C180 20 220 40 220 70Z"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="1.5"
              opacity="0.7"
            />
            <circle cx="70" cy="70" r="14" stroke="#34d399" strokeWidth="2" fill="none" />
            <circle cx="170" cy="70" r="14" stroke="#34d399" strokeWidth="2" fill="none" />
          </svg>
        </div>

        <div className="relative z-10 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          <motion.div
            style={{ opacity: speedOpacity, y: speedY }}
            className="glass rounded-xl p-5 text-center"
          >
            <Gauge className="mx-auto mb-2 h-6 w-6 text-cyan-400" />
            <p className="font-display text-2xl font-bold text-glow-cyan text-cyan-300">
              {productSpecs.topSpeed}
            </p>
            <p className="mt-1 text-xs uppercase tracking-widest text-slate-400">Top Speed</p>
          </motion.div>

          <motion.div
            style={{ opacity: rangeOpacity, y: rangeY }}
            className="glass rounded-xl p-5 text-center"
          >
            <MapPinned className="mx-auto mb-2 h-6 w-6 text-emerald-400" />
            <p className="font-display text-2xl font-bold text-glow-emerald text-emerald-300">
              {productSpecs.range}
            </p>
            <p className="mt-1 text-xs uppercase tracking-widest text-slate-400">Range</p>
          </motion.div>

          <motion.div
            style={{ opacity: safetyOpacity, y: safetyY }}
            className="glass rounded-xl p-5"
          >
            <ShieldCheck className="mx-auto mb-2 h-6 w-6 text-cyan-400" />
            <p className="mb-1 text-center text-xs uppercase tracking-widest text-slate-400">
              Safety &amp; Comfort
            </p>
            <ul className="mt-2 space-y-1 text-center text-xs text-slate-300">
              {productSpecs.safetyComfort.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
