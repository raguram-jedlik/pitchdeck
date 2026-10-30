"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { ValidationTile } from "@/data/detailData";

/**
 * ValidationCollage — the stack of real reactions that sits under
 * "Validation".
 *
 * Every tile is a screenshot, so the collage is built from actual captured
 * evidence rather than written copy.
 *
 * The tiles are stacked one per full-width row rather than packed into a
 * multi-column masonry. A masonry column shrinks each screenshot to a
 * fraction of its width, which reduces the comment text inside it to a
 * few pixels tall and makes it unreadable. At full width every comment is
 * legible, and because each screenshot keeps its own aspect ratio the box
 * is exactly as tall as the picture needs — so nothing is cropped and
 * every photo is visible.
 *
 * Each tile's height is known ahead of time from its aspect ratio, so
 * nothing has to be measured on screen and the layout never jumps.
 *
 * The email screenshots are published with the sender's address already
 * blurred at the image level, so nothing in this component needs to know
 * about redaction.
 */

const RED = "#C8023B";

/** Gap between tiles, in px. */
const GAP = 12;

export default function ValidationCollage({
  tiles,
}: {
  tiles: ValidationTile[];
}) {
  const [containerWidth, setContainerWidth] = useState(0);

  // Measure the container so the stack can be laid out against the real
  // width rather than a guess.
  useEffect(() => {
    const el = document.getElementById("validation-collage");
    if (!el) return;

    const measure = () => setContainerWidth(el.clientWidth);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div id="validation-collage" className="w-full">
      {containerWidth > 0 && (
        <div className="flex flex-col" style={{ gap: GAP }}>
          {/* Every tile sits on its own full-width row. The screenshot
              keeps its own aspect ratio, so the box is exactly as tall as
              the picture needs and the comment text stays at full size
              instead of being shrunk into a narrow column. */}
          {tiles.map((tile, i) => (
            <motion.figure
              key={tile.src}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.4,
                delay: (i % 4) * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative overflow-hidden border border-rule bg-paper-2"
            >
              {/* Red hairline that fills on hover. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                style={{ background: RED }}
              />
              {/* The intrinsic ratio reserves the exact box before the
                  image loads, so the stack never reflows. The box is sized
                  with aspect-ratio rather than width/height attributes,
                  because those attributes together with a full-width image
                  collapse the height and knock the image out of the row. */}
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
                  className="block h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.015]"
                />
              </div>
            </motion.figure>
          ))}
        </div>
      )}
    </div>
  );
}
