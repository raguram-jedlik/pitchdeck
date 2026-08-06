"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { marketMetrics, indiaStats, geoExpansion } from "@/data/jedlikData";

function CountUpNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
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

  return (
    <span ref={ref}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function MarketSize() {
  const maxGeo = Math.max(...geoExpansion.map((g) => g.value));

  return (
    <section className="relative bg-paper px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-deck">
        <p className="eyebrow">Section 07 — The Market</p>
        <h2 className="display-lg mt-4 max-w-[20ch] text-ink">
          Market potential.
        </h2>
        <p className="mt-4 max-w-xl text-sm text-muted md:text-base">
          India: $517M SAM · World: $1.6B SAM · 2030 forecast.
        </p>

        {/* Funnel */}
        <div className="mt-14 grid grid-cols-1 gap-px bg-rule sm:grid-cols-3">
          {marketMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-paper p-6 md:p-8"
            >
              <p className="eyebrow">{m.label}</p>
              <p className="mt-4 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
                <CountUpNumber
                  value={m.numericValue}
                  prefix={m.prefix ?? ""}
                  suffix={m.suffix}
                  decimals={m.numericValue % 1 !== 0 ? 1 : 0}
                />
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {m.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* India stats */}
        <div className="mt-20">
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            India
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {indiaStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-paper p-6"
              >
                <p className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Geo expansion */}
        <div className="mt-20">
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Where we go next
          </h3>
          <div className="mt-6 space-y-5">
            {geoExpansion.map((g, i) => (
              <GeoBar
                key={g.region}
                region={g.region}
                value={g.value}
                display={g.display}
                max={maxGeo}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GeoBar({
  region,
  value,
  display,
  max,
  index,
}: {
  region: string;
  value: number;
  display: string;
  max: number;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref}>
      <div className="mb-2 flex items-baseline justify-between text-sm md:text-base">
        <span className="font-display font-semibold text-ink">{region}</span>
        <span className="font-display font-semibold text-red">{display}</span>
      </div>
      <div className="h-[3px] w-full overflow-hidden bg-rule">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${(value / max) * 100}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.08, ease: "easeOut" }}
          className="h-full bg-ink"
        />
      </div>
    </div>
  );
}