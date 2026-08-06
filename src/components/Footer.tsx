"use client";

import { motion } from "framer-motion";
import {
  supportedBy,
  buildPhotos,
  supportersImage,
  contactInfo,
  close,
  brand,
} from "@/data/jedlikData";

/**
 * Close — black background, single red line, contact list, build photos,
 * supporter strip. No glow, no glass, no Lucide icons. The red wordmark
 * is the only colour on the page.
 */
export default function Footer() {
  return (
    <footer className="relative bg-ink px-6 py-20 text-paper md:px-10 md:py-32">
      <div className="mx-auto max-w-deck">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="display-lg max-w-[18ch] text-paper"
        >
          {close.thanks}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="display-lg mt-3 max-w-[22ch] text-paper"
        >
          {close.lead}{" "}
          <span className="text-red">{close.accent}</span> {close.tail}
        </motion.p>

        {/* Contact */}
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid grid-cols-1 gap-3 border-t border-paper/15 pt-8 text-sm md:text-base"
        >
          <li className="flex items-baseline gap-6">
            <span className="w-24 shrink-0 font-display text-xs font-semibold uppercase tracking-[0.16em] text-paper/60">
              Web
            </span>
            <a
              href={contactInfo.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="text-paper underline-offset-4 hover:underline"
            >
              {contactInfo.website}
            </a>
          </li>
          <li className="flex items-baseline gap-6">
            <span className="w-24 shrink-0 font-display text-xs font-semibold uppercase tracking-[0.16em] text-paper/60">
              Email
            </span>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-paper underline-offset-4 hover:underline"
            >
              {contactInfo.email}
            </a>
          </li>
          <li className="flex items-baseline gap-6">
            <span className="w-24 shrink-0 font-display text-xs font-semibold uppercase tracking-[0.16em] text-paper/60">
              Phone
            </span>
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
              className="text-paper underline-offset-4 hover:underline"
            >
              {contactInfo.phone}
            </a>
          </li>
          <li className="flex items-baseline gap-6">
            <span className="w-24 shrink-0 font-display text-xs font-semibold uppercase tracking-[0.16em] text-paper/60">
              Instagram
            </span>
            <a
              href={`https://${contactInfo.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="text-paper underline-offset-4 hover:underline"
            >
              {contactInfo.instagram}
            </a>
          </li>
        </motion.ul>

        {/* Build photos */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <p className="eyebrow text-paper/60">Building the E-POD</p>
          <div className="mt-4 grid grid-cols-3 gap-px bg-paper/10 sm:grid-cols-7">
            {buildPhotos.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`Building the E-POD prototype, ${i + 1} of ${buildPhotos.length}`}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
            ))}
          </div>
        </motion.div>

        {/* Supporters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <p className="eyebrow text-paper/60">Supported by</p>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-sm text-paper/80 md:text-base">
            {supportedBy.map((s) => (
              <li
                key={s}
                className="font-display text-xs font-semibold uppercase tracking-[0.16em]"
              >
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-6 inline-block bg-paper p-3">
            <img
              src={supportersImage}
              alt="Supporter logos: Anna Incubator, Startup India DPIIT, Startup TN, MAARG, NIDHI PRAYAS"
              loading="lazy"
              className="h-10 w-auto md:h-12"
            />
          </div>
        </motion.div>

        {/* Colophon */}
        <p className="mt-16 border-t border-paper/15 pt-6 text-xs text-paper/50 md:text-sm">
          {brand.name} Private Limited · {brand.year} · Figures are
          forward-looking projections, not commitments.
        </p>
      </div>
    </footer>
  );
}