"use client";

import { motion } from "framer-motion";
import type { ValidationTile } from "@/data/detailData";

/**
 * ValidationCollage — the wall of real reactions under "Validation".
 *
 * Every tile is a screenshot, so the collage is built from actual captured
 * evidence rather than written copy.
 *
 * The screenshots are packed into a masonry collage (CSS multi-column) so
 * all sixteen read as one wall of social proof at a glance, instead of a
 * very tall one-per-row stack. Each screenshot keeps its own aspect ratio:
 * the box is reserved from that ratio before the image loads, so the
 * collage never reflows and nothing is cropped. Because the tiles vary in
 * height, the columns pack tightly and land at roughly the same height —
 * the collage look — while every screenshot stays at a readable size.
 *
 * The column count steps up with the viewport (2 → 3 → 4) so the wall stays
 * dense on a laptop but never turns the comment text into a thin strip.
 *
 * The email screenshots are published with the sender's address already
 * blurred at the image level, so nothing in this component needs to know
 * about redaction.
 */

const RED = "#C8023B";

/** Gap between tiles, in px. Drives both the column gap and the row gap. */
const GAP = 10;

export default function ValidationCollage({
  tiles,
}: {
  tiles: ValidationTile[];
}) {
  return (
    <div
      id="validation-collage"
      className="w-full columns-2 md:columns-3 lg:columns-4"
      style={{
        // CSS multi-column masonry: tiles of differing heights flow down one
        // column then into the next, packing into a tight collage. The column
        // count is set by the responsive `columns-*` utility on this element.
        columnGap: GAP,
      }}
    >
      {tiles.map((tile, i) => (
        <motion.figure
          key={tile.src}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{
            duration: 0.4,
            delay: (i % 4) * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
          // `break-inside-avoid` keeps a tile from being split across two
          // columns; the bottom margin is the row gap inside a column.
          className="group relative mb-[10px] overflow-hidden border border-rule bg-paper-2 break-inside-avoid"
        >
          {/* Red hairline that fills on hover. */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
            style={{ background: RED }}
          />
          {/* The intrinsic ratio reserves the exact box before the image
              loads, so the collage never reflows. The box is sized with
              aspect-ratio rather than width/height attributes, because
              those together with a full-width image collapse the height.
              object-cover fills the tile with no letterboxing, and because
              the box matches the screenshot's own ratio nothing is cropped. */}
          <div
            style={{ aspectRatio: `${tile.ratio}` }}
            className="w-full overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tile.src}
              alt={tile.alt}
              loading="eager"
              decoding="async"
              className="block h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </motion.figure>
      ))}
    </div>
  );
}
