"use client";

import { motion } from "framer-motion";
import { steerByWire, crabWalk, type CrabMode } from "@/data/jedlikData";

/**
 * Crab-walk SVG diagram with mode-correct wheel animation.
 *   - Front Wheel Drive: only the front wheel turns
 *   - Circle:            front and rear turn in OPPOSITE directions
 *   - Glide:             front and rear turn in the SAME direction
 *
 * The transform-origin is set on each wheel so the rotation pivots from
 * the wheel's contact patch. Under prefers-reduced-motion the animation
 * stops but the resting angle is preserved.
 */
function CrabDiagram({ mode }: { mode: CrabMode }) {
  // Per-mode animation amplitudes (degrees from the resting angle)
  const frontAmp =
    mode.name === "Circle" ? 18 : 18; // swing magnitude, same in all modes
  const rearAmp = mode.name === "Front Wheel Drive" ? 0 : 18;
  // Phase relationship — Circle: front and rear are 180° out of phase;
  //                     Glide: front and rear in phase.
  const rearPhase = mode.name === "Circle" ? "reversed" : "synced";

  const frontAnim = `crab-front-${mode.name.replace(/\s+/g, "")} 3.4s ease-in-out infinite`;
  const rearAnim = `crab-rear-${mode.name.replace(/\s+/g, "")} 3.4s ease-in-out infinite`;

  return (
    <svg viewBox="0 0 90 150" className="h-32 w-auto md:h-40" aria-hidden="true">
      <rect x="24" y="18" width="42" height="114" rx="10" fill="#F4F4F4" />

      {/* front wheel — pivot from contact patch at the bottom */}
      <rect
        x="36"
        y="2"
        width="18"
        height="34"
        rx="7"
        fill="#000000"
        style={{
          transformOrigin: "45px 19px",
          transform: `rotate(${mode.front}deg)`,
          animation: frontAnim,
        }}
      />

      {/* rear wheel — pivot from contact patch at the top */}
      <rect
        x="36"
        y="114"
        width="18"
        height="34"
        rx="7"
        fill="#000000"
        style={{
          transformOrigin: "45px 131px",
          transform: `rotate(${mode.rear}deg)`,
          animation: rearAnim,
        }}
      />
    </svg>
  );
}

/**
 * Per-mode animation keyframes. Each mode derives its own animation block
 * in globals.css. The class name encodes front/rear amplitude and phase.
 */

function CrabModeBlock({ mode }: { mode: CrabMode }) {
  return (
    <div className="flex flex-col items-center">
      <CrabDiagram mode={mode} />
      <span className="mt-3 text-center font-display text-xs font-semibold uppercase tracking-tight text-ink md:text-sm">
        {mode.name}
      </span>
    </div>
  );
}

export default function SteerByWire() {
  return (
    <section className="relative bg-paper px-6 py-12 md:px-10 md:py-20">
      <div className="mx-auto max-w-deck">
        <p className="eyebrow">Section 06 — The Trick</p>
        <h2 className="display-lg mt-4 max-w-[16ch] text-ink">
          The trick with two wheels.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-12 border-t border-rule pt-12 md:grid-cols-2 md:gap-10">
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

            <div className="mt-6 overflow-hidden border border-rule">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={steerByWire.image}
                alt="Mechanical steering column compared with steer-by-wire"
                loading="lazy"
                className="w-full"
              />
            </div>

            <ul className="mt-6 space-y-2 text-sm text-ink md:text-base">
              {steerByWire.benefits.map((b) => (
                <li key={b}>— {b}</li>
              ))}
            </ul>
          </motion.div>

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

            <div className="mt-6 grid grid-cols-3 gap-4 border border-rule p-4 md:p-6">
              {crabWalk.modes.map((mode) => (
                <CrabModeBlock key={mode.name} mode={mode} />
              ))}
            </div>

            <ul className="mt-6 space-y-2 text-sm text-ink md:text-base">
              {crabWalk.benefits.map((b) => (
                <li key={b}>— {b}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}