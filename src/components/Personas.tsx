"use client";

import { motion } from "framer-motion";
import { personas } from "@/data/jedlikData";
import { CloudRain, Users2, Sparkles } from "lucide-react";

const icons = [CloudRain, Users2, Sparkles];

export default function Personas() {
  return (
    <section className="relative bg-slate-950 px-6 py-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center font-display text-3xl font-bold sm:text-4xl md:text-5xl"
        >
          Target{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Customers
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {personas.map((p, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 40, rotateY: -8 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -10, rotateX: 3, rotateY: 3 }}
                style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                className="glass flex flex-col rounded-2xl p-7 transition duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <Icon className="h-7 w-7 text-cyan-400" />
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    {p.tam}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-slate-50">{p.title}</h3>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Age</dt>
                    <dd className="text-slate-300">{p.age}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Income</dt>
                    <dd className="text-right text-slate-300">{p.income}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Location</dt>
                    <dd className="text-right text-slate-300">{p.location}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Trigger</dt>
                    <dd className="text-slate-300">{p.trigger}</dd>
                  </div>
                  <div className="mt-2 flex justify-between border-t border-slate-800 pt-2">
                    <dt className="text-slate-500">LTV</dt>
                    <dd className="font-display font-semibold text-glow-cyan text-cyan-300">
                      {p.ltv}
                    </dd>
                  </div>
                </dl>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
