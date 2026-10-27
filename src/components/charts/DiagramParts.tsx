"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const RED = "#C8023B";
const INK = "#000000";

/**
 * CanvasWheel — the nine-block business model canvas drawn as a radial
 * diagram rather than a flat grid. Blocks sit around a circle with a
 * central hub. Hovering a block highlights it and its spokes.
 */
export function CanvasWheel({
  blocks,
}: {
  blocks: { title: string; items: string[] }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState<number | null>(null);

  const n = blocks.length;
  const R = 118;
  const C = 160;
  const cx = 160;
  const cy = 160;

  const pos = (i: number) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R };
  };

  return (
    <div ref={ref} className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
      <div className="relative mx-auto w-full max-w-[320px] shrink-0">
        <svg viewBox="0 0 320 320" className="w-full" role="img" aria-label="Business model canvas">
          {/* spokes */}
          {blocks.map((b, i) => {
            const p = pos(i);
            return (
              <motion.line
                key={b.title}
                x1={cx}
                y1={cy}
                x2={p.x}
                y2={p.y}
                stroke={active === i ? RED : "#E5E5E5"}
                strokeWidth={active === i ? 1.6 : 1}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
              />
            );
          })}

          {/* centre hub */}
          <motion.circle
            cx={cx}
            cy={cy}
            r="44"
            fill="#FFFFFF"
            stroke={INK}
            strokeWidth="1.5"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
          <text
            x={cx}
            y={cy - 4}
            textAnchor="middle"
            className="fill-[#000000] font-display"
            fontSize="12"
            fontWeight="700"
            letterSpacing="0.06em"
          >
            JEDLIK
          </text>
          <text
            x={cx}
            y={cy + 13}
            textAnchor="middle"
            className="fill-[#6B6B6B] font-display"
            fontSize="9"
            letterSpacing="0.14em"
          >
            E-POD
          </text>

          {/* blocks */}
          {blocks.map((b, i) => {
            const p = pos(i);
            const isActive = active === i;
            return (
              <motion.g
                key={b.title}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isActive ? 25 : 21}
                  fill={isActive ? RED : "#FFFFFF"}
                  stroke={isActive ? RED : INK}
                  strokeWidth="1.5"
                />
                <text
                  x={p.x}
                  y={p.y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-display"
                  fontSize="8.5"
                  fontWeight="700"
                  fill={isActive ? "#FFFFFF" : INK}
                >
                  {b.title.length > 14 ? b.title.slice(0, 13) + "…" : b.title}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>

      <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
        {blocks.map((b, i) => (
          <div
            key={b.title}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className={`bg-white p-4 transition-colors ${
              active === i ? "outline outline-1 outline-red" : ""
            }`}
          >
            <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.16em] text-red">
              {b.title}
            </p>
            <ul className="mt-2.5 space-y-1">
              {b.items.map((it) => (
                <li key={it} className="text-[0.78rem] leading-relaxed text-muted">
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * StageTimeline — the go-to-market path drawn as a rising staircase with
 * a connecting line, showing scale growing stage by stage.
 */
export function StageTimeline({
  stages,
}: {
  stages: { stage: string; scale: string; detail: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const n = stages.length;

  return (
    <div ref={ref} className="relative">
      <svg
        viewBox={`0 0 ${(n - 1) * 200 + 80} 210`}
        className="hidden w-full md:block"
        role="img"
        aria-label="Go to market stages"
      >
        {stages.map((s, i) => {
          const x = 40 + i * 200;
          const y = 180 - (i / (n - 1)) * 130;
          return (
            <g key={s.stage}>
              {i > 0 ? (
                <motion.line
                  x1={x - 200}
                  y1={180 - ((i - 1) / (n - 1)) * 130}
                  x2={x}
                  y2={y}
                  stroke={INK}
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
                />
              ) : null}
              <motion.circle
                cx={x}
                cy={y}
                r="16"
                fill={i === n - 1 ? RED : "#FFFFFF"}
                stroke={i === n - 1 ? RED : INK}
                strokeWidth="1.5"
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              />
              <text
                x={x}
                y={y + 3}
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-display"
                fontSize="10"
                fontWeight="700"
                fill={i === n - 1 ? "#FFFFFF" : INK}
              >
                {i + 1}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-6 grid gap-px border border-rule bg-rule md:grid-cols-2 lg:grid-cols-4">
        {stages.map((s, i) => (
          <motion.div
            key={s.stage}
            className="bg-white p-6"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.16em] text-red">
              Stage {i + 1}
            </p>
            <p className="mt-2 font-display text-lg font-bold tracking-tight text-ink">{s.stage}</p>
            <p className="mt-3 font-display text-sm font-semibold text-ink">{s.scale}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/**
 * CompareBars — two-bar comparison (ours vs manual / now vs later).
 * Animates both bars and shows the delta between them.
 */
export function CompareBars({
  rows,
}: {
  rows: { label: string; ours: string; theirs: string; effect: string; oursValue?: number; theirsValue?: number }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="space-y-7">
      {rows.map((r, i) => {
        const max = Math.max(r.oursValue ?? 0, r.theirsValue ?? 0, 1);
        return (
          <div key={r.label}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-display text-sm font-semibold text-ink">{r.label}</span>
              <span className="text-xs text-muted">{r.effect}</span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-24 shrink-0 font-display text-[0.6rem] font-bold uppercase tracking-[0.14em] text-muted">
                  Dark factory
                </span>
                <div className="h-6 flex-1 bg-rule">
                  <motion.div
                    className="h-6"
                    style={{ backgroundColor: RED }}
                    initial={{ width: 0 }}
                    animate={
                      inView ? { width: `${((r.oursValue ?? 0) / max) * 100}%` } : { width: 0 }
                    }
                    transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <span className="w-28 shrink-0 text-right font-display text-xs font-bold text-ink">
                  {r.ours}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-24 shrink-0 font-display text-[0.6rem] font-bold uppercase tracking-[0.14em] text-muted">
                  Manual CKD
                </span>
                <div className="h-6 flex-1 bg-rule">
                  <motion.div
                    className="h-6 bg-ink"
                    initial={{ width: 0 }}
                    animate={
                      inView ? { width: `${((r.theirsValue ?? 0) / max) * 100}%` } : { width: 0 }
                    }
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <span className="w-28 shrink-0 text-right font-display text-xs font-bold text-muted">
                  {r.theirs}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * TaktChart — the five-cell layout drawn as a Gantt-style timing chart,
 * showing each cell's cycle time against the takt line.
 */
export function TaktChart({
  cells,
  taktMinutes,
}: {
  cells: { cell: string; minutes: number; share: number }[];
  taktMinutes: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="space-y-3">
      {cells.map((c, i) => (
        <div key={c.cell}>
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-sm font-medium text-ink">{c.cell}</span>
            <span className="font-display text-sm font-bold text-ink">{c.minutes} min</span>
          </div>
          <div className="relative mt-1.5 h-5 w-full bg-rule">
            <motion.div
              className="h-5 bg-ink"
              initial={{ width: 0 }}
              animate={inView ? { width: `${(c.minutes / taktMinutes) * 100}%` } : { width: 0 }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 font-display text-[0.6rem] font-bold text-muted">
              {c.share}% of takt
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
