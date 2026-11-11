"use client";

import { motion } from "framer-motion";
import {
  b2bFleet,
  b2bProblems,
  b2bSpecs,
  b2bAdas,
  b2bCostRows,
  b2bEconomics,
  b2bPilot,
} from "@/data/jedlikData";

/**
 * Section 07 — the B2B fleet cut.
 *
 * The brief deck is written for investors. This section is the same story
 * told in the fleet operator's language: what a petrol scooter costs them
 * per kilometre, what the e-POD costs them per kilometre, and what the
 * difference is worth over five years.
 *
 * Split into three blocks, each its own full-viewport section so the
 * fit-to-viewport shell never crushes the tables:
 *
 *   Block A: the problem + the two solution pillars
 *   Block B: fleet configuration, specs and ADAS
 *   Block C: unit economics (the CFO's case) + the pilot programme
 */

function Block({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative px-6 py-6 md:px-10 md:py-9 ${className}`}>
      <div className="mx-auto max-w-deck">{children}</div>
    </section>
  );
}

export default function B2BFleet() {
  return (
    <>
      {/* ---------------- Block A — the problem + the pillars ---------------- */}
      <Block>
        <p className="eyebrow">{b2bFleet.eyebrow}</p>
        <h2 className="display-lg mt-3 max-w-[16ch] text-ink">
          {b2bFleet.heading}
        </h2>
        <p className="mt-3 max-w-[52ch] text-base text-muted md:text-lg">
          {b2bFleet.sub}
        </p>
        <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-ink md:text-base">
          {b2bFleet.lede}
        </p>

        {/* The problem, stated as the operator's own cost lines */}
        <div className="mt-5 grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {b2bProblems.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="bg-paper-2 p-3 md:p-4"
            >
              <p className="eyebrow">{p.label}</p>
              <p className="mt-2 font-display text-base font-bold leading-tight tracking-tight text-red md:text-lg">
                {p.headline}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted md:text-sm">
                {p.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* The two pillars */}
        <div className="mt-5 grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2">
          {b2bFleet.pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.12 + i * 0.06 }}
              className="bg-paper p-4 md:p-5"
            >
              <p className="font-display text-base font-bold uppercase tracking-tight text-ink md:text-lg">
                {pillar.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted md:text-base">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </Block>

      {/* ---------------- Block B — fleet configuration ---------------- */}
      <Block>
        <p className="eyebrow">
          {b2bFleet.eyebrow}
          <span className="text-muted"> · continued</span>
        </p>
        <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
          {b2bFleet.config}
        </h2>
        <p className="mt-1.5 max-w-[62ch] text-sm leading-relaxed text-muted md:text-base">
          {b2bFleet.configNote}
        </p>

        {/* Vehicle specifications */}
        <div className="mt-4">
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Vehicle specifications
          </h3>
          <div className="mt-2 grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {b2bSpecs.map((s, i) => (
              <motion.div
                key={s.spec}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-paper-2 p-3 md:p-4"
              >
                <p className="eyebrow">{s.spec}</p>
                <p className="mt-1.5 font-display text-sm font-bold leading-snug tracking-tight text-ink md:text-base">
                  {s.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ADAS */}
        <div className="mt-4">
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            ADAS
          </h3>
          <ul className="mt-2 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
            {b2bAdas.map((a, i) => (
              <motion.li
                key={a}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-baseline gap-2.5"
              >
                <span className="dot mt-1.5 shrink-0" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-ink md:text-base">
                  {a}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* The trailer line — competitors have all tried, none shipped */}
        <p className="mt-5 border-l-2 border-red bg-red-soft/40 px-4 py-3 text-sm leading-relaxed text-ink md:text-base">
          {b2bFleet.trailer}
        </p>
      </Block>

      {/* ---------------- Block C — unit economics + pilot ---------------- */}
      <Block>
        <p className="eyebrow">
          {b2bFleet.eyebrow}
          <span className="text-muted"> · continued</span>
        </p>
        <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
          Unit economics — the fleet operator&rsquo;s case
        </h2>
        <p className="mt-1.5 max-w-[62ch] text-sm leading-relaxed text-muted md:text-base">
          Per-km total cost of ownership at an 80 km/day workload — the numbers
          a CFO will sign off on.
        </p>

        {/* The headline saving */}
        <div className="mt-4 flex flex-wrap items-end gap-x-6 gap-y-2 border border-rule bg-paper-2 px-4 py-3">
          <span className="font-display text-3xl font-bold leading-none tracking-tight text-red md:text-4xl">
            {b2bEconomics.savingPercent}% cheaper
          </span>
          <span className="text-sm text-muted">
            {b2bEconomics.scooterTotal} today → {b2bEconomics.epodTotal} with the
            e-POD
          </span>
          <span className="text-xs text-muted md:text-sm">{b2bEconomics.epodOnRoad}</span>
        </div>

        {/* The cost breakdown, side by side */}
        <div className="mt-3 -mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
          <table className="w-full min-w-[520px] border-collapse bg-paper-2 text-left">
            <thead>
              <tr>
                <th className="border-b-2 border-ink pb-2.5 pr-4 font-display text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink">
                  Cost per km
                </th>
                <th className="border-b-2 border-ink pb-2.5 pr-4 text-right font-display text-[0.7rem] font-bold uppercase tracking-[0.16em] text-muted">
                  Petrol scooter
                </th>
                <th className="border-b-2 border-ink pb-2.5 text-right font-display text-[0.7rem] font-bold uppercase tracking-[0.16em] text-red">
                  e-POD
                </th>
              </tr>
            </thead>
            <tbody>
              {b2bCostRows.map((r, i) => (
                <motion.tr
                  key={r.line}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="border-b border-rule"
                >
                  <td className="py-2.5 pr-4 text-sm leading-relaxed text-ink md:text-base">
                    {r.line}
                  </td>
                  <td className="py-2.5 pr-4 text-right font-display text-sm text-muted md:text-base">
                    {r.scooter}
                  </td>
                  <td className="py-2.5 text-right font-display text-sm font-bold text-red md:text-base">
                    {r.epod}
                  </td>
                </motion.tr>
              ))}
              <tr>
                <td className="py-3 pr-4 font-display text-sm font-bold uppercase tracking-tight text-ink md:text-base">
                  All-in cost per km
                </td>
                <td className="py-3 pr-4 text-right font-display text-sm font-bold text-ink md:text-base">
                  {b2bEconomics.scooterTotal}
                </td>
                <td className="py-3 text-right font-display text-base font-bold text-red md:text-lg">
                  {b2bEconomics.epodTotal}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* What the saving is worth */}
        <div className="mt-3 grid grid-cols-2 gap-px border border-rule bg-rule lg:grid-cols-4">
          <div className="bg-paper-2 p-3 md:p-4">
            <p className="eyebrow">5-year saving / vehicle</p>
            <p className="mt-1.5 font-display text-lg font-bold tracking-tight text-red md:text-xl">
              {b2bEconomics.savingPerVehicle}
            </p>
          </div>
          <div className="bg-paper-2 p-3 md:p-4">
            <p className="eyebrow">Per vehicle / year</p>
            <p className="mt-1.5 font-display text-lg font-bold tracking-tight text-ink md:text-xl">
              {b2bEconomics.savingPerVehiclePerYear}
            </p>
          </div>
          <div className="bg-paper-2 p-3 md:p-4">
            <p className="eyebrow">Fleet of 10</p>
            <p className="mt-1.5 font-display text-lg font-bold tracking-tight text-ink md:text-xl">
              {b2bEconomics.fleetTen}
            </p>
          </div>
          <div className="bg-paper-2 p-3 md:p-4">
            <p className="eyebrow">Payback</p>
            <p className="mt-1.5 font-display text-lg font-bold tracking-tight text-ink md:text-xl">
              {b2bEconomics.payback}
            </p>
          </div>
        </div>
        <p className="mt-1.5 text-xs text-muted md:text-sm">{b2bEconomics.basis}</p>

        {/* The pilot programme */}
        <div className="mt-5">
          <h3 className="font-display text-base font-bold uppercase tracking-tight text-ink md:text-lg">
            {b2bFleet.pilot.title}
          </h3>
          <p className="mt-1 text-sm text-red md:text-base">{b2bFleet.pilot.sub}</p>

          <div className="mt-3 grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2">
            {b2bPilot.map((opt, i) => (
              <motion.div
                key={opt.tag}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="bg-paper p-4"
              >
                <p className="eyebrow text-red">{opt.tag}</p>
                <p className="mt-1.5 font-display text-sm font-bold uppercase tracking-tight text-ink md:text-base">
                  {opt.title}
                </p>
                <ul className="mt-2.5 space-y-1.5">
                  {opt.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                      <span className="dot mt-1.5 shrink-0" aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <p className="mt-3 text-sm leading-relaxed text-ink md:text-base">
            {b2bFleet.pilot.closing}
          </p>
        </div>
      </Block>
    </>
  );
}
