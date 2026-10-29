"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { buildPhotos } from "@/data/jedlikData";

/**
 * Target scroll speed for the marquee, in pixels per second.
 *
 * Deliberately slow and cinematic: at this speed a build photo takes
 * roughly 10 seconds to glide past, which reads as a calm drift rather
 * than a carousel. Because the duration is derived from the measured track
 * width (see MARQUEE_PX_PER_SEC), the perceived speed stays identical at
 * every breakpoint even though the track is much longer on large screens.
 */
const MARQUEE_PX_PER_SEC = 40;

/**
 * Fallback duration used before the track has been measured (first paint)
 * and if measurement is unavailable. Matches the largest breakpoint at
 * MARQUEE_PX_PER_SEC so there is no visible speed jump on hydration.
 */
const FALLBACK_DURATION_S = 360;

/**
 * Building the E-POD — auto-marquee build photos, no touch.
 */
export default function BuildingEPod() {
  const marquee = [...buildPhotos, ...buildPhotos];
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Respect the OS "reduce motion" setting. When set, the marquee is not
  // animated at all (the animation class is simply not applied), so the
  // photos sit still rather than moving at some slower rate.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Derive the animation duration from the real track width so the scroll
  // speed is constant in px/sec regardless of card size. The track is
  // duplicated, so a -50% translate traverses exactly half of it (one full
  // copy of the photo list) and loops seamlessly.
  useEffect(() => {
    if (reducedMotion) return;

    const track = trackRef.current;
    if (!track) return;

    const apply = () => {
      const width = track.getBoundingClientRect().width;
      if (!width) return;
      const seconds = width / MARQUEE_PX_PER_SEC;
      track.style.setProperty(
        "--marquee-duration",
        `${seconds.toFixed(3)}s`
      );
    };

    apply();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", apply);
      return () => window.removeEventListener("resize", apply);
    }

    const ro = new ResizeObserver(apply);
    ro.observe(track);
    return () => ro.disconnect();
  }, [reducedMotion]);

  return (
    <section className="relative px-6 py-12 text-ink md:px-10 md:py-16">
      <div className="mx-auto max-w-deck">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="eyebrow text-ink/60">Section 08 — Building the E-POD</p>
          <div className="relative mt-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div
              ref={trackRef}
              style={
                reducedMotion
                  ? undefined
                  : ({ "--marquee-duration": `${FALLBACK_DURATION_S}s` } as React.CSSProperties)
              }
              className={
                reducedMotion
                  ? "flex w-max gap-2"
                  : "flex w-max animate-marquee gap-2 motion-reduce:animate-none"
              }
            >
              {marquee.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={`${src}-${i}`}
                  src={src}
                  alt=""
                  aria-hidden={i >= buildPhotos.length}
                  loading="lazy"
                  className="h-64 w-80 shrink-0 object-cover sm:h-72 sm:w-96 md:h-96 md:w-[26rem] lg:h-[28rem] lg:w-[34rem]"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
