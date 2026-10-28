"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PresentMode from "@/components/PresentMode";

/**
 * DeckShell — wraps a deck's content and enforces one-section-at-a-time
 * scrolling, plus offers the "View in Present Mode" button at the bottom.
 *
 * One-section-at-a-time scrolling
 * --------------------------------
 * Each top-level section is given `scroll-snap-align: start` and the
 * scrolling container gets `scroll-snap-type: y mandatory`. The browser
 * then settles on a section boundary instead of stopping mid-section, so
 * only one section is on screen at a time.
 *
 * The snapping is applied to the scrolling element rather than `html`,
 * because the deck already uses `html { scroll-snap-type: y proximity }`
 * for its inner scrollytelling panels and we don't want to fight that.
 * We flip the document-level snapping to `mandatory` only while the deck
 * is the active view.
 *
 * Sections taller than the viewport would trap the user, so any section
 * that overflows the viewport keeps `scroll-snap-align: start` but the
 * container uses `proximity` snapping — the browser only snaps when a
 * section boundary is near. This keeps long sections (the detailed deck's
 * data tables, for example) fully readable.
 *
 * Present mode
 * ------------
 * The same section elements are moved into the PresentMode overlay, which
 * shows exactly one at a time. There is one source of truth for content.
 */

interface DeckShellProps {
  /** The deck's content — sections and everything between them. */
  children: React.ReactNode;
  /** Deck title shown in the present-mode chrome. */
  title: string;
  /** CSS selector that identifies the deck's top-level sections. */
  sectionSelector?: string;
  /** Label for the present-mode button. */
  presentLabel?: string;
}

export default function DeckShell({
  children,
  title,
  sectionSelector = "main > section",
  presentLabel = "View in present mode",
}: DeckShellProps) {
  const [present, setPresent] = useState(false);
  const [sections, setSections] = useState<HTMLElement[]>([]);
  const shellRef = useRef<HTMLDivElement>(null);

  /**
   * Collect the deck's top-level sections once the DOM is ready. The
   * present-mode overlay re-parents sections, so we re-read the list
   * whenever present mode opens and closes.
   */
  const collect = useCallback(() => {
    const root = shellRef.current;
    if (!root) return;
    const found = Array.from(
      root.querySelectorAll<HTMLElement>(sectionSelector)
    ).filter((el) => el !== root);
    setSections(found);
  }, [sectionSelector]);

  useEffect(() => {
    collect();
    // Sections can be added by client-side effects; re-check once the
    // page has settled.
    const t = setTimeout(collect, 600);
    return () => clearTimeout(t);
  }, [collect]);

  /**
   * Mark sections that fit the viewport as snap targets. Sections taller
   * than the viewport are left out so they scroll freely instead of
   * snapping and trapping the reader.
   */
  useEffect(() => {
    if (!sections.length) return;
    const apply = () => {
      sections.forEach((el) => {
        const fits = el.offsetHeight <= window.innerHeight * 1.05;
        el.classList.toggle("deck-snap-target", fits);
      });
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [sections]);

  const openPresent = useCallback(() => {
    collect();
    setPresent(true);
  }, [collect]);

  return (
    <div ref={shellRef} className="deck-shell relative">
      {children}

      {/* The present-mode button sits at the very bottom of the deck. */}
      <div className="flex justify-center border-t border-rule px-6 py-12 md:px-10 md:py-16">
        <button
          type="button"
          onClick={openPresent}
          className="group inline-flex items-center gap-3 border border-ink bg-transparent px-7 py-4 font-display text-xs font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:border-red hover:bg-red hover:text-paper"
        >
          {presentLabel}
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </button>
      </div>

      <PresentMode
        open={present}
        onClose={() => {
          setPresent(false);
          // Re-read the section list now that the sections have been
          // returned to the deck.
          setTimeout(collect, 100);
        }}
        sections={sections}
        title={title}
      />
    </div>
  );
}
