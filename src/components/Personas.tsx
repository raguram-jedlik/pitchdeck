"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { personas } from "@/data/jedlikData";

/**
 * Inline TAM donut for a persona. SVG-only, no chart library.
 */
function PersonaDonut({ share, accent }: { share: number; accent: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [draw, setDraw] = useState(0);
  const size = 120;
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const pct = share / 100;

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, pct, {
      duration: 1.4,
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
        strokeWidth="10"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={accent}
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - draw)}
        strokeLinecap="butt"
      />
      <text
        x={size / 2}
        y={size / 2 + 5}
        textAnchor="middle"
        fill="#000"
        fontSize="18"
        fontWeight="700"
        transform={`rotate(90 ${size / 2} ${size / 2})`}
        style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
      >
        {share}%
      </text>
    </svg>
  );
}

/**
 * LTV scale bar. The bar fills to (persona.ltv midpoint) on the $3K–$7K scale.
 */
function LtvBar({ ltv }: { ltv: string }) {
  const range: Record<string, number> = {
    "$3.5K–$4.5K": 0.5,
    "$5K–$7K": 0.9,
  };
  const fill = range[ltv] ?? 0.5;
  return (
    <div className="mt-1.5 h-1.5 w-full bg-rule">
      <div
        className="h-full bg-ink"
        style={{ width: `${fill * 100}%` }}
      />
    </div>
  );
}

export default function Personas() {
  return (
    <section className="relative bg-paper px-6 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-deck">
        <p className="eyebrow">Section 08 — The Customers</p>
        <h2 className="display-lg mt-4 max-w-[16ch] text-ink">
          Target customers.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-px bg-rule sm:grid-cols-3">
          {personas.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-paper p-6 md:p-8"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-sm font-bold text-red">
                  {p.number}
                </span>
                <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {p.tam}
                </span>
              </div>

              {/* Infographic: donut for TAM share */}
              <div className="mt-6 flex items-center gap-5">
                <PersonaDonut share={p.share} accent={p.accent} />
                <div className="flex-1">
                  <h3 className="font-display text-base font-semibold uppercase leading-tight tracking-tight text-ink md:text-lg">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted">{p.profile}</p>
                </div>
              </div>

              <dl className="mt-6 space-y-3 text-sm md:text-base">
                {[
                  ["Age", p.age],
                  ["Income", p.income],
                  ["Location", p.location],
                  ["Trigger", p.trigger],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[5.5rem_1fr] gap-3">
                    <dt className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                      {k}
                    </dt>
                    <dd className="text-ink">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 border-t border-rule pt-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    LTV
                  </span>
                  <span className="font-display text-sm font-bold text-ink md:text-base">
                    {p.ltv}
                  </span>
                </div>
                <LtvBar ltv={p.ltv} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}