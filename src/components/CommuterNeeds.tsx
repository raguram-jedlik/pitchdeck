"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { commuterNeeds } from "@/data/jedlikData";

function NeedCard({ index, title, Icon }: { index: number; title: string; Icon: (typeof commuterNeeds)[number]["icon"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rate = index % 2 === 0 ? 0.9 : 1.1;
  const y = useTransform(scrollYProgress, [0, 1], [`${40 * rate}px`, `${-40 * rate}px`]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.06 }}
      className="glass group relative overflow-hidden rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(200px circle at var(--x,50%) var(--y,50%), rgba(34,211,238,0.15), transparent 70%)",
        }}
      />
      <Icon className="mb-4 h-8 w-8 text-cyan-400" strokeWidth={1.5} />
      <p className="font-display text-base font-medium text-slate-100">{title}</p>
    </motion.div>
  );
}

export default function CommuterNeeds() {
  return (
    <section id="commuter-needs" className="relative bg-slate-950 px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            What Does an Urban Commuter{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Really Need?
            </span>
          </h2>
          <p className="mt-4 text-slate-400">Not just a vehicle. A better way to move.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {commuterNeeds.map((need, i) => (
            <NeedCard key={need.title} index={i} title={need.title} Icon={need.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}
