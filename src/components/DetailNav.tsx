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
  { id: "team", label: "Founders" },
  { id: "prototypes", label: "Prototypes" },
  { id: "product", label: "Product" },
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
  { id: "notes", label: "Notes" },
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

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-red"
        style={{ scaleX: scrollYProgress }}
      />

      <header className="fixed top-0 left-0 right-0 z-40 flex items-start justify-between gap-4 bg-paper/90 backdrop-blur-sm">
        <Link href="/" aria-label={`${brand.name} — back to deck`} className="block pl-0 pt-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-cropped.png" alt={brand.name} className="h-10 w-auto md:h-14" />
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden border border-rule px-4 py-2 font-display text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink md:inline-block"
          >
            &larr; Deck
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="border border-rule px-4 py-2 font-display text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink"
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
