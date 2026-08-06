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
 * Inline donut chart for the TAM/SAM/SOM funnel. Pure SVG — no chart lib.
 */
function FunnelDonut({
  value,
  max,
  label,
  size = 140,
}: {
  value: number;
  max: number;
  label: string;
  size?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [draw, setDraw] = useState(0);
  const radius = size / 2 - 12;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(1, value / max);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, pct, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDraw(v),
    });
    return () => controls.stop();
  }, [inView, pct]);

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="-rotate-90"
      aria-hidden="true"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#E5E5E5"
        strokeWidth="2"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#E5091E"
        strokeWidth="2"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - draw)}
        strokeLinecap="butt"
      />
      <text
        x={size / 2}
        y={size / 2 + 4}
        textAnchor="middle"
        fill="#000"
        fontSize="14"
        fontWeight="700"
        transform={`rotate(90 ${size / 2} ${size / 2})`}
        style={{ fontFamily: "var(--font-display), system-ui, sans-serif", textTransform: "uppercase", letterSpacing: "0.1em" }}
      >
        {label}
      </text>
    </svg>
  );
}

export default function MarketSize() {
  const maxGeo = Math.max(...geoExpansion.map((g) => g.value));

  return (
    <section className="relative bg-paper px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-deck">
        <p className="eyebrow">Section 07 — The Market</p>
        <h2 className="display-lg mt-4 max-w-[20ch] text-ink">
          Market potential.
        </h2>
        <p className="mt-4 max-w-xl text-sm text-muted md:text-base">
          India: $517M SAM · World: $1.6B SAM · 2030 forecast.
        </p>

        {/* Funnel — donut charts that size to TAM/SAM/SOM ratio */}
        <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-6">
          {marketMetrics.map((m, i) => {
            const maxForRatio = marketMetrics[0].numericValue;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col items-center text-center"
              >
                <FunnelDonut
                  value={m.numericValue}
                  max={maxForRatio}
                  label={m.label}
                  size={i === 0 ? 180 : i === 1 ? 140 : 100}
                />
                <p className="mt-5 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
                  <CountUpNumber
                    value={m.numericValue}
                    prefix={m.prefix ?? ""}
                    suffix={m.suffix}
                    decimals={m.numericValue % 1 !== 0 ? 1 : 0}
                  />
                </p>
                <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-muted">
                  {m.description}
                </p>
              </motion.div>
            );
          })}
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

        {/* World map — countries marked with red dots sized by $ */}
        <div className="mt-20">
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
            {/* Markers positioned by percentages of the 950x620 viewBox */}
            <div className="absolute inset-0">
              {geoExpansion.map((g, i) => {
                const size = 6 + (g.value / maxGeo) * 14; // 6–20px
                const showLabel = g.value >= 60; // only label big markets
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
                      className="rounded-full border-2 border-paper bg-red"
                      style={{ width: size, height: size }}
                    />
                    {showLabel && (
                      <span className="mt-1 whitespace-nowrap rounded bg-paper/90 px-1.5 py-0.5 font-display text-[0.55rem] font-bold text-ink shadow-sm md:text-[0.65rem]">
                        {g.region} · {g.display}
                      </span>
                    )}
                    {!showLabel && (
                      <span className="mt-1 whitespace-nowrap rounded bg-paper/90 px-1.5 py-0.5 font-display text-[0.55rem] font-bold text-ink shadow-sm md:text-[0.65rem]">
                        {g.display}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Region list under the map — keeps small markets legible */}
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