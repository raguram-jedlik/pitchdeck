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
 * Close — black background, single red line, contact list, marquee build
 * photos (auto-scroll, no touch), supporter strip with a dedicated black
 * Anna Incubator mark. The red wordmark is the only colour on the page.
 */
export default function Footer() {
  // Duplicate the build photos so the marquee loops seamlessly.
  const marquee = [...buildPhotos, ...buildPhotos];

  return (
    <footer className="relative bg-ink px-6 py-16 text-paper md:px-10 md:py-24">
      <div className="mx-auto max-w-deck">
        {/* Jedlik logo lockup */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-lockup.svg"
            alt={`${brand.name} — ${brand.tagline}`}
            className="h-14 w-auto invert"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="display-lg mt-12 max-w-[18ch] text-paper"
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
          className="mt-12 grid grid-cols-1 gap-3 border-t border-paper/15 pt-6 text-sm md:text-base"
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

        {/* Build photos — auto-marquee, no touch interaction. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <p className="eyebrow text-paper/60">Building the E-POD</p>
          <div className="relative mt-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="flex w-max animate-marquee gap-2 motion-reduce:animate-none">
              {marquee.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={`${src}-${i}`}
                  src={src}
                  alt=""
                  aria-hidden={i >= buildPhotos.length}
                  loading="lazy"
                  className="h-32 w-32 shrink-0 object-cover md:h-40 md:w-40"
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Supporters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
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
          <div className="mt-6 flex flex-wrap items-center gap-6">
            {/* Dedicated black Anna Incubator logo for the white-bg supporter strip */}
            <div className="inline-block bg-paper p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/anna-incubator.svg"
                alt="Anna Incubator"
                loading="lazy"
                className="h-10 w-auto md:h-12"
              />
            </div>
            {/* Other supporters from the original strip */}
            <div className="inline-block bg-paper p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={supportersImage}
                alt="Startup India, DPIIT, MAARG, NIDHI PRAYAS, EDII-TN, Startup India Seed Fund Scheme"
                loading="lazy"
                className="h-10 w-auto md:h-12"
              />
            </div>
          </div>
        </motion.div>

        {/* Colophon */}
        <p className="mt-12 border-t border-paper/15 pt-5 text-xs text-paper/50 md:text-sm">
          {brand.name} Private Limited · {brand.year} · Figures are
          forward-looking projections, not commitments.
        </p>
      </div>
    </footer>
  );
}