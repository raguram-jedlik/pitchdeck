"use client";

import { motion } from "framer-motion";
import { quadrantPoints } from "@/data/jedlikData";

export default function QuadrantChart() {
  return (
    <section className="relative bg-slate-950 px-6 py-28 md:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center font-display text-3xl font-bold sm:text-4xl md:text-5xl"
        >
          What&apos;s on the{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Road Today?
          </span>
        </motion.h2>

        <div className="glass relative mx-auto mt-16 aspect-square w-full max-w-3xl overflow-visible rounded-2xl p-6 sm:p-10">
          {/* axis labels */}
          <span className="absolute left-1/2 top-2 -translate-x-1/2 text-xs uppercase tracking-widest text-slate-400">
            High Maneuverability
          </span>
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-slate-400">
            Low Maneuverability
          </span>
          <span
            className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs uppercase tracking-widest text-slate-400"
            style={{ transformOrigin: "left center" }}
          >
            Low Comfort
          </span>
          <span
            className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-xs uppercase tracking-widest text-slate-400"
            style={{ transformOrigin: "right center" }}
          >
            High Comfort
          </span>

          {/* gridlines */}
          <div className="absolute inset-6 border-l border-b border-slate-700 sm:inset-10" />
          <div className="absolute left-1/2 top-6 bottom-6 w-px bg-slate-800 sm:top-10 sm:bottom-10" />
          <div className="absolute top-1/2 left-6 right-6 h-px bg-slate-800 sm:left-10 sm:right-10" />

          {quadrantPoints.map((p, i) => {
            const left = `${6 + (p.comfort / 100) * 88}%`;
            const bottom = `${6 + (p.maneuverability / 100) * 88}%`;

            if (p.isJedlik) {
              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="absolute z-10 flex -translate-x-1/2 translate-y-1/2 flex-col items-center"
                  style={{ left, bottom }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.9, 1, 0.9] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 shadow-[0_0_40px_rgba(34,211,238,0.7)]"
                  >
                    <span className="font-display text-xl font-bold text-slate-950">?</span>
                  </motion.div>
                  <span className="mt-2 whitespace-nowrap font-display text-sm font-semibold text-glow-cyan text-cyan-300">
                    {p.name}
                  </span>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="absolute flex -translate-x-1/2 translate-y-1/2 flex-col items-center"
                style={{ left, bottom }}
              >
                <div className="h-3 w-3 rounded-full bg-slate-400" />
                <span className="mt-2 whitespace-nowrap text-[11px] text-slate-400 sm:text-xs">
                  {p.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
