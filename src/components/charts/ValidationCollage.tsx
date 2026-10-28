"use client";

import { motion } from "framer-motion";
import type { ValidationTile } from "@/data/detailData";

/**
 * ValidationCollage — the collage of real reactions that sits under
 * "Topic validation".
 *
 * Two groups: public social reactions and inbound email. Each tile is a
 * screenshot, so the collage is built from actual captured evidence rather
 * than written copy. Tiles reveal on scroll with a small stagger, and lift
 * on hover so the reader can pick one out of the wall.
 *
 * The email screenshots are published with the sender's address already
 * blurred at the image level, so nothing in this component needs to know
 * about redaction.
 */

const RED = "#C8023B";

function spanClass(tile: ValidationTile) {
  switch (tile.span) {
    case "wide":
      return "md:col-span-2";
    case "tall":
      return "md:row-span-2";
    case "full":
      return "md:col-span-3";
    default:
      return "";
  }
}

export default function ValidationCollage({
  tiles,
}: {
  tiles: ValidationTile[];
}) {
  const social = tiles.filter((t) => t.group === "social");
  const email = tiles.filter((t) => t.group === "email");

  return (
    <div className="space-y-12">
      {/* ---------- Public reactions ---------- */}
      <div>
        <div className="grid auto-rows-[minmax(0,auto)] grid-cols-1 gap-4 md:grid-cols-3">
          {social.map((tile, i) => (
            <motion.figure
              key={tile.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: (i % 3) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative flex flex-col overflow-hidden border border-rule bg-white ${spanClass(
                tile
              )}`}
            >
              {/* Red hairline that fills on hover. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-red transition-transform duration-300 group-hover:scale-x-100"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tile.src}
                alt={tile.alt}
                loading="lazy"
                className="w-full flex-1 object-contain transition-transform duration-300 group-hover:scale-[1.015]"
              />
            </motion.figure>
          ))}
        </div>
      </div>

      {/* ---------- Inbound email ---------- */}
      <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {email.map((tile, i) => (
            <motion.figure
              key={tile.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative overflow-hidden border border-rule bg-white"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                style={{ background: RED }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tile.src}
                alt={tile.alt}
                loading="lazy"
                className="w-full transition-transform duration-300 group-hover:scale-[1.01]"
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </div>
  );
}
