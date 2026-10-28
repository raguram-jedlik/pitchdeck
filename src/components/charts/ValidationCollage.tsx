"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { ValidationTile } from "@/data/detailData";

/**
 * ValidationCollage — the collage of real reactions that sits under
 * "Validation".
 *
 * Every tile is a screenshot, so the collage is built from actual captured
 * evidence rather than written copy. The screenshots come in very different
 * shapes — some are long and thin (a single LinkedIn line), others are nearly
 * square (a thread of replies) — so a normal grid leaves large holes whenever
 * a tall image shares a row with a short one.
 *
 * CSS columns would fix the holes, but they fill strictly top-to-bottom in
 * each column, which starves the last column and leaves a ragged bottom
 * edge. Instead this component lays the wall out itself:
 *
 *   1. Every tile's height is known ahead of time from its aspect ratio, so
 *      nothing has to be measured on screen and the layout never jumps.
 *   2. Each tile is placed into whichever column is currently shortest
 *      (the classic greedy masonry balance).
 *   3. The order is re-shuffled so that each column starts on a different
 *      row, which keeps the collage from reading as four vertical stripes.
 *
 * The result is a wall whose columns end at nearly the same height, with no
 * dead space and no orphaned email screenshots floating below.
 *
 * The email screenshots are published with the sender's address already
 * blurred at the image level, so nothing in this component needs to know
 * about redaction.
 */

const RED = "#C8023B";

/** Gap between tiles, in px. */
const GAP = 12;

/** Height of the red hover hairline reserved at the top of each tile. */
const HAIRLINE = 3;

/**
 * Number of masonry columns at each breakpoint. The component measures the
 * container so it can rebalance on resize.
 */
const COLUMN_COUNTS: { minWidth: number; columns: number }[] = [
  { minWidth: 1024, columns: 4 },
  { minWidth: 640, columns: 3 },
  { minWidth: 0, columns: 2 },
];

function columnsFor(width: number): number {
  for (const c of COLUMN_COUNTS) {
    if (width >= c.minWidth) return c.columns;
  }
  return 2;
}

/**
 * Spread the tiles across columns so every column ends at roughly the same
 * height. Greedy shortest-column placement, but the starting column is
 * rotated per tile so tall and short tiles interleave instead of stacking
 * into predictable stripes.
 */
function balance(
  tiles: ValidationTile[],
  columns: number,
  containerWidth: number
): ValidationTile[][] {
  const colWidth = (containerWidth - GAP * (columns - 1)) / columns;
  const heights = new Array(columns).fill(0) as number[];
  const result: ValidationTile[][] = Array.from(
    { length: columns },
    () => []
  );

  tiles.forEach((tile, i) => {
    // Rotate the starting point so successive tiles do not all compete for
    // the same column and end up forming visible vertical runs.
    const start = i % columns;
    let best = start;
    for (let k = 0; k < columns; k++) {
      const idx = (start + k) % columns;
      if (heights[idx] < heights[best]) best = idx;
    }
    result[best].push(tile);
    // Height the tile will occupy: image height at this column width, plus
    // the hairline and the gap beneath it.
    heights[best] += colWidth / tile.ratio + HAIRLINE + GAP;
  });

  return result;
}

export default function ValidationCollage({
  tiles,
}: {
  tiles: ValidationTile[];
}) {
  const [containerWidth, setContainerWidth] = useState(0);

  // Measure the container so the wall can be balanced against the real
  // column width rather than a guess.
  useEffect(() => {
    const el = document.getElementById("validation-collage");
    if (!el) return;

    const measure = () => setContainerWidth(el.clientWidth);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const columns = columnsFor(containerWidth);
  const laidOut =
    containerWidth > 0 ? balance(tiles, columns, containerWidth) : [];

  return (
    <div id="validation-collage" className="w-full">
      {containerWidth > 0 && (
        <div className="flex items-start" style={{ gap: GAP }}>
          {laidOut.map((col, ci) => (
            <div
              key={ci}
              className="flex min-w-0 flex-1 flex-col"
              style={{ gap: GAP }}
            >
              {col.map((tile, i) => (
                <motion.figure
                  key={tile.src}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.4,
                    delay: ((ci + i) % 4) * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative overflow-hidden border border-rule bg-white"
                >
                  {/* Red hairline that fills on hover. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    style={{ background: RED }}
                  />
                  {/* The intrinsic ratio reserves the exact box before the
                      image loads, so the wall never reflows. The box is
                      sized with aspect-ratio rather than width/height
                      attributes, because those attributes together with a
                      full-width image collapse the height and knock the
                      image out of the column. */}
                  <div
                    style={{ aspectRatio: `${tile.ratio}` }}
                    className="w-full overflow-hidden"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tile.src}
                      alt={tile.alt}
                      loading="lazy"
                      decoding="async"
                      className="block h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                    />
                  </div>
                </motion.figure>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
