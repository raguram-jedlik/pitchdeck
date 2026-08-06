"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { roadmap } from "@/data/jedlikData";

export default function RoadmapScrolly() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative bg-slate-950 px-6 py-28 md:px-10">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center font-display text-3xl font-bold sm:text-4xl md:text-5xl"
        >
          The Fuel Needed to{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Bring Jedlik Alive
          </span>
        </motion.h2>

        <div className="relative mt-20 pl-10 sm:pl-16">
          {/* connecting line */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-slate-800 sm:left-6" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-3 top-0 w-px bg-gradient-to-b from-cyan-400 to-emerald-400 sm:left-6"
          />

          <div className="flex flex-col gap-16">
            {roadmap.map((m, i) => (
              <motion.div
                key={`${m.year}-${m.label}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <span
                  className={`absolute -left-10 top-1 h-4 w-4 rounded-full border-2 sm:-left-16 ${
                    m.isNow
                      ? "border-emerald-400 bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.8)]"
                      : "border-cyan-400 bg-slate-950"
                  }`}
                />
                <div className="glass sticky top-24 rounded-2xl p-6">
                  <div className="mb-2 flex flex-wrap items-baseline gap-3">
                    <span className="font-display text-2xl font-bold text-glow-cyan text-cyan-300">
                      {m.year}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide ${
                        m.isNow
                          ? "bg-emerald-400/20 text-emerald-300"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {m.isNow ? "NOW · " : ""}
                      {m.label}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {m.points.map((pt) => (
                      <li key={pt} className="text-sm text-slate-300 sm:text-base">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
