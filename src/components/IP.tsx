"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const PATENT_PDF = "/assets/documents/ip-patent.pdf";

/**
 * Section 09 — Granted IP. The "thumbnail" is a live, non-interactive
 * render of the actual patent PDF (via <iframe>) rather than a static
 * screenshot, so it's always in sync with the source document. Clicking
 * it opens the same PDF full-size in a lightbox.
 */
export default function IP() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section className="relative bg-paper px-6 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-deck">
        <p className="eyebrow">Section 09 — The Moat</p>
        <h2 className="display-lg mt-4 max-w-[18ch] text-ink">
          Intellectual property
        </h2>
        <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-muted md:text-base">
          Our steer-by-wire e-POD architecture is protected by a granted
          patent, with a second filing already published. Tap the granted
          document below to read it in full.
        </p>

        <div className="mt-10 flex flex-wrap gap-6">
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            className="group relative block w-full max-w-[280px] cursor-pointer border border-rule bg-white text-left shadow-sm transition-shadow hover:shadow-md"
            aria-label="Open granted patent PDF"
          >
            <span className="absolute -top-3 left-4 z-10 inline-block bg-red px-2.5 py-1 font-display text-[0.65rem] font-bold uppercase tracking-[0.18em] text-paper shadow-sm">
              Granted
            </span>

            <div className="relative h-[360px] w-full overflow-hidden bg-white">
              {/* The thumbnail IS the PDF — an iframe render of page one,
                  scaled up and clipped so it reads clearly at card size. */}
              <iframe
                src={`${PATENT_PDF}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                title="Granted patent preview"
                className="pointer-events-none absolute left-1/2 top-0 h-[620px] w-[440px] -translate-x-1/2 origin-top scale-[0.65]"
                tabIndex={-1}
              />
              <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                <span className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.14em] text-paper">
                  View full patent
                </span>
              </div>
            </div>

            <div className="border-t border-rule px-4 py-3">
              <span className="font-display text-sm font-bold tracking-tight text-ink">
                Crab Walk Steering for Enclosed Two-Wheeler — Electrically
                Driven Pod (EPOD)
              </span>
              <span className="mt-0.5 block font-display text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
                Granted · Full document
              </span>
            </div>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative block w-full max-w-[280px] border border-rule bg-white text-left opacity-90 shadow-sm"
            aria-label="Patent coming soon"
          >
            <span className="absolute -top-3 left-4 z-10 inline-block bg-ink px-2.5 py-1 font-display text-[0.65rem] font-bold uppercase tracking-[0.18em] text-paper shadow-sm">
              Coming Soon
            </span>

            <div className="relative flex h-[360px] w-full items-center justify-center overflow-hidden bg-paper">
              <span className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Published · Pending grant
              </span>
            </div>

            <div className="border-t border-rule px-4 py-3">
              <span className="font-display text-sm font-bold tracking-tight text-ink">
                Modular Electro-Mechanical Docking System for Electrically
                Driven Enclosed Two-Wheeler Pod Vehicles
              </span>
              <span className="mt-0.5 block font-display text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
                Coming soon
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 md:p-10"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-full w-full max-w-3xl flex-col bg-paper shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-rule px-4 py-3">
                <span className="font-display text-sm font-bold tracking-tight text-ink">
                  Crab Walk Steering for Enclosed Two-Wheeler — Electrically Driven Pod (EPOD)
                </span>
                <div className="flex items-center gap-4">
                  <a
                    href={PATENT_PDF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-muted hover:text-ink"
                  >
                    Open in new tab
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="font-display text-xl leading-none text-ink hover:text-red"
                  >
                    &times;
                  </button>
                </div>
              </div>
              <iframe
                src={`${PATENT_PDF}#toolbar=1`}
                title="Granted patent"
                className="h-full w-full flex-1"
              />
            </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
