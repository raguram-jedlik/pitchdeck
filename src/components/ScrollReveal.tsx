"use client";

import { useEffect } from "react";

/**
 * Drives the section-reveal-on-scroll effect. Sections start hidden (see
 * .section-reveal in globals.css) and get the .in-view class the first time
 * they cross into the viewport. Whatever is already on screen at mount is
 * revealed immediately so the initial view isn't blank.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section, main section"));
    sections.forEach((el) => el.classList.add("section-reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    sections.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
