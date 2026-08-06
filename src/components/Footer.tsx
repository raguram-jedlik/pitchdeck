"use client";

import { motion } from "framer-motion";
import { supportedBy, contactInfo } from "@/data/jedlikData";
import { Mail, Globe, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 px-6 py-28 md:px-10">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-2xl font-bold text-glow-cyan text-slate-50 sm:text-3xl md:text-4xl"
        >
          THANK YOU. THE CITY WILL MOVE{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            DIFFERENTLY
          </span>{" "}
          FROM HERE.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {supportedBy.map((s) => (
            <span
              key={s}
              className="glass rounded-full px-4 py-2 text-xs uppercase tracking-wide text-slate-300"
            >
              {s}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 flex flex-col items-center gap-4 text-sm text-slate-400 sm:flex-row sm:justify-center sm:gap-8"
        >
          <a
            href={contactInfo.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition hover:text-cyan-400"
          >
            <Globe className="h-4 w-4" /> {contactInfo.website}
          </a>
          <a
            href={`mailto:${contactInfo.email}`}
            className="flex items-center gap-2 transition hover:text-cyan-400"
          >
            <Mail className="h-4 w-4" /> {contactInfo.email}
          </a>
          <span className="flex items-center gap-2">
            <Phone className="h-4 w-4" /> {contactInfo.phone}
          </span>
        </motion.div>

        <p className="mt-14 text-xs text-slate-600">
          &copy; {new Date().getFullYear()} Jedlik Motors &middot; {contactInfo.domain}
        </p>
      </div>
    </footer>
  );
}
