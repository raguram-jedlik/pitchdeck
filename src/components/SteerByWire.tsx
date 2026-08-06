"use client";

import { motion } from "framer-motion";
import { steerByWire, crabWalk, type CrabMode } from "@/data/jedlikData";

/**
 * Steer-by-wire + Crab-walk. No tabs, no glass, no glow. The crab-walk
 * diagrams are inline SVG with wheels that hold their resting angle — so the
 * three modes read as three different geometries even with animation off.
 */
function CrabDiagram({ front, rear }: { front: number; rear: number }) {
  return (
    <svg viewBox="0 0 90 150" className="h-32 w-auto md:h-40" aria-hidden="true">
      {/* chassis */}
      <rect x="24" y="18" width="42" height="114" rx="10" fill="#F4F4F4" />
      {/* front wheel */}
      <g
        style={{ transform: `rotate(${front}deg)`, transformOrigin: "45px 19px" }}
      >
        <rect x="36" y="2" width="18" height="34" rx="7" fill="#000000" />
      </g>
      {/* rear wheel */}
      <g
        style={{ transform: `rotate(${rear}deg)`, transformOrigin: "45px 131px" }}
      >
        <rect x="36" y="114" width="18" height="34" rx="7" fill="#000000" />
      </g>
    </svg>
  );
}

function CrabModeBlock({ mode }: { mode: CrabMode }) {
  return (
    <div className="flex flex-col items-center">
      <CrabDiagram front={mode.front} rear={mode.rear} />
      <span className="mt-3 text-center font-display text-xs font-semibold uppercase tracking-tight text-ink md:text-sm">
        {mode.name}
      </span>
    </div>
  );
}

export default function SteerByWire() {
  return (
    <section className="relative bg-paper px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-deck">
        <p className="eyebrow">Section 06 — The Trick</p>
        <h2 className="display-lg mt-4 max-w-[16ch] text-ink">
          The trick with two wheels.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-12 border-t border-rule pt-14 md:grid-cols-2">
          {/* Steer by wire */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-red">
              {steerByWire.heading}
            </span>
            <p className="mt-4 text-base leading-relaxed text-ink md:text-lg">
              {steerByWire.description}
            </p>

            <div className="mt-8 overflow-hidden border border-rule">
              <img
                src={steerByWire.image}
                alt="Mechanical steering column compared with steer-by-wire"
                loading="lazy"
                className="w-full"
              />
            </div>

            <ul className="mt-6 space-y-2 text-sm text-ink md:text-base">
              {steerByWire.benefits.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="text-red" aria-hidden="true">
                    ·
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Crab walk */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-red">
              {crabWalk.heading}
            </span>
            <p className="mt-4 text-base leading-relaxed text-ink md:text-lg">
              {crabWalk.description}
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 border border-rule p-4 md:p-6">
              {crabWalk.modes.map((mode) => (
                <CrabModeBlock key={mode.name} mode={mode} />
              ))}
            </div>

            <ul className="mt-6 space-y-2 text-sm text-ink md:text-base">
              {crabWalk.benefits.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="text-red" aria-hidden="true">
                    ·
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}