"use client";

import { motion } from "framer-motion";
import { quadrantPoints, brand } from "@/data/jedlikData";

/**
 * Positioning map — true 4-quadrant scatter graph with vehicle images for
 * rivals and a question-mark silhouette for Jedlik. Optimised for mobile:
 * the chart scales down cleanly and Jedlik's silhouette is positioned in
 * the only empty quadrant (top-right, the highest comfort / lowest
 * maneuverability quadrant).
 *
 * Quadrant labels (screen reading order: TL, TR, BL, BR):
 *   Q1 TL — High Maneuver, Low Comfort
 *   Q2 TR — High Comfort, Low Maneuver   ← Jedlik
 *   Q3 BR — Low Maneuver, High Comfort
 *   Q4 BL — Low Maneuver, Low Comfort
 */
export default function QuadrantChart() {
  const rivals = quadrantPoints.filter((p) => !p.isJedlik);
  const jedlik = quadrantPoints.find((p) => p.isJedlik)!;

  return (
    <section className="relative bg-paper px-4 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-deck">
        <p className="eyebrow">Section 02 — The Map</p>
        <h2 className="display-lg mt-4 max-w-[18ch] text-ink">
          What&apos;s on the road today?
        </h2>

        {/* Chart container — square aspect keeps the scatter readable on mobile.
            Percent-based left/top on plotted points below are relative to
            this box's own edges, so it stays padding-free; label breathing
            room comes from the outer wrapper's margin instead. */}
        <div className="relative mx-auto mt-12 mb-10 aspect-square w-full max-w-[640px] sm:mt-14 sm:mb-12">
          {/* axes — double-headed arrows, black */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2">
            <svg className="absolute -top-2 left-1/2 -translate-x-1/2" width="12" height="8" viewBox="0 0 12 8">
              <path d="M6 0 L12 8 H0 Z" fill="#111111" />
            </svg>
            <div className="h-full w-px bg-ink" />
            <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2" width="12" height="8" viewBox="0 0 12 8">
              <path d="M6 8 L12 0 H0 Z" fill="#111111" />
            </svg>
          </div>
          <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2">
            <svg className="absolute -left-2 top-1/2 -translate-y-1/2" width="8" height="12" viewBox="0 0 8 12">
              <path d="M0 6 L8 12 V0 Z" fill="#111111" />
            </svg>
            <div className="h-px w-full bg-ink" />
            <svg className="absolute -right-2 top-1/2 -translate-y-1/2" width="8" height="12" viewBox="0 0 8 12">
              <path d="M8 6 L0 12 V0 Z" fill="#111111" />
            </svg>
          </div>

          {/* axis titles — small paper backing keeps the axis line from
              visually striking through the text */}
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-paper px-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.1em] text-red md:-top-8 md:text-sm">
            Maneuverability
          </span>
          <span className="absolute top-1/2 right-0 -translate-y-1/2 whitespace-nowrap bg-paper px-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.1em] text-red md:right-0 md:text-sm">
            Comfort
          </span>

          {/* Quadrant corner labels (screen reading order: TL, TR, BL, BR) */}
          <span className="absolute left-2 top-2 whitespace-nowrap font-display text-[0.55rem] font-bold uppercase tracking-[0.06em] text-[#C2660C] md:left-3 md:top-3 md:text-xs">
            Lower Comfort
          </span>
          <span className="absolute right-2 top-[34%] whitespace-nowrap text-right font-display text-[0.55rem] font-bold uppercase tracking-[0.06em] text-[#C2660C] md:right-3 md:text-xs">
            Higher Comfort
          </span>
          <span className="absolute bottom-2 left-2 whitespace-nowrap font-display text-[0.55rem] font-bold uppercase tracking-[0.06em] text-[#C2660C] md:bottom-3 md:left-3 md:text-xs">
            Lower Maneuverability
          </span>
          <span className="absolute bottom-2 right-2 whitespace-nowrap text-right font-display text-[0.55rem] font-bold uppercase tracking-[0.06em] text-[#C2660C] md:bottom-3 md:right-3 md:text-xs">
            Higher Maneuverability
          </span>

          {/* rivals — the colored dot is the actual data marker and sits
              exactly on {left, top}; the vehicle image and name are
              positioned relative to the dot (not the reverse), so adding
              an image never shifts where the point actually plots. */}
          {rivals.map((p, i) => {
            const left = `${(p.comfort / 100) * 100}%`;
            const top = `${100 - p.maneuverability}%`;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 md:h-4 md:w-4"
                style={{ left, top }}
              >
                <span
                  className="block h-full w-full rounded-full border border-paper shadow-sm"
                  style={{ backgroundColor: p.color }}
                />
                {p.image && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={p.image}
                    alt={p.name}
                    className="absolute bottom-full left-1/2 mb-1 h-24 w-auto max-w-none -translate-x-1/2 object-contain sm:h-28 md:h-36"
                  />
                )}
                <span className="absolute top-full left-1/2 mt-1 -translate-x-1/2 whitespace-nowrap text-center font-display text-[0.5rem] font-semibold leading-tight text-ink md:text-[0.6rem]">
                  {p.name}
                </span>
              </motion.div>
            );
          })}

          {/* Jedlik — silhouette + question mark, lands last in the empty quadrant */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: rivals.length * 0.06 + 0.2 }}
            className="absolute z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 md:h-4 md:w-4"
            style={{
              left: `${(jedlik.comfort / 100) * 100}%`,
              top: `${100 - jedlik.maneuverability}%`,
            }}
          >
            <span
              className="block h-full w-full rounded-full border border-paper shadow-sm"
              style={{ backgroundColor: jedlik.color }}
            />
            <div className="absolute bottom-full left-1/2 mb-1 h-14 w-20 -translate-x-1/2 md:h-20 md:w-28">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brand.silhouette}
                alt="E-POD silhouette"
                className="h-full w-full object-contain"
              />
              <span className="absolute inset-0 flex items-center justify-center font-display text-2xl font-extrabold text-paper drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] md:text-4xl">
                ?
              </span>
            </div>
            <span className="absolute top-full left-1/2 mt-1 -translate-x-1/2 whitespace-nowrap text-center font-display text-[0.65rem] font-bold uppercase text-red md:text-sm">
              {jedlik.name}
            </span>
          </motion.div>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-muted md:text-base">
          Seven serious attempts at an enclosed commuter. None of them sit in the
          top-right quadrant — the only one with both high comfort and high
          maneuverability, where Jedlik lives.
        </p>
      </div>
    </section>
  );
}