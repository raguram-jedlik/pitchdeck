"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const RED = "#C8023B";
const INK = "#000000";

/**
 * CanvasWheel — the nine-block business model canvas drawn as a radial
 * diagram rather than a flat grid. Blocks sit around a circle with a
 * central hub. Hovering a block highlights it and its spokes.
 *
 * Labels are wrapped onto short lines and set inside generous circles so
 * nothing ever bleeds past the circle edge. Titles are never truncated.
 *
 * The radial diagram is deliberately its own component, separate from
 * `CanvasBlockGrid`, so the two halves of section 06 can live on
 * separate pages. Fitting the wheel and all nine detail cards onto one
 * screen forced the whole section down to the 0.5 scale floor, which
 * rendered the body copy at about 6px on a desktop.
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
  const R = 132;
  const C = 180;
  const cx = 180;
  const cy = 180;

  const pos = (i: number) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R };
  };

  /**
   * Split a block title into at most two lines that each fit inside a
   * 30px-radius circle. Words longer than the line budget are kept whole
   * rather than chopped, so no label ever shows an ellipsis.
   */
  const wrap = (title: string): string[] => {
    const words = title.split(" ");
    if (words.length === 1) return [title];

    const lines: string[] = [];
    let current = "";
    for (const w of words) {
      const candidate = current ? `${current} ${w}` : w;
      // ~10 characters per line at the rendered size keeps text inside.
      if (candidate.length > 11 && current) {
        lines.push(current);
        current = w;
      } else {
        current = candidate;
      }
    }
    if (current) lines.push(current);
    return lines.slice(0, 2);
  };

  return (
    <div ref={ref} className="mx-auto w-full max-w-[min(520px,52vh)]">
      <svg viewBox="0 0 360 360" className="w-full" role="img" aria-label="Business model canvas">
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
            r="48"
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
            fontSize="14"
            fontWeight="700"
            letterSpacing="0.06em"
          >
            JEDLIK
          </text>
          <text
            x={cx}
            y={cy + 14}
            textAnchor="middle"
            className="fill-[#6B6B6B] font-display"
            fontSize="12"
            letterSpacing="0.14em"
          >
            E-POD
          </text>

          {/* blocks */}
          {blocks.map((b, i) => {
            const p = pos(i);
            const isActive = active === i;
            const lines = wrap(b.title);
            const lineHeight = 10;
            const startY = p.y - ((lines.length - 1) * lineHeight) / 2;
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
                  r={isActive ? 32 : 28}
                  fill={isActive ? RED : "#FFFFFF"}
                  stroke={isActive ? RED : INK}
                  strokeWidth="1.5"
                />
                {lines.map((line, li) => (
                  <text
                    key={line + li}
                    x={p.x}
                    y={startY + li * lineHeight}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-display"
                    fontSize="12"
                    fontWeight="700"
                    fill={isActive ? "#FFFFFF" : INK}
                  >
                    {line}
                  </text>
                ))}
              </motion.g>
            );
          })}
        </svg>
    </div>
  );
}

/**
 * CanvasBlockGrid — the nine business-model blocks written out in full.
 *
 * Split out of `CanvasWheel` so the detail cards can be paginated
 * independently of the radial diagram. The cards keep the hover link to
 * the wheel, so hovering a block here still highlights it on the
 * diagram page.
 */
export function CanvasBlockGrid({
  blocks,
  columns = 3,
}: {
  blocks: { title: string; items: string[] }[];
  columns?: 2 | 3;
}) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={`grid gap-px border border-rule bg-rule ${
        columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"
      }`}
    >
      {blocks.map((b) => (
        <div
          key={b.title}
          onMouseEnter={() => setActive(b.title)}
          onMouseLeave={() => setActive(null)}
          className={`bg-paper-2 p-5 transition-colors ${
            active === b.title ? "outline outline-1 outline-red" : ""
          }`}
        >
          <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-red">
            {b.title}
          </p>
          <ul className="mt-3 space-y-1.5">
            {b.items.map((it) => (
              <li key={it} className="text-[0.9375rem] leading-relaxed text-muted">
                {it}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/**
 * StageTimeline — the go-to-market path shown as a set of stage cards.
 * The rising staircase graphic was removed; the cards carry the story.
 */
export function StageTimeline({
  stages,
}: {
  stages: { stage: string; scale: string; detail: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="grid gap-px border border-rule bg-rule md:grid-cols-2 lg:grid-cols-4">
      {stages.map((s, i) => (
        <motion.div
          key={s.stage}
          className="bg-paper-2 p-6"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <p className="font-display text-[0.75rem] font-bold uppercase tracking-[0.16em] text-red">
            Stage {i + 1}
          </p>
          <p className="mt-2 font-display text-lg font-bold tracking-tight text-ink">{s.stage}</p>
          <p className="mt-3 font-display text-sm font-semibold text-ink">{s.scale}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{s.detail}</p>
        </motion.div>
      ))}
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
    <div ref={ref} className="chart-panel space-y-7">
      {rows.map((r, i) => {
        const max = Math.max(r.oursValue ?? 0, r.theirsValue ?? 0, 1);
        return (
          <div key={r.label}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-display text-sm font-semibold text-ink">{r.label}</span>
              <span className="text-sm text-muted">{r.effect}</span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-24 shrink-0 font-display text-[0.75rem] font-bold uppercase tracking-[0.14em] text-muted">
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
                <span className="w-24 shrink-0 font-display text-[0.75rem] font-bold uppercase tracking-[0.14em] text-muted">
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
