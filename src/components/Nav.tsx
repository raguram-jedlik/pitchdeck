"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { brand } from "@/data/jedlikData";
import InvestButton from "@/components/InvestButton";

/**
 * Nav — the logo and the Invest CTA. The hero carries the full logo so the
 * brand mark isn't duplicated. A 2px red progress bar sits above.
 *
 * The header is fixed, so it stays pinned in the top-left corner even
 * once the dark footer (which has its own logo near its top) scrolls
 * into that same screen position. Hide the nav once the footer is in
 * view so the two logos never overlap — the footer carries its own
 * contact details, so the CTA is not needed there.
 */
export default function Nav() {
  const { scrollYProgress } = useScroll();
  const [overFooter, setOverFooter] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOverFooter(entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Land at the top of the deck on a fresh load.
  //
  // The browser restores the previous scroll position on reload, which
  // can leave a section's eyebrow tucked under the fixed header. Jump to
  // the top unless the URL carries an in-page anchor.
  useEffect(() => {
    if (window.location.hash) return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-red"
        style={{ scaleX: scrollYProgress }}
      />
      <header
        className={`deck-header fixed top-0 left-0 right-0 z-40 flex items-start justify-between gap-3 py-2 transition-opacity duration-300 md:gap-6 ${
          overFooter ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <a href="#title" aria-label={`${brand.name} — home`} className="flex min-h-[44px] items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-cropped.png" alt={brand.name} className="h-9 w-auto md:h-16" />
        </a>
        <InvestButton />
      </header>
    </>
  );
}