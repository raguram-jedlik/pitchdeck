"use client";

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
 * CSS columns solve this: each image keeps its own height and the browser
 * packs the next one into whichever column is shortest. The result is a tight
 * masonry wall that reads as one block of evidence instead of a ragged grid.
 * Tiles reveal on scroll with a small stagger and lift on hover.
 *
 * The email screenshots are published with the sender's address already
 * blurred at the image level, so nothing in this component needs to know
 * about redaction.
 */

const RED = "#C8023B";

export default function ValidationCollage({
  tiles,
}: {
  tiles: ValidationTile[];
}) {
  const social = tiles.filter((t) => t.group === "social");
  const email = tiles.filter((t) => t.group === "email");

  return (
    <div className="space-y-4">
      {/* ---------- Public reactions ---------- */}
      <div className="columns-2 gap-3 lg:columns-4">
        {social.map((tile, i) => (
          <motion.figure
            key={tile.src}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.45,
              delay: (i % 4) * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative mb-3 break-inside-avoid overflow-hidden border border-rule bg-white"
          >
            {/* Red hairline that fills on hover. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-red transition-transform duration-300 group-hover:scale-x-100"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tile.src}
              alt={tile.alt}
              loading="lazy"
              decoding="async"
              className="block w-full transition-transform duration-300 group-hover:scale-[1.015]"
            />
          </motion.figure>
        ))}
      </div>

      {/* ---------- Inbound email ---------- */}
      <div className="columns-1 gap-3 sm:columns-2 lg:columns-4">
        {email.map((tile, i) => (
          <motion.figure
            key={tile.src}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.45,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative mb-3 break-inside-avoid overflow-hidden border border-rule bg-white"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
              style={{ background: RED }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tile.src}
              alt={tile.alt}
              loading="lazy"
              decoding="async"
              className="block w-full transition-transform duration-300 group-hover:scale-[1.01]"
            />
          </motion.figure>
        ))}
      </div>
    </div>
  );
}
