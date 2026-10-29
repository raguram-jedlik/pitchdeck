"use client";

import useFitScale from "@/hooks/useFitScale";

/**
 * SnapSection — a section that is exactly one viewport tall and never
 * overflows it.
 *
 * The section itself is `height: 100dvh` with `overflow: hidden`. Inside
 * it sits a frame whose height is set by CSS to the space the section has
 * left after its own padding, and inside that frame the content is
 * scaled down (with the standalone `scale` property, so it composes with
 * framer-motion's transforms) until it fits.
 *
 * This is the building block used by the brief deck, where every
 * top-level section must land on exactly one scroll stop.
 */
export default function SnapSection({
  children,
  className = "",
  innerClassName = "",
}: {
  children: React.ReactNode;
  /** Extra classes for the <section> element. */
  className?: string;
  /** Extra classes for the scaled content wrapper. */
  innerClassName?: string;
}) {
  const { containerRef, contentRef, scale } = useFitScale();

  return (
    <section
      ref={containerRef}
      className={`snap-fit-section ${className}`}
    >
      <div className="snap-fit-frame">
        <div
          ref={contentRef}
          className={`snap-fit-inner ${innerClassName}`}
          style={{ scale }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
