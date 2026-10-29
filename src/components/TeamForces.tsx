"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { founders, mentors, teamHighlight } from "@/data/jedlikData";

/**
 * Founders + mentors.
 *
 *   Mobile: both rows live inside an isolated horizontal scroll container.
 *   The container has overflow-x: auto + overflow-y: hidden so a vertical
 *   swipe keeps scrolling the page; a horizontal swipe scrolls only the
 *   row. No auto-marquee.
 *
 *   Desktop: founders and mentors sit in two columns side by side, so the
 *   section costs the height of the TALLER group rather than both stacked.
 *   That is what lets the portraits stay square.
 *
 *   The portraits are `aspect-square` on purpose. Every source photo here
 *   is square (605x620, 1024x1024, 432x432, 615x615, 1254x1254), and
 *   object-fit: cover centred on a square box crops nothing. An earlier
 *   version letterboxed them to 2:1 to buy vertical space, which sliced
 *   roughly half the height off each headshot. The section now makes room
 *   by placing the two groups side by side instead.
 */
export default function TeamForces() {
  const mentorsScrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (ref: React.RefObject<HTMLDivElement>, dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  return (
    <section className="relative px-6 py-5 md:px-10 md:py-7">
      <div className="mx-auto max-w-deck overflow-hidden">
        <p className="eyebrow">Section 03 — The Forces</p>
        <h2 className="display-lg mt-3 max-w-[16ch] text-ink">
          The team that will bring{" "}
          <img
            src="/images/question-mark-epod.png"
            alt="Jedlik"
            className="relative top-[0.12em] inline-block h-[0.7em] w-auto align-middle"
          />{" "}
          alive.
        </h2>

        <div className="md:grid md:grid-cols-2 md:items-start md:gap-8">
          {/* Founders — scroll container isolated from vertical page scroll */}
          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Founders
            </h3>
            <div className="mt-1 overflow-x-auto overflow-y-hidden pb-2 [touch-action:pan-y_pan-x]">
              <div className="flex w-max gap-4 pr-6 md:grid md:w-full md:grid-cols-3 md:gap-4 md:pr-0">
              {founders.map((f, i) => (
                <motion.figure
                  key={f.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="w-[180px] shrink-0 md:w-auto"
                >
                  {f.image && (
                    <div className="aspect-square w-full overflow-hidden bg-rule">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={f.image}
                        alt={f.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <figcaption className="mt-2 flex flex-col">
                    <span className="font-display text-sm font-semibold uppercase tracking-tight text-ink md:text-base">
                      {f.name}
                    </span>
                    <span className="mt-1 text-xs text-muted md:text-sm">{f.role}</span>
                  </figcaption>
                </motion.figure>
              ))}
              </div>
            </div>
          </div>

          {/* Mentors */}
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Mentors &amp; Advisors
              </h3>
              <div className="flex gap-1 md:hidden">
                <button
                  type="button"
                  aria-label="Scroll mentors left"
                  onClick={() => scrollBy(mentorsScrollRef, -1)}
                  className="flex h-9 w-9 items-center justify-center border border-rule text-ink hover:bg-rule"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Scroll mentors right"
                  onClick={() => scrollBy(mentorsScrollRef, 1)}
                  className="flex h-9 w-9 items-center justify-center border border-rule text-ink hover:bg-rule"
                >
                  →
                </button>
              </div>
            </div>
            <div
              ref={mentorsScrollRef}
              className="mt-2 overflow-x-auto overflow-y-hidden pb-2 [touch-action:pan-y_pan-x]"
            >
              <div className="flex w-max gap-4 pr-6 md:grid md:w-full md:grid-cols-3 md:gap-4 md:pr-0">
                {mentors.map((m, i) => (
                  <motion.article
                    key={m.name}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex w-[190px] shrink-0 flex-col md:w-auto"
                  >
                    {m.image && (
                      <div className="aspect-square w-full overflow-hidden bg-rule">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={m.image}
                          alt={m.name}
                          loading="lazy"
                          className={`h-full w-full object-cover ${m.imageZoom ? "scale-150" : ""}`}
                        />
                      </div>
                    )}
                    <div className="mt-2 flex flex-col">
                      <span className="font-display text-sm font-semibold uppercase tracking-tight text-ink md:text-base">
                        {m.name}
                      </span>
                      <span className="mt-1 text-xs text-ink md:text-sm">{m.role}</span>
                      {m.detail && (
                        <span className="mt-1 text-xs leading-relaxed text-muted">
                          {m.detail}
                        </span>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-3 max-w-3xl border-l-2 border-red pl-5 text-sm font-medium leading-relaxed text-ink md:text-base">
          {teamHighlight}
        </p>
      </div>
    </section>
  );
}
