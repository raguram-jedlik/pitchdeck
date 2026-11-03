"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { mediaCoverage, type MediaCoverageItem } from "@/data/jedlikData";

/**
 * Section 11 — the press wall: every article, podcast and community feature
 * the e-POD has earned so far, carried over from the jedlik-tron-drive
 * website's Media Coverage page. Sits just before the closing verdict
 * section so the deck ends on proof, then the ask.
 */

function Tile({
  item,
  index,
}: {
  item: MediaCoverageItem;
  index: number;
}) {
  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group flex flex-col bg-paper-2 p-3"
    >
      <div className="flex h-20 w-full items-center justify-center overflow-hidden bg-paper">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className={
              item.fit === "contain"
                ? "max-h-[75%] max-w-[75%] object-contain transition-transform duration-500 group-hover:scale-105"
                : "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            }
          />
        ) : (
          <span className="font-display text-xl font-bold tracking-tight text-red">
            {item.outlet.split(" ")[0]}
          </span>
        )}
      </div>

      <p className="mt-2 font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-red">
        {item.outlet}
      </p>
      <p className="mt-1 line-clamp-3 text-xs leading-snug text-ink">
        {item.title}
      </p>

      <div className="mt-auto flex items-center justify-between pt-2">
        <span className="font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
          {item.kind === "podcast" ? "Podcast" : item.kind === "social" ? "Feature" : "Article"}
        </span>
        <ExternalLink className="h-3.5 w-3.5 text-muted transition-colors group-hover:text-red" />
      </div>
    </motion.a>
  );
}

export default function MediaCoverage() {
  return (
    <section className="relative px-6 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-deck">
        <p className="eyebrow">Section 11 — In The News</p>
        <h2 className="display-lg mt-3 max-w-[18ch] text-ink">
          The press noticed.
        </h2>
        <p className="mt-3 max-w-[52ch] text-base text-muted md:text-lg">
          Ten features, interviews and podcasts on the e-POD — from national EV
          press to Tamil startup media.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-px bg-rule sm:grid-cols-3 lg:grid-cols-5">
          {mediaCoverage.map((item, i) => (
            <Tile key={item.url} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
