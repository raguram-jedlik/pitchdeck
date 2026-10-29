"use client";

import { motion } from "framer-motion";
import { quadrantPoints, brand } from "@/data/jedlikData";

/**
 * Positioning map — true 4-quadrant scatter graph with vehicle images for
 * rivals and a question-mark silhouette for Jedlik. Optimised for mobile:
 * the chart scales down cleanly and Jedlik's silhouette is positioned in
 * the only empty quadrant (top-right, the highest comfort / highest
 * maneuverability quadrant).
 *
 * Axis convention: comfort is the x axis, maneuverability is the y axis.
 * +x (right) = higher comfort, -x (left) = lower comfort, +y (top) = higher
 * maneuverability, -y (bottom) = lower maneuverability.
 *
 * Corner labels (screen reading order: TL, TR, BL, BR) — each names the
 * quadrant by the side of the chart its own axis points to:
 *   Q1 TL — Lower Comfort, High Maneuverability
 *   Q2 TR — Higher Comfort, High Maneuverability   ← Jedlik
 *   Q3 BL — Lower Comfort, Low Maneuverability
 *   Q4 BR — Higher Comfort, Low Maneuverability
 */
export default function QuadrantChart() {
  const rivals = quadrantPoints.filter((p) => !p.isJedlik);
  const jedlik = quadrantPoints.find((p) => p.isJedlik)!;

  return (
    <section className="relative px-2 py-6 sm:px-4 md:px-10 md:py-8">
      <div className="mx-auto max-w-deck">
        <p className="eyebrow px-2 sm:px-0">Section 02 — The Map</p>
        <h2 className="display-lg mt-3 max-w-[18ch] px-2 text-ink sm:px-0">
          What&apos;s on the road today?
        </h2>

        {/* Chart container — square aspect keeps the scatter readable on mobile.
            Percent-based left/top on plotted points below are relative to
            the inner square's own edges, so it stays padding-free.

            The four axis labels live OUTSIDE that square, in the wrapper
            below, so they sit clear of the arrowheads: the comfort labels
            run off past the left/right arrow tips, and the maneuverability
            labels sit above the top tip / below the bottom tip. The square
            is inset by the px-* padding so the labels have room to sit in. */}
        <div className="relative mx-auto mt-6 mb-6 w-full max-w-[560px] px-7 py-7 sm:mt-8 sm:mb-8 sm:px-9 sm:py-8">
          <div className="relative aspect-square w-full">
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

          {/* Axis-end labels live in the outer wrapper (see below) so they
              sit clear of the arrowheads rather than on the axes. */}

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
                style={{ left, top, zIndex: i + 1 }}
              >
                <span
                  className="flex h-full w-full items-center justify-center rounded-full border border-paper shadow-sm"
                  style={{ backgroundColor: p.color }}
                />
                {p.image && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={p.image}
                    alt={p.name}
                    className="absolute bottom-full left-1/2 mb-0.5 h-5 w-8 max-w-none -translate-x-1/2 object-contain sm:h-8 sm:w-12 md:h-9 md:w-14"
                  />
                )}
                <span
                  className={`absolute top-full mt-1 whitespace-nowrap font-display text-[0.7rem] font-semibold leading-tight text-ink ${
                    p.name === "Gensol EV/Ezio*"
                      ? "right-1/2 mr-[-6px] text-right"
                      : p.name === "T-Shell Bad Boy"
                        ? "left-1/2 ml-[-6px] text-left"
                        : "left-1/2 -translate-x-1/2 text-center"
                  }`}
                >
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
              className="flex h-full w-full items-center justify-center rounded-full border border-paper shadow-sm"
              style={{ backgroundColor: jedlik.color }}
            >
              <span className="font-display text-[0.75rem] font-bold leading-none text-paper sm:hidden">
                J
              </span>
            </span>
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
            <span className="absolute top-full left-1/2 mt-1 -translate-x-1/2 whitespace-nowrap text-center font-display text-[0.7rem] font-bold uppercase text-red md:text-sm">
              {jedlik.name}
            </span>
          </motion.div>

          {/* Axis-end labels — anchored just OUTSIDE the square's edges so
              they sit clear of the arrowheads. The comfort labels run off
              horizontally past the left/right arrow tips; the
              maneuverability labels sit above the top tip and below the
              bottom tip.
              +x (right) = higher comfort, -x (left) = lower comfort,
              +y (top) = higher maneuverability, -y (bottom) = lower
              maneuverability. */}
          {/* -x : lower comfort, out past the LEFT arrow tip.
              right-full pins the text's right edge to the square's left
              edge, so the label runs outward to the left.

              On a phone the square fills the width, so there is no room
              outside it — the label would sit off-screen and be lost.
              The same is true on a tablet in portrait. Until the
              lg breakpoint the comfort labels therefore sit INSIDE the
              square, tucked into the corners above the horizontal axis,
              where there is empty space. */}
          <span className="absolute right-full top-1/2 mr-2 hidden -translate-y-1/2 whitespace-nowrap text-right font-display text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[#C2660C] lg:block md:text-xs">
            Lower Comfort
          </span>
          {/* +x : higher comfort, out past the RIGHT arrow tip.
              left-full pins the text's left edge to the square's right
              edge, so the label runs outward to the right. */}
          <span className="absolute left-full top-1/2 ml-2 hidden -translate-y-1/2 whitespace-nowrap font-display text-[0.75rem] font-bold uppercase tracking-[0.06em] text-[#C2660C] lg:block md:text-xs">
            Higher Comfort
          </span>
          {/* +y : higher maneuverability, above the top arrow tip */}
          <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap text-center font-display text-[0.7rem] font-bold uppercase tracking-[0.06em] text-[#C2660C] md:text-xs">
            Higher Maneuverability
          </span>
          {/* -y : lower maneuverability, below the bottom arrow tip */}
          <span className="absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap text-center font-display text-[0.7rem] font-bold uppercase tracking-[0.06em] text-[#C2660C] md:text-xs">
            Lower Maneuverability
          </span>

          {/* Compact comfort labels — the mobile/tablet replacements for
              the outside labels above.

              They must not sit inside the plot area: every corner of the
              square has a rival in it.

                lower comfort  = MG Comet (22/78), PMV Eas-E (30/70)
                                 -> top-left, names hang BELOW the dot
                higher comfort = T-Shell Bad Boy (52/14)
                                 -> bottom-right, name hangs below too

              So the labels run vertically along the OUTSIDE edges of the
              square, in the wrapper's padding gutter. Rotating them
              keeps them readable while using only ~14px of width, which
              fits at 320px where the desktop-style horizontal labels
              (~80px) would run off-screen.

              `[writing-mode:vertical-rl] rotate-180` turns the text
              bottom-to-top, so "LOWER COMFORT" reads upward on the left
              edge and "HIGHER COMFORT" reads downward on the right. */}
          <span className="pointer-events-none absolute left-0 top-1/2 block -translate-x-full -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] whitespace-nowrap font-display text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[#C2660C] lg:hidden">
            Lower Comfort
          </span>
          <span className="pointer-events-none absolute right-0 top-1/2 block translate-x-full -translate-y-1/2 [writing-mode:vertical-rl] whitespace-nowrap font-display text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[#C2660C] lg:hidden">
            Higher Comfort
          </span>
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-xl px-2 text-center text-sm text-muted sm:px-0 md:text-base">
          Seven serious attempts at an enclosed commuter. None of them sit in the
          top-right quadrant — the only one with both high comfort and high
          maneuverability, where Jedlik lives.
        </p>
      </div>
    </section>
  );
}