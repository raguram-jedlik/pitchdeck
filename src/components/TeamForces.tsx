"use client";

import { motion } from "framer-motion";
import { founders, mentors, teamHighlight } from "@/data/jedlikData";
import { Users } from "lucide-react";

export default function TeamForces() {
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
          The Forces That Will{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Bring Jedlik Alive
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {founders.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, rotateX: 4 }}
              style={{ transformStyle: "preserve-3d" }}
              className="glass rounded-2xl p-8 text-center transition duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20">
                <Users className="h-7 w-7 text-cyan-400" />
              </div>
              <p className="font-display text-lg font-semibold text-slate-50">{f.name}</p>
              <p className="mt-1 text-sm text-slate-400">{f.role}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass mx-auto mt-10 max-w-3xl rounded-2xl border-emerald-400/30 p-6 text-center"
        >
          <p className="text-glow-emerald text-sm font-medium text-emerald-300 sm:text-base">
            {teamHighlight}
          </p>
        </motion.div>

        <h3 className="mb-8 mt-20 text-center font-display text-xl font-semibold text-slate-200 sm:text-2xl">
          Mentors &amp; Advisors
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {mentors.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 transition duration-300 hover:border-emerald-400/50"
            >
              <p className="font-display text-base font-semibold text-slate-50">{m.name}</p>
              <p className="mt-2 text-sm text-slate-400">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
