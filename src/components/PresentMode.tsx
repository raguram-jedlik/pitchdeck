"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * PresentMode — a fullscreen "present mode" for the deck.
 *
 * The button at the bottom of the deck opens this overlay. In present mode
 * exactly one section is shown at a time, filling the screen. The viewer
 * moves between sections with the arrow keys, Page Up/Page Down, Space,
 * Home/End, or the on-screen controls.
 *
 * Sections are taken from the live deck DOM rather than rendered twice, so
 * there is a single source of truth for content: the overlay moves the
 * browser to each section and the browser renders it. That keeps the
 * present view pixel-identical to the scrolled view.
 *
 * Escape (or the close button) returns to the deck at the same section.
 */

interface PresentModeProps {
  /** Open state, controlled by the parent so the button and overlay agree. */
  open: boolean;
  /** Called when the overlay should close. */
  onClose: () => void;
  /** The section elements to present, in order. */
  sections: HTMLElement[];
  /** Label for the deck, shown in the overlay chrome. */
  title: string;
}

export default function PresentMode({
  open,
  onClose,
  sections,
  title,
}: PresentModeProps) {
  const [index, setIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Remember where the deck was scrolled to, so closing restores the view.
  const savedScroll = useRef(0);

  useEffect(() => {
    if (!open) return;
    savedScroll.current = window.scrollY;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      const next = (() => {
        switch (e.key) {
          case "ArrowRight":
          case "ArrowDown":
          case "PageDown":
          case " ":
            return index + 1;
          case "ArrowLeft":
          case "ArrowUp":
          case "PageUp":
            return index - 1;
          case "Home":
            return 0;
          case "End":
            return sections.length - 1;
          default:
            return null;
        }
      })();
      if (next === null) return;
      e.preventDefault();
      setIndex(Math.max(0, Math.min(sections.length - 1, next)));
    };
    window.addEventListener("keydown", onKey);
    // Focus the close button so Escape works even without a click target.
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, onClose, sections.length]);

  // Restore the deck's scroll position when the overlay closes.
  useEffect(() => {
    if (open) return;
    if (savedScroll.current) window.scrollTo({ top: savedScroll.current });
  }, [open]);

  const go = useCallback(
    (i: number) => setIndex(Math.max(0, Math.min(sections.length - 1, i))),
    [sections.length]
  );

  const current = sections[index];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex flex-col bg-paper"
          role="dialog"
          aria-modal="true"
          data-present="open"
          aria-label={`${title} — present mode`}
        >
      {/* Top bar: deck title, progress, close */}
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-rule px-5 py-3 md:px-8">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-xs font-bold uppercase tracking-[0.16em] text-red">
            {title}
          </span>
          <span className="font-mono text-[11px] text-muted">
            {index + 1} / {sections.length}
          </span>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Exit present mode"
          className="group inline-flex items-center gap-2 border border-rule px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:border-red hover:text-red"
        >
          Close
          <span aria-hidden="true" className="transition-transform group-hover:rotate-90">
            ✕
          </span>
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-[2px] shrink-0 bg-rule/40">
        <motion.div
          className="h-full origin-left bg-red"
          animate={{ scaleX: sections.length ? (index + 1) / sections.length : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* The single visible section */}
      <div className="relative flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="min-h-full"
          >
            {/* The live section is moved into the overlay for the duration of
                the presentation, so it renders exactly as it does in the
                deck. On close it is put back where it came from. */}
            <SectionSlot section={current} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <div className="flex shrink-0 items-center justify-between gap-4 border-t border-rule px-5 py-3 md:px-8">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="inline-flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:text-red disabled:cursor-not-allowed disabled:opacity-30"
        >
          <span aria-hidden="true">←</span> Previous
        </button>

        {/* Section dots */}
        <div className="flex items-center gap-1.5">
          {sections.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to section ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 transition-all ${
                i === index ? "w-6 bg-red" : "w-1.5 bg-rule hover:bg-ink/40"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === sections.length - 1}
          className="inline-flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:text-red disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * SectionSlot — renders one section inside the present overlay.
 *
 * The section element is re-parented into this slot so the browser keeps
 * one instance of the content (and its videos/charts keep playing). When
 * the overlay closes the element is returned to its original parent and
 * original DOM position.
 */
function SectionSlot({ section }: { section?: HTMLElement }) {
  const slot = useRef<HTMLDivElement>(null);
  const origin = useRef<{ parent: Node; next: Node | null } | null>(null);
  useEffect(() => {
    const el = section;
    const target = slot.current;
    if (!el || !target) return;

    // Remember where the section came from so it can go back.
    if (!origin.current && el.parentNode) {
      origin.current = { parent: el.parentNode, next: el.nextSibling };
    }
    target.appendChild(el);
    el.classList.add("present-mode-section");

    return () => {
      el.classList.remove("present-mode-section");
      const o = origin.current;
      if (o && o.parent) o.parent.insertBefore(el, o.next);
    };
  }, [section]);

  return <div ref={slot} className="present-mode-slot" />;
}
