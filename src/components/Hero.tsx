"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const particleY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const vehicleScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const vehicleOpacity = useTransform(scrollYProgress, [0, 1], [0.9, 0]);
  const vehicleY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const scrollToNext = () => {
    document.getElementById("commuter-needs")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Layer 1: ambient grid, slow parallax */}
      <motion.div
        style={{ y: bgY }}
        className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      {/* Layer 2: glow orbs */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]"
      />
      <motion.div
        style={{ y: particleY }}
        className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-emerald-500/20 blur-[120px]"
      />

      {/* Layer 3: floating particle field */}
      <motion.div style={{ y: particleY }} className="pointer-events-none absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-cyan-300/40"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              boxShadow: "0 0 6px rgba(34,211,238,0.6)",
            }}
          />
        ))}
      </motion.div>

      {/* Layer 4: vehicle silhouette */}
      <motion.div
        style={{ scale: vehicleScale, opacity: vehicleOpacity, y: vehicleY }}
        className="pointer-events-none absolute bottom-[8%] flex justify-center"
      >
        <svg
          width="360"
          height="180"
          viewBox="0 0 360 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_40px_rgba(34,211,238,0.5)]"
        >
          <ellipse cx="180" cy="160" rx="140" ry="10" fill="url(#shadowGrad)" />
          <path
            d="M40 120 C40 80 90 40 180 40 C270 40 320 80 320 120 C320 140 300 150 270 150 L90 150 C60 150 40 140 40 120Z"
            fill="url(#bodyGrad)"
            stroke="#22d3ee"
            strokeWidth="1.5"
          />
          <path
            d="M110 100 C120 60 240 60 250 100"
            fill="none"
            stroke="#34d399"
            strokeWidth="2"
            opacity="0.8"
          />
          <circle cx="110" cy="150" r="24" fill="#0f172a" stroke="#22d3ee" strokeWidth="3" />
          <circle cx="250" cy="150" r="24" fill="#0f172a" stroke="#22d3ee" strokeWidth="3" />
          <defs>
            <linearGradient id="bodyGrad" x1="40" y1="40" x2="320" y2="150" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0f172a" />
              <stop offset="1" stopColor="#0891b2" stopOpacity="0.4" />
            </linearGradient>
            <radialGradient id="shadowGrad" cx="0.5" cy="0.5" r="0.5">
              <stop stopColor="#22d3ee" stopOpacity="0.4" />
              <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Foreground content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4 font-display text-sm uppercase tracking-[0.5em] text-cyan-400"
        >
          Jedlik Motors
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-slate-50 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          WE ARE{" "}
          <span className="text-glow-cyan bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            REDEFINING
          </span>{" "}
          THE WAY THE WORLD COMMUTES IN CITIES
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-6 max-w-2xl text-sm text-slate-400 sm:text-base"
        >
          Jedlik is named after Ányos Jedlik, who built the world&apos;s first electric
          motor in 1828. We&apos;re continuing that legacy on Indian roads.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          onClick={scrollToNext}
          className="glass group mt-10 flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium tracking-wide text-slate-50 transition hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]"
        >
          Explore the Vision
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4 text-cyan-400" />
          </motion.span>
        </motion.button>
      </motion.div>
    </section>
  );
}
