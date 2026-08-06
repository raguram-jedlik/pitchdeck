"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { marketMetrics, indiaStats, geoExpansion } from "@/data/jedlikData";

function CountUpNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value]);

  const decimals = value % 1 !== 0 ? 1 : 0;

  return (
    <span ref={ref}>
      ${display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function GeoBar({ region, value, display, max, index }: { region: string; value: number; display: string; max: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="mb-5">
      <div className="mb-1.5 flex items-baseline justify-between text-sm">
        <span className="text-slate-300">{region}</span>
        <span className="font-display font-semibold text-cyan-300">{display}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800/70">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${(value / max) * 100}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
        />
      </div>
    </div>
  );
}

export default function MarketSize() {
  const maxGeo = Math.max(...geoExpansion.map((g) => g.value));

  return (
    <section className="relative bg-slate-950 px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center font-display text-3xl font-bold sm:text-4xl md:text-5xl"
        >
          Global Market{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Size &amp; Potential
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {marketMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-8 text-center"
            >
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-slate-500">{m.label}</p>
              <p className="font-display text-3xl font-bold text-glow-cyan text-cyan-300 sm:text-4xl">
                <CountUpNumber value={m.numericValue} suffix={m.suffix} />
              </p>
              <p className="mt-3 text-sm text-slate-400">{m.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 font-display text-xl font-semibold text-slate-200">
              India Opportunity Breakdown
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {indiaStats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="glass rounded-xl p-4"
                >
                  <p className="font-display text-xl font-bold text-emerald-300">{s.value}</p>
                  <p className="mt-1 text-xs text-slate-400">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 font-display text-xl font-semibold text-slate-200">
              Geographic Expansion Roadmap ($ Volume)
            </h3>
            <div className="glass rounded-2xl p-6">
              {geoExpansion.map((g, i) => (
                <GeoBar key={g.region} {...g} max={maxGeo} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
