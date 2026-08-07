"use client";

import { useRef, useState } from "react";
import { motion, animate } from "framer-motion";
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
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  return (
    <motion.span
      viewport={{ once: true, margin: "-60px" }}
      onViewportEnter={() => {
        if (started.current) return;
        started.current = true;
        animate(0, value, {
          duration: 1.4,
          ease: "easeOut",
          onUpdate: (v) => setDisplay(v),
        });
      }}
    >
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </motion.span>
  );
}

/**
 * Market icon — a small inline SVG that represents the funnel stage.
 * TAM = world globe (every 2-wheeler sold), SAM = a 2-wheeler silhouette
 * inside a target ring (the enclosed slice), SOM = a flag on a rising
 * bar (the capturable target).
 */
function MarketIcon({ kind }: { kind: string }) {
  if (kind === "TAM") {
    return (
      <svg viewBox="0 0 64 64" className="h-12 w-12 md:h-14 md:w-14" aria-hidden="true">
        <circle cx="32" cy="32" r="22" fill="none" stroke="#000000" strokeWidth="2" />
        <ellipse cx="32" cy="32" rx="9" ry="22" fill="none" stroke="#000000" strokeWidth="1.5" />
        <path d="M10 32 H54 M13 20 H51 M13 44 H51" stroke="#000000" strokeWidth="1.5" />
        <path d="M22 12 Q32 8 42 12" fill="none" stroke="#E5091E" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "SAM") {
    return (
      <svg viewBox="0 0 64 64" className="h-12 w-12 md:h-14 md:w-14" aria-hidden="true">
        {/* Scooter silhouette, ringed to signal "the segment within the whole" */}
        <circle cx="32" cy="32" r="24" fill="none" stroke="#000000" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="20" cy="42" r="6" fill="none" stroke="#000000" strokeWidth="2" />
        <circle cx="42" cy="42" r="6" fill="none" stroke="#000000" strokeWidth="2" />
        <path
          d="M20 42 H30 L34 26 H42 M30 42 L34 30"
          fill="none"
          stroke="#E5091E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  // SOM — flag planted on a rising bar (the target we're going after)
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12 md:h-14 md:w-14" aria-hidden="true">
      <rect x="10" y="44" width="44" height="2" fill="#000000" />
      <rect x="14" y="34" width="8" height="10" fill="none" stroke="#000000" strokeWidth="2" />
      <rect x="28" y="24" width="8" height="20" fill="none" stroke="#000000" strokeWidth="2" />
      <rect x="42" y="14" width="8" height="30" fill="none" stroke="#000000" strokeWidth="2" />
      <path d="M46 14 V6 M46 6 L54 9 L46 12 Z" fill="#E5091E" stroke="#E5091E" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * India stat icon — keyed off the stat label. Small inline SVG, same
 * black-stroke/red-accent language as MarketIcon.
 */
function IndiaStatIcon({ label }: { label: string }) {
  const common = { viewBox: "0 0 64 64", className: "h-8 w-8 md:h-9 md:w-9", "aria-hidden": true } as const;
  if (/2-wheelers on/i.test(label)) {
    // Fleet — a scooter side-profile, unambiguous "two-wheeler" read
    return (
      <svg {...common}>
        <circle cx="16" cy="46" r="8" fill="none" stroke="#000" strokeWidth="2" />
        <circle cx="46" cy="46" r="8" fill="none" stroke="#000" strokeWidth="2" />
        <path
          d="M16 46 H32 L38 26 H48 M32 46 L38 32 M22 26 H34"
          fill="none"
          stroke="#E5091E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (/sold annually/i.test(label)) {
    // Sales — upward bar trend
    return (
      <svg {...common}>
        <rect x="10" y="38" width="8" height="16" fill="none" stroke="#000" strokeWidth="2" />
        <rect x="24" y="28" width="8" height="26" fill="none" stroke="#000" strokeWidth="2" />
        <rect x="38" y="14" width="8" height="40" fill="none" stroke="#E5091E" strokeWidth="2" />
      </svg>
    );
  }
  if (/electric 2-wheelers/i.test(label)) {
    // EV share — bolt
    return (
      <svg {...common}>
        <path d="M34 8 L16 36 H28 L22 56 L48 26 H34 Z" fill="none" stroke="#E5091E" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  }
  // Opportunity — target
  return (
    <svg {...common}>
      <circle cx="32" cy="32" r="20" fill="none" stroke="#000" strokeWidth="2" />
      <circle cx="32" cy="32" r="12" fill="none" stroke="#000" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="4" fill="#E5091E" />
    </svg>
  );
}

function MetricCard({
  m,
  i,
}: {
  m: (typeof marketMetrics)[number];
  i: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="bg-paper p-4 md:p-6"
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

        {/* Funnel — icon + count + description, aligned like the India stats below.
            Mobile: 2 cards in a row, the 3rd centered below at the same
            card width. Desktop: all 3 in a row. */}
        <div className="mt-10">
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Global
          </h3>

          {/* Mobile layout */}
          <div className="mt-6 sm:hidden">
            <div className="grid grid-cols-2 gap-px bg-rule">
              {marketMetrics.slice(0, 2).map((m, i) => (
                <MetricCard key={m.label} m={m} i={i} />
              ))}
            </div>
            <div className="mt-px flex justify-center">
              <div className="w-1/2 bg-paper">
                <MetricCard m={marketMetrics[2]} i={2} />
              </div>
            </div>
          </div>

          {/* Desktop layout */}
          <div className="mt-6 hidden grid-cols-3 gap-px bg-rule sm:grid">
            {marketMetrics.map((m, i) => (
              <MetricCard key={m.label} m={m} i={i} />
            ))}
          </div>
        </div>

        {/* India stats — iconified per stat */}
        <div className="mt-10">
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
                <IndiaStatIcon label={s.label} />
                <p className="mt-3 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
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
        <div className="mt-10">
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Where we go next
          </h3>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="relative mt-6 border border-rule"
          >
            {/* Image clipped to its own layer so pin labels that spill past
                the edges on narrow screens aren't cut off by overflow-hidden. */}
            <div className="overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/world-map.svg"
                alt="World map"
                className="block h-auto w-full"
              />
            </div>
            <div className="absolute inset-0">
              {geoExpansion.map((g, i) => {
                // sqrt-scaled radius: 6–16px so India dominates but small
                // markets stay legible without crowding neighbours.
                const size = 6 + Math.sqrt(g.value / maxGeo) * 10;
                // The dot itself is the true data marker and is anchored
                // exactly at {mapX, mapY}; the label is positioned
                // relative to the dot (not the reverse), otherwise
                // centering the dot+label stack as one unit shifts the
                // visible dot away from its real coordinate.
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
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${g.mapX}%`, top: `${g.mapY}%`, width: size, height: size }}
                  >
                    <span
                      className="block h-full w-full rounded-full border-2 border-paper bg-red shadow-sm"
                    />
                    <span className="absolute top-full left-1/2 mt-1 max-w-[18vw] -translate-x-1/2 whitespace-normal text-center rounded bg-paper/95 px-1.5 py-0.5 font-display text-[0.5rem] font-bold leading-tight text-ink shadow-sm sm:max-w-none sm:whitespace-nowrap md:text-[0.65rem]">
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