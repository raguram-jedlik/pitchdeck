"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import {
  marketMetrics,
  indiaStats,
  geoExpansion,
} from "@/data/jedlikData";

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

/**
 * Market icon — a small inline SVG that represents the funnel stage.
 * TAM = world globe, SAM = enclosure shield, SOM = upward arrow (capture).
 */
function MarketIcon({ kind }: { kind: string }) {
  if (kind === "TAM") {
    return (
      <svg viewBox="0 0 64 64" className="h-12 w-12 md:h-14 md:w-14" aria-hidden="true">
        <circle cx="32" cy="32" r="22" fill="none" stroke="#000000" strokeWidth="2" />
        <ellipse cx="32" cy="32" rx="10" ry="22" fill="none" stroke="#000000" strokeWidth="1.5" />
        <line x1="10" y1="32" x2="54" y2="32" stroke="#000000" strokeWidth="1.5" />
        <path d="M22 14 Q32 10 42 14" fill="none" stroke="#E5091E" strokeWidth="2" />
      </svg>
    );
  }
  if (kind === "SAM") {
    return (
      <svg viewBox="0 0 64 64" className="h-12 w-12 md:h-14 md:w-14" aria-hidden="true">
        <path
          d="M32 6 L52 14 V32 C52 44 42 54 32 58 C22 54 12 44 12 32 V14 Z"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M32 6 L52 14 V32 C52 44 42 54 32 58"
          fill="none"
          stroke="#E5091E"
          strokeWidth="2"
        />
      </svg>
    );
  }
  // SOM
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12 md:h-14 md:w-14" aria-hidden="true">
      <rect x="10" y="44" width="44" height="2" fill="#000000" />
      <polyline
        points="12,44 22,32 32,36 44,18 52,12"
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="44,12 52,12 52,20"
        fill="none"
        stroke="#E5091E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MarketSize() {
  const maxGeo = Math.max(...geoExpansion.map((g) => g.value));

  return (
    <section className="relative bg-paper px-6 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-deck">
        <p className="eyebrow">Section 07 — The Market</p>
        <h2 className="display-lg mt-4 max-w-[20ch] text-ink">
          Market potential.
        </h2>
        <p className="mt-4 max-w-xl text-sm text-muted md:text-base">
          India: $517M SAM · World: $1.6B SAM · 2030 forecast.
        </p>

        {/* Funnel — icon + count + description, no donuts */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
          {marketMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center border border-rule bg-paper p-5 text-center md:p-6"
            >
              <MarketIcon kind={m.label} />
              <p className="eyebrow mt-3">{m.label}</p>
              <p className="mt-3 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                <CountUpNumber
                  value={m.numericValue}
                  prefix={m.prefix ?? ""}
                  suffix={m.suffix}
                  decimals={m.numericValue % 1 !== 0 ? 1 : 0}
                />
              </p>
              <p className="mt-2 max-w-[28ch] text-xs leading-relaxed text-muted md:text-sm">
                {m.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* India stats — iconified per stat */}
        <div className="mt-16">
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            India
          </h3>
          <div className="mt-6 grid grid-cols-2 gap-px bg-rule lg:grid-cols-4">
            {indiaStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-paper p-4 md:p-6"
              >
                <p className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                  {s.value}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted md:text-sm">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* World map */}
        <div className="mt-16">
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Where we go next
          </h3>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="relative mt-6 overflow-hidden border border-rule"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/world-map.svg"
              alt="World map"
              className="block h-auto w-full"
            />
            <div className="absolute inset-0">
              {geoExpansion.map((g, i) => {
                // sqrt-scaled radius: 6–16px so India dominates but small
                // markets stay legible without crowding neighbours.
                const size = 6 + Math.sqrt(g.value / maxGeo) * 10;
                return (
                  <motion.div
                    key={g.region}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.4,
                      delay: 0.2 + i * 0.08,
                      type: "spring",
                      stiffness: 240,
                    }}
                    className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                    style={{ left: `${g.mapX}%`, top: `${g.mapY}%` }}
                  >
                    <span
                      className="rounded-full border-2 border-paper bg-red shadow-sm"
                      style={{ width: size, height: size }}
                    />
                    <span className="mt-1 whitespace-nowrap rounded bg-paper/95 px-1.5 py-0.5 font-display text-[0.55rem] font-bold leading-tight text-ink shadow-sm md:text-[0.65rem]">
                      {g.display}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-5">
            {geoExpansion.map((g) => (
              <li
                key={g.region}
                className="flex items-baseline justify-between border-b border-rule py-1.5"
              >
                <span className="font-display text-xs font-semibold text-ink">
                  {g.region}
                </span>
                <span className="font-display text-xs text-red">{g.display}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}