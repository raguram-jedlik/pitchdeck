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
        <div className="mt-5 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.32fr_1fr] lg:gap-8">
          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="group relative"
          >
            {/* The red rule picks up the one accent in the deck system. */}
            <div className="relative overflow-hidden border border-rule bg-black">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 z-10 h-1 bg-red"
              />
              <Image
                src={b2bFleet.configImage}
                alt={b2bFleet.configImageAlt}
                width={2279}
                height={1556}
                className="h-auto w-full"
                priority
              />
            </div>
            <figcaption className="mt-2.5 flex items-baseline gap-2 text-xs leading-relaxed text-muted">
              <span className="shrink-0 font-display font-semibold uppercase tracking-[0.14em] text-ink">
                {b2bFleet.config}
              </span>
              <span className="min-w-0">{b2bFleet.configNote}</span>
            </figcaption>
          </motion.figure>

          {/* The features, split into cabin and cargo */}
          <div className="space-y-4">
            {[
              { title: "Cabin", items: cabin },
              { title: "Cargo", items: cargo },
            ].map((group, gi) => (
              <div key={group.title}>
                {/* Group label sits on a full-bleed rail so the two
                    groups read as distinct bands, not a running list. */}
                <h3 className="flex items-center gap-2.5 border-y border-rule py-1.5 font-display text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-ink">
                  <span className="dot shrink-0" aria-hidden="true" />
                  {group.title}
                  <span className="ml-auto text-[0.7rem] font-medium tracking-[0.12em] text-muted">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </h3>
                <ul className="mt-1.5 space-y-0.5">
                  {group.items.map((f, i) => (
                    <motion.li
                      key={f.label}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: gi * 0.08 + i * 0.05 }}
                      className="flex gap-2.5 rounded-sm px-1.5 py-1 transition-colors hover:bg-paper-2"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.3rem] h-1 w-1 shrink-0 rounded-full bg-rule"
                      />
                      <span className="min-w-0">
                        <span className="font-display text-[0.8rem] font-bold leading-snug tracking-tight text-ink md:text-[0.9rem]">
                          {f.label}
                        </span>
                        <span className="mt-0.5 block text-[0.72rem] leading-relaxed text-muted md:text-[0.8rem]">
                          {f.detail}
                        </span>
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Block>

      {/* ---------------- Block B — the vehicle specifications ---------------- */}
      <Block className="lg:py-7">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
          {/* Left: the claim the specs back up */}
          <div>
            <p className="eyebrow">
              {b2bFleet.eyebrow}
              <span className="text-muted"> · continued</span>
            </p>
            <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
              Built to work, all day, in any weather
            </h2>
            <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-muted md:text-base">
              {b2bFleet.lede}
            </p>

            {/* The two product pillars the spec table then quantifies. */}
            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {b2bFleet.pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="border-l-2 border-red bg-paper-2/70 px-3.5 py-3"
                >
                  <p className="font-display text-[0.8rem] font-bold leading-snug tracking-tight text-ink md:text-[0.9rem]">
                    {p.title}
                  </p>
                  <p className="mt-0.5 text-[0.72rem] leading-relaxed text-muted md:text-[0.8rem]">
                    {p.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: the specification table */}
          <div>
            <h3 className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-ink">
              Vehicle specifications
            </h3>
            <div className="mt-2 grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2">
              {b2bSpecs.map((s, i) => (
                <motion.div
                  key={s.spec}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-paper p-3.5 md:p-4"
                >
                  <p className="eyebrow">{s.spec}</p>
                  <p className="mt-1.5 font-display text-[0.85rem] font-bold leading-snug tracking-tight text-ink md:text-[0.95rem]">
                    {s.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* The vehicle itself anchors the base of the slide. */}
        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="relative mt-6 overflow-hidden border border-rule bg-black"
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 z-10 h-1 bg-red"
          />
          <Image
            src={b2bFleet.renderImage}
            alt={b2bFleet.renderImageAlt}
            width={749}
            height={581}
            className="mx-auto h-auto max-h-[40vh] w-auto object-contain"
          />
          <figcaption className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/85 to-transparent px-4 pb-3 pt-8 text-xs font-display font-semibold uppercase tracking-[0.14em] text-paper">
            The Jedlik e-POD
          </figcaption>
        </motion.figure>
      </Block>
    </>
  );
}
