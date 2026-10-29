"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useFitScale — measure a container and its content, and work out the
 * scale factor that makes the content fit the container's height.
 *
 * The brief deck ("/" page) must scroll as exactly one page per stop:
 * every top-level section fills exactly one screen, and a section whose
 * content is taller than the screen is scaled down until the whole of it
 * is visible at once. No inner scrolling, no second scroll to finish
 * reading.
 *
 * The scale is applied with the standalone CSS `scale` property rather
 * than `transform: scale()`. That matters: framer-motion writes a
 * `transform` matrix onto some of the content children (the ProductReveal
 * video stage, for one), and the standalone `scale` property composes
 * with `transform` instead of overwriting it. `transform-origin: top
 * center` keeps the shrunken content centred horizontally and aligned to
 * the top of its frame.
 *
 * The hook returns:
 *   - `containerRef` — the element whose height is the budget
 *   - `contentRef`   — the element that gets scaled
 *   - `scale`        — the current factor (1 means "fits already")
 *   - `recompute`    — force a re-measure
 *
 * It re-measures on window resize and whenever the content's own size
 * changes (ResizeObserver), so late-loading images, fonts and
 * framer-motion reveals all settle into the right scale.
 */

/** The smallest scale we are willing to apply before content gets unreadable. */
export const MIN_SCALE = 0.55;

export interface FitScaleState<
  TContainer extends HTMLElement = HTMLDivElement,
  TContent extends HTMLElement = HTMLDivElement
> {
  /** The element that provides the available height (e.g. the frame). */
  containerRef: React.RefObject<TContainer>;
  /** The element that gets scaled down to fit. */
  contentRef: React.RefObject<TContent>;
  /** Current scale factor. 1 = the content already fits. */
  scale: number;
  /** Re-measure now. */
  recompute: () => void;
}

/**
 * Work out the scale needed to fit `contentHeight` into `availableHeight`.
 * Never returns 0 or a negative number, and never scales up.
 */
export function computeFitScale(
  availableHeight: number,
  contentHeight: number,
  minScale: number = MIN_SCALE
): number {
  if (!contentHeight || contentHeight <= 0) return 1;
  if (!availableHeight || availableHeight <= 0) return 1;
  const raw = availableHeight / contentHeight;
  if (!Number.isFinite(raw) || raw <= 0) return 1;
  if (raw >= 1) return 1;
  // Never shrink past the legibility floor.
  return Math.max(minScale, raw);
}

export default function useFitScale<
  TContainer extends HTMLElement = HTMLDivElement,
  TContent extends HTMLElement = HTMLDivElement
>(minScale: number = MIN_SCALE): FitScaleState<TContainer, TContent> {
  const containerRef = useRef<TContainer>(null);
  const contentRef = useRef<TContent>(null);
  const [scale, setScale] = useState(1);

  const recompute = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const available = container.clientHeight;
    if (!available) return;

    // The content's own layout height, unscaled. `scale` does not change
    // layout, so this stays correct while the scale is applied.
    const contentHeight = content.scrollHeight;
    if (!contentHeight) return;

    const next = computeFitScale(available, contentHeight, minScale);
    setScale((prev) => (Math.abs(prev - next) > 0.001 ? next : prev));
  }, [minScale]);

  useEffect(() => {
    recompute();

    const content = contentRef.current;
    const container = containerRef.current;
    if (!content || !container) return;

    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(recompute);
    };

    const ro = new ResizeObserver(schedule);
    ro.observe(content);
    ro.observe(container);

    window.addEventListener("resize", schedule);
    // Web fonts land after first paint and change the content height.
    if (document.fonts?.ready) {
      document.fonts.ready.then(schedule).catch(() => {});
    }

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [recompute]);

  return { containerRef, contentRef, scale, recompute };
}
