"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { steerByWire, crabWalk } from "@/data/jedlikData";
import { Cog, Zap, CircleDot } from "lucide-react";

export default function SteerByWire() {
  const [active, setActive] = useState<"steer" | "crab">("steer");

  return (
    <section className="relative bg-slate-950 px-6 py-28 md:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center font-display text-3xl font-bold sm:text-4xl md:text-5xl"
        >
          The Trick with{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Two Wheels
          </span>
        </motion.h2>

        <div className="mb-10 flex justify-center gap-3">
          {(["steer", "crab"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`rounded-full px-6 py-2 text-sm font-medium tracking-wide transition ${
                active === tab
                  ? "bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950"
                  : "glass text-slate-300 hover:border-cyan-400/50"
              }`}
            >
              {tab === "steer" ? "Steer-by-Wire" : "Crab-Walk Steering"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {active === "steer" ? (
            <motion.div
              key="steer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
              <div className="glass rounded-2xl p-8">
                <Cog className="mb-4 h-8 w-8 text-slate-400" />
                <p className="font-display text-lg font-semibold text-slate-200">
                  {steerByWire.mechanical.title}
                </p>
                <p className="mt-2 text-sm text-slate-400">{steerByWire.mechanical.description}</p>
              </div>
              <div className="glass rounded-2xl border-cyan-400/40 p-8">
                <Zap className="mb-4 h-8 w-8 text-cyan-400" />
                <p className="font-display text-lg font-semibold text-glow-cyan text-cyan-300">
                  {steerByWire.steerByWireCard.title}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {steerByWire.steerByWireCard.description}
                </p>
              </div>
              <div className="glass rounded-2xl p-8 sm:col-span-2">
                <p className="mb-3 text-xs uppercase tracking-widest text-emerald-400">Benefits</p>
                <div className="flex flex-wrap gap-3">
                  {steerByWire.benefits.map((b) => (
                    <span
                      key={b}
                      className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="crab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
              <div className="glass rounded-2xl p-8">
                <p className="mb-4 flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400">
                  <CircleDot className="h-4 w-4" /> Modes
                </p>
                <div className="flex flex-col gap-2">
                  {crabWalk.modes.map((m) => (
                    <span
                      key={m}
                      className="rounded-lg bg-slate-800/60 px-4 py-2 text-sm text-slate-200"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              <div className="glass rounded-2xl border-emerald-400/40 p-8">
                <p className="mb-4 text-xs uppercase tracking-widest text-emerald-400">Benefits</p>
                <ul className="space-y-3 text-sm text-slate-300">
                  {crabWalk.benefits.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-emerald-400">&#8226;</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
