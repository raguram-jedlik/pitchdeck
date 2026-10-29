"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

/**
 * DeckShell — wraps a deck's content and enforces one-section-at-a-time
 * scrolling.
 *
 * Two modes, driven by `fitToViewport`.
 *
 * Fit mode — used by the brief deck ("/") only
 * ------------------------------------------------
 * In fit mode every top-level section becomes exactly one viewport tall
 * (`100dvh`) and its content is scaled down until the whole of it fits on
 * screen. The reader therefore never has to scroll a second time to
 * finish reading a section.
 *
 * The fit is applied in place, imperatively, rather than by re-rendering
 * the tree. That keeps the DOM shape stable: the `<section>` elements
 * stay direct children of `.deck-shell` (so the `.deck-shell > section`
 * CSS selectors keep working) and ProductReveal's three sibling sections
 * stay three separate pages.
 *
 * Per section the DOM becomes:
 *
 *   <section class="deck-snap-target snap-fit-section">   100dvh, clipped
 *     <div class="snap-fit-frame">                         the height budget
 *       <div class="snap-fit-inner">                       scale: S
 *         …the section's original content child…
 *
 * The original content child is MOVED into the frame (it keeps its own
 * classes, so nothing about its styling changes) and the frame is given
 * a definite height of 100%. The scale is applied with the `scale`
 * property rather than `transform: scale()`, because `scale` does not
 * affect layout: the section still occupies exactly one viewport, so the
 * scroll maths stays simple.
 *
 * Normal mode — the detailed deck ("/detail")
 * --------------------------------------------
 * The detailed deck is a long-form document. Its sections are not forced
 * to one screen each; instead a section only becomes a snap target while
 * it is close to one viewport tall, so the long data tables stay fully
 * readable and the reader is never trapped in a section that cannot fit
 * on the screen.
 */
interface DeckShellProps {
  /** The deck's content — sections and everything between them. */
  children: React.ReactNode;
  /** Deck title. */
  title: string;
  /** CSS selector that identifies the deck's top-level sections. */
  sectionSelector?: string;
  /**
   * Scale each section down so it fits exactly one viewport.
   */
  fitToViewport?: boolean;
  /**
   * Selector for elements outside the section list that should also be
   * fitted to one viewport — the brief deck's footer, which sits after
   * the deck and would otherwise be unreachable under the document's
   * mandatory document-level snapping.
   */
  extraFitSelector?: string;
}

/** The smallest scale we will apply before content becomes unreadable. */
const MIN_SCALE = 0.55;

/** Sections we fit are exactly one screen tall; that is the whole point. */
const FIT_SECTION_CLASS = "snap-fit-section";
const FRAME_CLASS = "snap-fit-frame";
const INNER_CLASS = "snap-fit-inner";

/**
 * Find the element that holds a section's content — the in-flow child.
 * Absolutely positioned children (the hero's background videos and its
 * gradient overlay) fill the section on their own and must not be
 * scaled, so they are skipped.
 */
function findContentChild(section: HTMLElement): HTMLElement | null {
  /*
   * If this section has already been fitted, the content we want is the
   * existing `.snap-fit-inner`. Returning it here (rather than the frame
   * that wraps it) is what makes `fitSection` idempotent: re-running it
   * will not wrap the inner in a second frame.
   */
  const existing = section.querySelector(
    `:scope > .${FRAME_CLASS} > .${INNER_CLASS}`
  );
  if (existing) return existing as HTMLElement;

  const inFlow = Array.from(section.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement
  ).filter((child) => {
    const position = window.getComputedStyle(child).position;
    return position !== "absolute" && position !== "fixed";
  });

  return inFlow.length ? inFlow[0] : null;
}

/**
 * Fit one section to the viewport.
 *
 * Returns a teardown that stops the observers but leaves the DOM in its
 * fitted shape.
 */
function fitSection(section: HTMLElement): () => void {
  const content = findContentChild(section);
  if (!content) return () => {};

  /*
   * The frame is the height budget. It is created once and reused, so
   * re-running the fit (on resize, or when the section is re-collected)
   * does not stack frames.
   */
  let frame = section.querySelector(
    `:scope > .${FRAME_CLASS}`
  ) as HTMLElement | null;
  if (!frame) {
    frame = document.createElement("div");
    frame.className = FRAME_CLASS;
    section.appendChild(frame);
  }

  const alreadyFitted = content.classList.contains(INNER_CLASS);
  const inner = content;

  if (alreadyFitted) {
    /*
     * Already fitted: make sure the inner sits inside the frame. If it
     * has been moved elsewhere (React re-rendered the section) we put it
     * back, but never if that would create a cycle.
     */
    if (inner.parentElement !== frame) {
      if (frame.contains(inner) || frame === inner) return () => {};
      frame.appendChild(inner);
    }
  } else {
    frame.appendChild(inner);
    inner.classList.add(INNER_CLASS);
  }

  section.classList.add(FIT_SECTION_CLASS);

  /*
   * Sections may have more than one in-flow child. Anything that is not
   * the scaled inner (i.e. a second content block) is moved into the
   * inner as well, so the whole block is scaled as one unit.
   */
  const extraChildren = Array.from(frame.children).filter(
    (child) => child !== inner
  );
  extraChildren.forEach((child) => {
    // Never move a node into its own descendant — that is a cycle.
    if (child.contains(inner)) return;
    inner.appendChild(child);
  });

  let frame_ = 0;
  let observer: ResizeObserver | null = null;

  const measure = () => {
    /*
     * The frame's own client height is the budget. It is `height: 100%`
     * of the section's content box, so it already excludes the section's
     * padding and the header clearance.
     */
    const available = frame!.clientHeight;
    if (!available) return;

    /*
     * The content's natural height. `scale` is a paint-time transform
     * and does not change layout, so scrollHeight stays the unscaled
     * height — but we reset the scale to 1 first so a stale scale can
     * never leak into the measurement.
     */
    inner.style.scale = "1";
    const natural = inner.scrollHeight;
    if (!natural) return;

    let next = 1;
    if (natural > available) {
      next = available / natural;
      // Never shrink past the legibility floor.
      next = Math.max(MIN_SCALE, next);
    }

    inner.style.scale = String(next);
    section.style.setProperty("--snap-fit-scale", String(next));

    /*
     * When the content is still taller than the frame at the legibility
     * floor, scaling alone cannot save it: the floor is there to keep
     * the type readable, so we refuse to go below it. Without this
     * check the overflow is simply clipped by `overflow: hidden` and
     * the reader loses the bottom of the section — on a 320px phone
     * the team photos and the market map were cut off entirely.
     *
     * In that case we release the clip on that section only and let it
     * scroll, so the content stays reachable. The other sections keep
     * the clipped, one-screen-per-section behaviour.
     */
    const stillOverflows = natural * next > available + 1;
    section.classList.toggle("snap-fit-overflows", stillOverflows);
  };

  const schedule = () => {
    cancelAnimationFrame(frame_);
    frame_ = requestAnimationFrame(measure);
  };

  measure();
  // A second pass after layout settles (fonts, images, framer-motion).
  const t = setTimeout(schedule, 120);

  observer = new ResizeObserver(schedule);
  observer.observe(inner);
  observer.observe(frame!);
  window.addEventListener("resize", schedule);
  if (document.fonts?.ready) {
    document.fonts.ready.then(schedule).catch(() => {});
  }

  return () => {
    cancelAnimationFrame(frame_);
    clearTimeout(t);
    observer?.disconnect();
    window.removeEventListener("resize", schedule);
  };
}

export default function DeckShell({
  children,
  sectionSelector = "main > section",
  fitToViewport = false,
  extraFitSelector,
}: DeckShellProps) {
  const [sections, setSections] = useState<HTMLElement[]>([]);
  const shellRef = useRef<HTMLDivElement>(null);

  /**
   * Collect the deck's top-level sections once the DOM is ready.
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
   * Fit mode: every top-level section becomes exactly one viewport tall
   * and its content is scaled to fit. Every section is a snap target,
   * because after fitting they all fit by construction.
   */
  useEffect(() => {
    if (!fitToViewport || !sections.length) return;

    const teardowns = sections.map((el) => fitSection(el));

    /*
     * The footer is outside `.deck-shell`, so it is not in the section
     * list. It is fitted separately and gets its own snap point, which
     * is what makes it reachable under the document's mandatory
     * document-level snapping.
     */
    let extraTeardown: (() => void) | null = null;
    if (extraFitSelector) {
      const extras = Array.from(
        document.querySelectorAll<HTMLElement>(extraFitSelector)
      );
      extraTeardown = () => {
        extras.forEach((el) => fitSection(el));
      };
      extras.forEach((el) => {
        fitSection(el);
        el.classList.add("deck-snap-target");
      });
    }

    sections.forEach((el) => el.classList.add("deck-snap-target"));

    return () => {
      teardowns.forEach((fn) => fn());
      extraTeardown?.();
    };
  }, [fitToViewport, sections, extraFitSelector]);

  /**
   * Normal mode: a section only becomes a snap target when it is
   * roughly one viewport tall. Longer sections stay out of the snapping
   * so the reader can scroll freely through them.
   */
  useEffect(() => {
    if (fitToViewport || !sections.length) return;
    const update = () => {
      sections.forEach((el) => {
        const fits = el.offsetHeight <= 1.05 * window.innerHeight;
        el.classList.toggle("deck-snap-target", fits);
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [fitToViewport, sections]);

  return (
    <div ref={shellRef} className="deck-shell relative">
      {children}
    </div>
  );
}
