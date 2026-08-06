"use client";

import { motion } from "framer-motion";
import { quadrantPoints } from "@/data/jedlikData";

/**
 * Positioning map. Mobile: a clean ranked list (no scatter, no cramped dots).
 * Desktop: scatter chart with axes, rivals as dots, Jedlik as the red dot.
 */
export default function QuadrantChart() {
  const rivals = quadrantPoints.filter((p) => !p.isJedlik);
  const jedlik = quadrantPoints.find((p) => p.isJedlik)!;

  return (
    <section className="relative bg-paper px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-deck">
        <p className="eyebrow">Section 02 — The Map</p>
        <h2 className="display-lg mt-4 max-w-[18ch] text-ink">
          What&apos;s on the road today?
        </h2>

        {/* Mobile: ranked list — avoids the cramped scatter on small screens. */}
        <div className="mt-12 md:hidden">
          <ol className="border-t border-rule">
            {[...rivals]
              .sort((a, b) => b.maneuverability + b.comfort - (a.maneuverability + a.comfort))
              .map((p, i) => (
                <motion.li
                  key={p.name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="flex items-center justify-between border-b border-rule py-3"
                >
                  <span className="font-display text-sm font-semibold uppercase text-ink">
                    {p.name}
                  </span>
                  <span className="font-display text-xs text-muted">
                    C {p.comfort} · M {p.maneuverability}
                  </span>
                </motion.li>
              ))}
            <motion.li
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: rivals.length * 0.05 }}
              className="flex items-center justify-between border-b-2 border-red py-3"
            >
              <span className="font-display text-sm font-bold uppercase text-red">
                {jedlik.name}
              </span>
              <span className="font-display text-xs text-red">
                C {jedlik.comfort} · M {jedlik.maneuverability}
              </span>
            </motion.li>
          </ol>
        </div>

        {/* Desktop: scatter chart */}
        <div className="relative mt-12 hidden aspect-[4/3] w-full md:block">
          {/* axes */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink" />
          <div className="absolute top-1/2 left-0 h-px w-full bg-ink" />

          {/* axis labels */}
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-display text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink">
            Comfort
          </span>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-display text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted">
            Low Comfort
          </span>
          <span className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 origin-center -rotate-90 font-display text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink">
            Maneuverability
          </span>
          <span className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 origin-center rotate-90 font-display text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted">
            Low Maneuver
          </span>

          {/* quadrant labels */}
          <span className="absolute left-2 top-2 font-display text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-muted">
            High Maneuver
            <br />
            Low Comfort
          </span>
          <span className="absolute right-2 top-2 text-right font-display text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-muted">
            High Comfort
            <br />
            High Maneuver
          </span>
          <span className="absolute bottom-2 left-2 font-display text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-muted">
            Low Maneuver
            <br />
            Low Comfort
          </span>
          <span className="absolute bottom-2 right-2 text-right font-display text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-muted">
            Low Maneuver
            <br />
            High Comfort
          </span>

          {/* rivals */}
          {rivals.map((p, i) => {
            const left = `${(p.comfort / 100) * 100}%`;
            const bottom = `${(p.maneuverability / 100) * 100}%`;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="absolute flex -translate-x-1/2 translate-y-1/2 flex-col items-center"
                style={{ left, bottom }}
              >
                <span className="h-2 w-2 rounded-full bg-ink" />
                <span className="mt-1 whitespace-nowrap font-display text-[0.6rem] font-semibold text-ink">
                  {p.name}
                </span>
              </motion.div>
            );
          })}

          {/* Jedlik — red dot, lands last */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: rivals.length * 0.06 + 0.2 }}
            className="absolute z-10 flex -translate-x-1/2 translate-y-1/2 flex-col items-center"
            style={{
              left: `${(jedlik.comfort / 100) * 100}%`,
              bottom: `${(jedlik.maneuverability / 100) * 100}%`,
            }}
          >
            <span className="h-3 w-3 rounded-full bg-red" />
            <span className="mt-1 whitespace-nowrap font-display text-xs font-bold uppercase text-red">
              {jedlik.name}
            </span>
          </motion.div>
        </div>

        <p className="mt-10 max-w-xl text-sm text-muted md:text-base">
          Seven serious attempts at an enclosed commuter. None of them sit in the
          top-right quadrant.
        </p>
      </div>
    </section>
  );
}