"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const INK = "#000000";
const RED = "#C8023B";

type IconFn = (p: { className?: string }) => React.ReactNode;

function Svg({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* ---------------- Snapshot / general section icons ---------------- */

export function StageIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M3 20h18" />
      <path d="M6 20V11M11 20V6M16 20v-6M21 20V9" />
      <path d="M4 8 12 3l8 5" stroke={RED} strokeWidth="1.6" />
    </Svg>
  );
}

export function PrototypeIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <rect x="2.5" y="8" width="19" height="8" rx="2.5" />
      <path d="M5 16v2.5M19 16v2.5" />
      <path d="M6 12h2M16 12h2" stroke={RED} strokeWidth="1.8" />
      <path d="M9 8V6h6v2" />
    </Svg>
  );
}

export function BurnIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </Svg>
  );
}

export function RunwayIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M3 19h18" />
      <path d="M5 19 19 5" />
      <circle cx="18" cy="6" r="2.5" fill={RED} stroke="none" />
      <path d="M14 5h5v5" />
    </Svg>
  );
}

export function PatentIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M12 3a5.5 5.5 0 0 0-3.5 9.8V21h7v-8.2A5.5 5.5 0 0 0 12 3Z" />
      <path d="M9 21h6M12 8v4" stroke={RED} strokeWidth="1.6" />
    </Svg>
  );
}

export function ComfortIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M5 11V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4" />
      <path d="M3 11h18v5H3z" />
      <path d="M6 16v3M18 16v3" />
      <path d="M8 13h8" stroke={RED} strokeWidth="1.8" />
    </Svg>
  );
}

export function CostIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v10M15 9.2c0-1.2-1.3-2.2-3-2.2S9 8 9 9.2 10.3 11.4 12 11.4s3 1 3 2.2-1.3 2.2-3 2.2-3-1-3-2.2" stroke={RED} strokeWidth="1.5" />
    </Svg>
  );
}

export function ErgonomicsIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="5" r="2.5" />
      <path d="M12 8v7" />
      <path d="M12 11 7 9M12 11l5-2" />
      <path d="M12 15l-3 6M12 15l3 6" />
      <circle cx="12" cy="12" r="9" stroke={RED} strokeWidth="1.2" strokeDasharray="2 3" />
    </Svg>
  );
}

export function WeatherIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M7 16a4 4 0 0 1 0-8 5.5 5.5 0 0 1 10.5 1.5A3.5 3.5 0 0 1 17 16H7Z" />
      <path d="M9 19l-1 3M13 19l-1 3M17 19l-1 3" stroke={RED} strokeWidth="1.6" />
    </Svg>
  );
}

export function HelmetIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M4 16a8 8 0 0 1 16 0v2H4v-2Z" />
      <path d="M4 16h16" />
      <path d="M9 18h6" stroke={RED} strokeWidth="1.8" />
    </Svg>
  );
}

export function SafetyIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M12 2.5 20 6v6c0 5-3.4 8.4-8 9.5C7.4 20.4 4 17 4 12V6l8-3.5Z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" stroke={RED} strokeWidth="1.8" />
    </Svg>
  );
}

export function RegIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M15 3v4h4" />
      <path d="M9 13h6M9 17h4" stroke={RED} strokeWidth="1.6" />
    </Svg>
  );
}

export function OpsIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2" stroke={RED} strokeWidth="1.6" />
    </Svg>
  );
}

export function IncidentIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M12 3 2.5 20h19L12 3Z" />
      <path d="M12 10v4" stroke={RED} strokeWidth="1.8" />
      <circle cx="12" cy="17" r="1" fill={RED} stroke="none" />
    </Svg>
  );
}

export const generalIcons: Record<string, IconFn> = {
  Stage: StageIcon,
  "Prototypes built": PrototypeIcon,
  Burn: BurnIcon,
  Runway: RunwayIcon,
  "Granted IP": PatentIcon,
  "Accessible premium commute": ComfortIcon,
  "Ultra-low cost of ownership": CostIcon,
  "Zero-straight ergonomics": ErgonomicsIcon,
  "All-weather comfort and UV shielding": WeatherIcon,
  "Helmet-free commuting": HelmetIcon,
  "Automotive-grade safety": SafetyIcon,
  "Regulatory pathway": RegIcon,
  "Operations": OpsIcon,
  "Incident response": IncidentIcon,
};

/**
 * IconStat — a stat cell carrying an icon, label and value. Replaces the
 * plain text Stat in sections that have a natural pictogram.
 */
export function IconStat({
  label,
  value,
  index = 0,
}: {
  label: string;
  value: string;
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = generalIcons[label] ?? StageIcon;

  return (
    <motion.div
      ref={ref}
      className="group bg-paper-2 p-5 transition-colors hover:bg-paper-3"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex h-9 w-9 items-center justify-center border border-rule text-ink transition-colors group-hover:border-red group-hover:text-red">
        <Icon className="h-[1.15rem] w-[1.15rem]" />
      </div>
      <p className="eyebrow mt-3.5">{label}</p>
      <p className="mt-1.5 font-display text-sm font-bold leading-snug tracking-tight text-ink">
        {value}
      </p>
    </motion.div>
  );
}

/**
 * PrototypeCard — the Alpha / Beta vehicle card with its slide-up reveal.
 * Lives here rather than in the page so the framer-motion usage stays
 * behind a "use client" boundary (a server component cannot render
 * motion.div directly).
 */
export function PrototypeCard({
  name,
  detail,
  index = 0,
}: {
  name: string;
  detail: string;
  index?: number;
}) {
  return (
    <motion.div
      className="group relative overflow-hidden border border-rule bg-paper-2 p-6 transition-colors hover:border-ink"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="absolute right-5 top-4 font-display text-5xl font-bold tracking-tight text-rule transition-colors group-hover:text-red">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="relative font-display text-2xl font-bold tracking-tight text-ink">
        {name}
      </span>
      <p className="relative mt-4 text-sm leading-relaxed text-muted">{detail}</p>
    </motion.div>
  );
}

/**
 * ValuePropRow — the six product promises as a horizontal icon strip
 * with a red connector line, rather than a plain bulleted list.
 */
export function ValuePropStrip({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => {
        const Icon = generalIcons[item] ?? ComfortIcon;
        return (
          <motion.div
            key={item}
            className="group flex items-start gap-4 bg-paper-2 p-5"
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-rule text-ink transition-colors group-hover:border-red group-hover:text-red">
              <Icon className="h-4 w-4" />
            </div>
            <p className="text-sm font-medium leading-snug text-ink">{item}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
