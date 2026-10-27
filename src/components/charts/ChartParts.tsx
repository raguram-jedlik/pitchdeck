"use client";

import { useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Shared primitives. Strict black / white / red — no other hues.      */
/* ------------------------------------------------------------------ */

const RED = "#C8023B";
const INK = "#000000";
const RULE = "#E5E5E5";
const MUTED = "#6B6B6B";

/**
 * CountUpNumber — animates from 0 to `value` the first time it scrolls
 * into view. Used to make headline numbers feel alive without noise.
 */
export function CountUpNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.4,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  if (inView && !started.current) {
    started.current = true;
    animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v),
    });
  }

  return (
    <span ref={ref}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/**
 * AnimatedBar — a horizontal bar that grows from zero when scrolled into
 * view. Colour is ink or red; the track is a hairline rule colour.
 */
export function AnimatedBar({
  percent,
  color = "red",
  height = "h-2",
  delay = 0,
  className = "",
}: {
  percent: number;
  color?: "red" | "ink";
  height?: string;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const fill = color === "red" ? RED : INK;

  return (
    <div ref={ref} className={`w-full bg-rule ${className}`}>
      <motion.div
        className={height}
        style={{ backgroundColor: fill }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${percent}%` } : { width: 0 }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

/**
 * DonutChart — a pie/donut built from SVG arcs. `slices` is a list of
 * { label, value, color } where color is "red" | "ink" | "muted".
 * Centre slot holds an optional headline.
 */
export function DonutChart({
  slices,
  size = 220,
  thickness = 34,
  centreLabel,
  centreValue,
}: {
  slices: { label: string; value: number; color: "red" | "ink" | "muted" }[];
  size?: number;
  thickness?: number;
  centreLabel?: string;
  centreValue?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hover, setHover] = useState<number | null>(null);

  const total = slices.reduce((s, x) => s + x.value, 0) || 1;
  const r = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  const colorOf = (c: "red" | "ink" | "muted") =>
    c === "red" ? RED : c === "ink" ? INK : MUTED;

  let offset = 0;
  const arcs = slices.map((s) => {
    const frac = s.value / total;
    const len = frac * circumference;
    const arc = { ...s, len, offset, frac };
    offset += len;
    return arc;
  });

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label="Chart"
        >
          <g transform={`rotate(-90 ${cx} ${cy})`}>
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={RULE}
              strokeWidth={thickness}
            />
            {arcs.map((a, i) => (
              <motion.circle
                key={a.label}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={colorOf(a.color)}
                strokeWidth={hover === i ? thickness + 5 : thickness}
                strokeDasharray={`${a.len} ${circumference - a.len}`}
                strokeDashoffset={-a.offset}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                initial={{ strokeDasharray: `0 ${circumference}`, opacity: 0 }}
                animate={
                  inView
                    ? { strokeDasharray: `${a.len} ${circumference - a.len}`, opacity: 1 }
                    : { strokeDasharray: `0 ${circumference}`, opacity: 0 }
                }
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </g>
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          {hover !== null ? (
            <>
              <span className="font-display text-xl font-bold text-ink">
                {arcs[hover].value}
                {arcs[hover].frac < 0.01 ? "%" : ""}
              </span>
              <span className="mt-1 max-w-[9rem] text-[0.65rem] leading-snug text-muted">
                {arcs[hover].label}
              </span>
            </>
          ) : (
            <>
              {centreValue ? (
                <span className="font-display text-xl font-bold text-ink">{centreValue}</span>
              ) : null}
              {centreLabel ? (
                <span className="mt-1 text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                  {centreLabel}
                </span>
              ) : null}
            </>
          )}
        </div>
      </div>

      <ul className="w-full space-y-2.5">
        {arcs.map((a, i) => (
          <li
            key={a.label}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="flex items-center gap-3 text-sm"
          >
            <span
              className="h-2.5 w-2.5 shrink-0"
              style={{ backgroundColor: colorOf(a.color) }}
            />
            <span className="flex-1 text-ink">{a.label}</span>
            <span className="font-display font-bold text-ink">{a.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * LineChart — a simple multi-series line/area chart on a log-ish scale.
 * `series` is a list of { name, color, points: {x: number, y: number}[] }.
 * The x axis is the index of the point; labels are supplied separately.
 */
export function LineChart({
  series,
  labels,
  height = 260,
  format = "plain",
  logScale = true,
}: {
  series: { name: string; color: "red" | "ink"; points: { y: number }[] }[];
  labels: string[];
  height?: number;
  format?: "plain" | "usdM" | "rupeesK";
  logScale?: boolean;
}) {
  const yFormat = (v: number) => {
    if (format === "usdM") return `$${v}M`;
    if (format === "rupeesK") return `₹${Math.round(v / 1000)}K`;
    return String(v);
  };
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hover, setHover] = useState<number | null>(null);

  const W = 640;
  const H = height;
  const padL = 54;
  const padR = 16;
  const padT = 16;
  const padB = 34;

  const all = series.flatMap((s) => s.points.map((p) => p.y));
  const maxY = Math.max(...all, 1);
  const minY = Math.min(...all, 1);

  const tf = (v: number) =>
    logScale
      ? Math.log10(Math.max(v, 1))
      : v;
  const tMax = tf(maxY);
  const tMin = logScale ? 0 : tf(minY);
  const span = tMax - tMin || 1;

  const n = labels.length;
  const xOf = (i: number) => padL + (i / Math.max(n - 1, 1)) * (W - padL - padR);
  const yOf = (v: number) =>
    padT + (1 - (tf(v) - tMin) / span) * (H - padT - padB);

  // Gridlines at decade boundaries when log scale is on.
  const gridValues: number[] = [];
  if (logScale) {
    for (let e = 0; e <= Math.ceil(Math.log10(maxY)); e++) {
      const v = Math.pow(10, e);
      if (v <= maxY && v >= 1) gridValues.push(v);
    }
  } else {
    const steps = 4;
    for (let i = 0; i <= steps; i++) {
      gridValues.push(minY + ((maxY - minY) * i) / steps);
    }
  }

  const pathOf = (pts: { y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${xOf(i).toFixed(1)} ${yOf(p.y).toFixed(1)}`).join(" ");

  return (
    <div ref={ref}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Chart"
        onMouseLeave={() => setHover(null)}
      >
        {gridValues.map((g) => (
          <g key={g}>
            <line
              x1={padL}
              x2={W - padR}
              y1={yOf(g)}
              y2={yOf(g)}
              stroke={RULE}
              strokeWidth="1"
            />
            <text
              x={padL - 8}
              y={yOf(g) + 4}
              textAnchor="end"
              className="fill-[#6B6B6B] font-display"
              fontSize="10"
            >
              {yFormat(g)}
            </text>
          </g>
        ))}

        {series.map((s) => {
          const color = s.color === "red" ? RED : INK;
          const d = pathOf(s.points);
          const area = `${d} L${xOf(s.points.length - 1)} ${H - padB} L${xOf(0)} ${H - padB} Z`;
          return (
            <g key={s.name}>
              {s.color === "red" ? (
                <motion.path
                  d={area}
                  fill={RED}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 0.08 } : { opacity: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              ) : null}
              <motion.path
                d={d}
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.3, ease: "easeInOut" }}
              />
              {s.points.map((p, i) => (
                <circle
                  key={i}
                  cx={xOf(i)}
                  cy={yOf(p.y)}
                  r={hover === i ? 5 : 3.5}
                  fill="#FFFFFF"
                  stroke={color}
                  strokeWidth="2"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHover(i)}
                />
              ))}
            </g>
          );
        })}

        {labels.map((l, i) => (
          <text
            key={l}
            x={xOf(i)}
            y={H - padB + 20}
            textAnchor="middle"
            className="fill-[#6B6B6B] font-display"
            fontSize="10"
          >
            {l}
          </text>
        ))}

        {hover !== null ? (
          <line
            x1={xOf(hover)}
            x2={xOf(hover)}
            y1={padT}
            y2={H - padB}
            stroke={INK}
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        ) : null}
      </svg>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
        {series.map((s) => (
          <span key={s.name} className="flex items-center gap-2 text-sm">
            <span
              className="h-2.5 w-2.5"
              style={{ backgroundColor: s.color === "red" ? RED : INK }}
            />
            <span className="text-ink">{s.name}</span>
          </span>
        ))}
        {hover !== null ? (
          <span className="ml-auto text-xs text-muted">
            {labels[hover]} —{" "}
            {series.map((s) => `${s.name}: ${s.points[hover].y}`).join("  ·  ")}
          </span>
        ) : null}
      </div>
    </div>
  );
}

/**
 * ColumnChart — vertical columns with animated growth. Used for the
 * projection revenue/valuation comparison and fund allocation.
 */
export function ColumnChart({
  data,
  height = 240,
  format = "plain",
  highlightIndex,
}: {
  data: { label: string; value: number; sub?: string }[];
  height?: number;
  format?: "plain" | "usdM" | "rupeesK" | "percent";
  highlightIndex?: number;
}) {
  const valueFormat = (v: number) => {
    if (format === "usdM") return `$${v}M`;
    if (format === "rupeesK") return `₹${Math.round(v / 1000)}K`;
    if (format === "percent") return `${v}%`;
    return String(v);
  };
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hover, setHover] = useState<number | null>(null);

  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div ref={ref}>
      <div className="flex items-end gap-2 md:gap-4" style={{ height }}>
        {data.map((d, i) => {
          const isHi = highlightIndex === i;
          return (
            <div
              key={d.label}
              className="flex h-full flex-1 flex-col justify-end"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <div className="relative flex flex-1 items-end">
                <motion.div
                  className="w-full"
                  style={{ backgroundColor: isHi ? RED : INK }}
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${(d.value / max) * 100}%` } : { height: 0 }}
                  transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                />
                {hover === i ? (
                  <div className="absolute -top-1 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap border border-ink bg-white px-2 py-1 font-display text-[0.7rem] font-bold text-ink">
                    {valueFormat(d.value)}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex gap-2 md:gap-4">
        {data.map((d) => (
          <div key={d.label} className="flex-1 text-center">
            <p className="font-display text-[0.65rem] font-bold text-ink">{d.label}</p>
            {d.sub ? (
              <p className="mt-0.5 text-[0.6rem] text-muted">{d.sub}</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
