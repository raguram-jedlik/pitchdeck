"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  b2bFleet,
  b2bFeatures,
  b2bSpecs,
} from "@/data/jedlikData";

/**
 * Section 07 — the B2B fleet cut.
 *
 * The brief deck is written for investors. This section is the product
 * story only: the vehicle picture from the B2B Deck and the features a
 * fleet operator buys. No cost-per-km tables, no savings figures, no
 * pilot commercials — those belong in the operator conversation, not in
 * the investor brief.
 *
 * Split into two blocks, each its own full-viewport section so the
 * fit-to-viewport shell never crushes the picture or the feature lists:
 *
 *   Block A: the vehicle picture + the feature callouts it carries
 *   Block B: the vehicle specifications
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
  const cabin = b2bFeatures.filter((f) => f.group === "Cabin");
  const cargo = b2bFeatures.filter((f) => f.group === "Cargo");

  return (
    <>
      {/* ---------------- Block A — the picture + its features ---------------- */}
      <Block>
        <p className="eyebrow">{b2bFleet.eyebrow}</p>
        <h2 className="display-lg mt-3 max-w-[16ch] text-ink">
          {b2bFleet.heading}
        </h2>
        <p className="mt-3 max-w-[52ch] text-base text-muted md:text-lg">
          {b2bFleet.sub}
        </p>

        {/* The uploaded picture, with the features it carries */}
        <div className="mt-5 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.25fr_1fr]">
          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative overflow-hidden border border-rule bg-black">
              <Image
                src={b2bFleet.configImage}
                alt={b2bFleet.configImageAlt}
                width={2279}
                height={1556}
                className="h-auto w-full"
                priority
              />
            </div>
            <figcaption className="mt-2 text-xs leading-relaxed text-muted">
              {b2bFleet.config} — {b2bFleet.configNote}
            </figcaption>
          </motion.figure>

          {/* The features, split into cabin and cargo */}
          <div className="space-y-5">
            {[
              { title: "Cabin", items: cabin },
              { title: "Cargo", items: cargo },
            ].map((group, gi) => (
              <div key={group.title}>
                <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  {group.title}
                </h3>
                <ul className="mt-2 space-y-2">
                  {group.items.map((f, i) => (
                    <motion.li
                      key={f.label}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: gi * 0.08 + i * 0.05 }}
                      className="border-l-2 border-rule pl-3"
                    >
                      <p className="font-display text-sm font-bold leading-snug tracking-tight text-ink md:text-base">
                        {f.label}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted md:text-sm">
                        {f.detail}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Block>

      {/* ---------------- Block B — the vehicle specifications ---------------- */}
      <Block>
        <p className="eyebrow">
          {b2bFleet.eyebrow}
          <span className="text-muted"> · continued</span>
        </p>
        <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
          Built to work, all day, in any weather
        </h2>
        <p className="mt-1.5 max-w-[62ch] text-sm leading-relaxed text-muted md:text-base">
          {b2bFleet.lede}
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
      </Block>
    </>
  );
}
