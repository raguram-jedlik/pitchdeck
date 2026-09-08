"use client";

import { motion } from "framer-motion";
import { buildPhotos } from "@/data/jedlikData";

/**
 * Building the E-POD — auto-marquee build photos, no touch.
 */
export default function BuildingEPod() {
  const marquee = [...buildPhotos, ...buildPhotos];

  return (
    <section className="relative bg-ink px-6 py-16 text-paper md:px-10 md:py-24">
      <div className="mx-auto max-w-deck">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
      </div>
    </section>
  );
}
