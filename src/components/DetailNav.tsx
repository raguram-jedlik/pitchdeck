"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { brand } from "@/data/jedlikData";

/**
 * DetailNav — the header for the /detail page.
 *
 * Mirrors the deck's Nav (fixed logo top-left, red scroll-progress hairline)
 * but adds a quiet section index on the right so a reader deep in a
 * fifteen-section document can jump back to the structure. The index
 * collapses to a single "Contents" toggle on narrow screens.
 */

const SECTIONS = [
  { id: "snapshot", label: "Snapshot" },
  { id: "prototypes", label: "Prototypes" },
  { id: "validation", label: "Topic validation" },
  { id: "product", label: "Product" },
  { id: "specifications", label: "Vehicle specifications" },
  { id: "model", label: "Business model" },
  { id: "revenue", label: "Revenue mix" },
  { id: "economics", label: "Unit economics" },
  { id: "manufacturing", label: "Manufacturing" },
  { id: "gtm", label: "Go to market" },
  { id: "round", label: "The round" },
  { id: "captable", label: "Cap table" },
  { id: "operations", label: "Operations" },
  { id: "ip", label: "IP" },
  { id: "projection", label: "Projection" },
];

export default function DetailNav() {
  const { scrollYProgress } = useScroll();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("snapshot");

  // Highlight whichever section is currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Land at the top of the document on a fresh load.
  //
  // The browser restores the previous scroll position on reload, which
  // leaves the hero's buttons tucked under the fixed header. Jump to the
  // top unless the URL carries an in-page anchor (a Contents jump).
  //
  // ScrollToTopOnMount owns the reset — it also handles client-side
  // navigation into this page, which a mount effect here cannot (the
  // browser restores the outgoing page's offset after mount). Keeping a
  // second reset here would fight the mandatory scroll-snap, so this
  // only covers the case that component does not: a hard reload.
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-red"
        style={{ scaleX: scrollYProgress }}
      />

      <header className="deck-header fixed top-0 left-0 right-0 z-40 flex items-start justify-between gap-3 bg-paper/90 py-2 backdrop-blur-sm md:gap-6">
        <Link href="/" aria-label={`${brand.name} — back to deck`} className="flex min-h-[44px] items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-cropped.png" alt={brand.name} className="h-9 w-auto md:h-14" />
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden border border-rule px-4 py-2.5 font-display text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink md:inline-block md:text-[0.75rem]"
          >
            &larr; Deck
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="border border-rule px-4 py-3 font-display text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink md:py-2.5"
          >
            {open ? "Close" : "Contents"}
          </button>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-x-0 top-[57px] z-30 max-h-[calc(100vh-57px)] overflow-y-auto border-b border-rule bg-paper px-6 py-6 md:top-[69px] md:px-10">
          <nav className="mx-auto grid max-w-deck grid-cols-2 gap-x-6 gap-y-1 md:grid-cols-3">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className={`border-b border-rule py-2 font-display text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                  active === s.id ? "text-red" : "text-ink hover:text-red"
                }`}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
}
