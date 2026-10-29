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

/**
 * The smallest scale we will apply before content becomes unreadable.
 *
 * This floor has been raised twice:
 *
 * - 0.55 was far too aggressive. On the laptop viewport it shrank the
 *   team grid and the market numbers until the type was visibly small —
 *   the "letters are too small" complaint.
 * - 0.72 was still not enough. The deck's smallest type is 8-12px
 *   (section eyebrows, chart labels, stat captions), and at 0.72 a
 *   12px eyebrow rendered at 8.6px, which is below comfortable reading
 *   size even on a phone.
 *
 * 0.85 keeps the deck's body copy (14-16px) comfortably readable at
 * every viewport. Labels smaller than that are handled at the source —
 * the eyebrow and caption classes were raised so the smallest type in
 * the deck is 12px, which at the 0.85 floor still renders at 10.2px.
 *
 * The consequence of hitting the floor is handled by tightening the
 * section's vertical rhythm, NOT by letting the reader scroll inside a
 * section — see `fitSection` for why an inner scroller is a trap.
 */
const MIN_SCALE = 0.85;

/** Sections we fit are exactly one screen tall; that is the whole point. */
const FIT_SECTION_CLASS = "snap-fit-section";
const FRAME_CLASS = "snap-fit-frame";
const INNER_CLASS = "snap-fit-inner";

/**
 * Find the elements that hold a section's content — its in-flow children.
 *
 * Absolutely positioned children (the hero's background videos and its
 * gradient overlay) fill the section on their own and must not be
 * scaled, so they are skipped.
 *
 * A section can have SEVERAL in-flow children. `ProductReveal`, for
 * example, renders its tease slide as two sibling divs — a heading block
 * and a text block. Only the first one used to be picked up as the
 * content, and the other was left behind in the section, outside the
 * frame. The section then reported a scroll height larger than its
 * client height and the tail of the text was clipped away.
 *
 * So we return ALL of them, in document order. `fitSection` moves the
 * first into the frame as the inner and moves the rest in after it, so
 * the whole slide is scaled as one unit.
 */
function findContentChildren(section: HTMLElement): HTMLElement[] {
  /*
   * If this section has already been fitted, the content we want is the
   * existing `.snap-fit-inner`. Returning it here (rather than the frame
   * that wraps it) is what makes `fitSection` idempotent: re-running it
   * will not wrap the inner in a second frame.
   */
  const existing = section.querySelector(
    `:scope > .${FRAME_CLASS} > .${INNER_CLASS}`
  );
  if (existing) return [existing as HTMLElement];

  return Array.from(section.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement
  ).filter((child) => {
    const position = window.getComputedStyle(child).position;
    return position !== "absolute" && position !== "fixed";
  });
}

/**
 * Fit one section to the viewport.
 *
 * Returns a teardown that stops the observers but leaves the DOM in its
 * fitted shape.
 */
function fitSection(section: HTMLElement): () => void {
  const contents = findContentChildren(section);
  if (!contents.length) return () => {};

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

  const alreadyFitted = contents[0].classList.contains(INNER_CLASS);
  const inner = contents[0];

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
   *
   * Both the section's own children and the frame's children are
   * collected. The section's extras matter: a slide whose content is
   * spread over two sibling divs used to leave the second one outside
   * the frame, where it was neither scaled nor counted in the fit — the
   * text simply ran off the bottom of the screen.
   *
   * `contents` already holds every in-flow child of the section in
   * document order. `contents[0]` is the inner; the rest are the
   * extras. The frame is skipped, and so is anything that would create
   * a cycle by being an ancestor of the inner.
   */
  const extraChildren = [
    ...contents.slice(1),
    ...Array.from(frame.children).filter((child) => child !== inner),
  ];
  extraChildren.forEach((child) => {
    if (child === frame) return;
    // Never move a node into its own descendant — that is a cycle.
    if (child.contains(inner)) return;
    if (child === inner) return;
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
     * the type readable, so we refuse to go below it.
     *
     * The old behaviour here was to release the clip on the section and
     * let it scroll internally (`overflow-y: auto`). That was a trap:
     * once the pointer was over such a section, the wheel scrolled
     * INSIDE it instead of moving to the next section, so the deck
     * appeared to freeze — "it gets stucked after section 2". The reader
     * had to hunt with the mouse to escape.
     *
     * Now, instead of an inner scroller, we compress the section's own
     * vertical rhythm so the content genuinely fits. `snap-fit-dense`
     * tightens the gaps between the section's blocks, which is invisible
     * in most cases and keeps the one-section-per-stop promise intact.
     */
    const stillOverflows = natural * next > available + 1;
    const wasDense = section.classList.contains("snap-fit-dense");
    /*
     * Dense mode is sticky in one direction only.
     *
     * Turning it on is fine: the section only gets there because the
     * content did not fit. Turning it back off is the trap. The scale
     * for this pass was computed from the *compacted* height, so if the
     * class comes off, the content springs back to its full height and
     * the scale is suddenly wrong — the section overflows again, the
     * class comes back on, and the two states flip-flop on every
     * measurement.
     *
     * That oscillation is why the same section could measure as fitting
     * at one screen width and overflowing at the next, even though
     * nothing about the layout had changed.
     *
     * So: once a section has needed the compressed rhythm, it keeps it.
     * The compressed rhythm is visually almost identical — it just
     * closes up the gaps between blocks — and it keeps the fit stable.
     */
    const needsDense = stillOverflows || wasDense;
    section.classList.toggle("snap-fit-dense", needsDense);

    /*
     * Compressing the rhythm changes the content's height, so the scale
     * has to be recomputed against the new height. Without this the
     * section would keep the scale it was given before the compression
     * and could still overflow.
     *
     * The re-measure is scheduled rather than run inline, because the
     * class change has not been laid out yet at this point.
     */
    if (wasDense !== needsDense) {
      schedule();
    }
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
