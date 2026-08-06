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
    <section className="relative bg-paper px-4 py-12 md:px-10 md:py-20">
      <div className="mx-auto max-w-deck">
        <p className="eyebrow">Section 02 — The Map</p>
        <h2 className="display-lg mt-4 max-w-[18ch] text-ink">
          What&apos;s on the road today?
        </h2>

        {/* Chart container — square aspect keeps the scatter readable on mobile */}
        <div className="relative mx-auto mt-10 aspect-square w-full max-w-[640px]">
          {/* axes */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink" />
          <div className="absolute top-1/2 left-0 h-px w-full bg-ink" />

          {/* axis labels */}
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-display text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-ink md:-top-6 md:text-[0.65rem]">
            Comfort
          </span>
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-display text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-muted md:-bottom-6 md:text-[0.65rem]">
            Low Comfort
          </span>
          <span className="absolute top-1/2 left-0 origin-top-left -translate-x-1 -translate-y-1/2 -rotate-90 font-display text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-ink md:text-[0.65rem]">
            Maneuverability
          </span>
          <span className="absolute top-1/2 right-0 origin-top-right translate-x-1 -translate-y-1/2 rotate-90 font-display text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-muted md:text-[0.65rem]">
            Low Maneuver
          </span>

          {/* Quadrant corner labels (screen reading order: TL, TR, BL, BR) */}
          <span className="absolute left-1 top-1 font-display text-[0.5rem] font-semibold uppercase leading-tight tracking-[0.12em] text-muted md:text-[0.55rem]">
            High Maneuver
            <br />
            Low Comfort
          </span>
          <span className="absolute right-1 top-1 text-right font-display text-[0.5rem] font-semibold uppercase leading-tight tracking-[0.12em] text-red md:text-[0.55rem]">
            High Comfort
            <br />
            Low Maneuver
          </span>
          <span className="absolute bottom-1 left-1 font-display text-[0.5rem] font-semibold uppercase leading-tight tracking-[0.12em] text-muted md:text-[0.55rem]">
            Low Maneuver
            <br />
            Low Comfort
          </span>
          <span className="absolute bottom-1 right-1 text-right font-display text-[0.5rem] font-semibold uppercase leading-tight tracking-[0.12em] text-muted md:text-[0.55rem]">
            Low Maneuver
            <br />
            High Comfort
          </span>

          {/* rivals — small image above, name below */}
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
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                style={{ left, top }}
              >
                {p.image && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-6 w-auto object-contain md:h-8"
                  />
                )}
                <span className="mt-0.5 whitespace-nowrap text-center font-display text-[0.5rem] font-semibold leading-tight text-ink md:text-[0.55rem]">
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
            className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{
              left: `${(jedlik.comfort / 100) * 100}%`,
              top: `${100 - jedlik.maneuverability}%`,
            }}
          >
            <div className="relative h-10 w-14 md:h-14 md:w-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brand.silhouette}
                alt="E-POD silhouette"
                className="h-full w-full object-contain"
              />
              <span className="absolute inset-0 flex items-center justify-center font-display text-xl font-extrabold text-paper drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] md:text-2xl">
                ?
              </span>
            </div>
            <span className="mt-0.5 whitespace-nowrap text-center font-display text-[0.6rem] font-bold uppercase text-red md:text-[0.65rem]">
              {jedlik.name}
            </span>
          </motion.div>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-muted md:text-base">
          Seven serious attempts at an enclosed commuter. None of them sit in the
          top-right quadrant — the only one with both high comfort and low
          maneuverability, where Jedlik lives.
        </p>
      </div>
    </section>
  );
}