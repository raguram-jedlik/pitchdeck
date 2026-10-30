"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Icon set for the vehicle-specification tiles. Each is a simple line
 * drawing in the brand's black, with the red accent reserved for the
 * active/emphasis stroke. All are 24x24 viewBox, stroke-based.
 */

const INK = "#000000";
const RED = "#C8023B";

type IconProps = { className?: string };

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

export function GaugeIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M3.5 17a9 9 0 1 1 17 0" />
      <path d="M12 17 16.5 9" stroke={RED} strokeWidth="1.8" />
      <circle cx="12" cy="17" r="1.6" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function RoadIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M7 3 4 21" />
      <path d="M17 3l3 18" />
      <path d="M12 4v3M12 10.5v3M12 17v3" stroke={RED} strokeWidth="1.8" />
    </Svg>
  );
}

export function BatteryIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="2.5" y="7" width="16" height="10" rx="1.5" />
      <path d="M21.5 10.5v3" />
      <path d="M9 9.5 6 12l3 2.5M14 9.5 17 12l-3 2.5" stroke={RED} strokeWidth="1.6" />
    </Svg>
  );
}

export function WeightIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M5 8h14l2 12H3L5 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
      <path d="M12 12v4" stroke={RED} strokeWidth="1.8" />
    </Svg>
  );
}

export function CategoryIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M3 6h18M3 12h18M3 18h18" />
      <circle cx="8" cy="6" r="2" fill={RED} stroke="none" />
      <circle cx="15" cy="12" r="2" fill={RED} stroke="none" />
      <circle cx="10" cy="18" r="2" fill={RED} stroke="none" />
    </Svg>
  );
}

export function BoltIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </Svg>
  );
}

export function SteerIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="2" fill={RED} stroke="none" />
      <path d="M12 3.5v6M12 14.5v6M3.5 12h6M14.5 12h6" />
    </Svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 2.5 20 6v6c0 5-3.4 8.4-8 9.5C7.4 20.4 4 17 4 12V6l8-3.5Z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" stroke={RED} strokeWidth="1.8" />
    </Svg>
  );
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <ellipse cx="12" cy="12" rx="3.5" ry="8.5" />
      <path d="M3.5 12h17" />
    </Svg>
  );
}

export function SubsidyIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 3v18" />
      <path d="M16.5 7.5c0-1.7-2-3-4.5-3S7.5 5.8 7.5 7.5 9.5 10 12 10s4.5 1.3 4.5 3.5-2 3-4.5 3-4.5-1.3-4.5-3" stroke={RED} strokeWidth="1.6" />
    </Svg>
  );
}

export function PatentIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 3a5.5 5.5 0 0 0-3.5 9.8V21h7v-8.2A5.5 5.5 0 0 0 12 3Z" />
      <path d="M9 21h6" />
      <path d="M12 8v4" stroke={RED} strokeWidth="1.8" />
    </Svg>
  );
}

export function StandIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 3v8" />
      <circle cx="12" cy="14" r="3" />
      <path d="M4 21h16" />
      <path d="M8 17.5 6 21M16 17.5 18 21" />
    </Svg>
  );
}

/**
 * AutonomousIcon — a vehicle that drives itself: a closed pod body with a
 * sensor arc above it. The arc reads as the sensing that makes the
 * vehicle autonomous, and the red stroke keeps it in line with the
 * other icons.
 */
export function AutonomousIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 15.5h16v3a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-3Z" />
      <path d="M6.5 15.5 8 10h8l1.5 5.5" />
      <path d="M8 15.5V13h8v2.5" />
      <path d="M5 8.5a8 8 0 0 1 14 0" stroke={RED} strokeWidth="1.8" />
      <circle cx="12" cy="5.5" r="1.2" fill={RED} stroke="none" />
    </Svg>
  );
}

export const specIcons: Record<string, (p: IconProps) => React.ReactNode> = {
  "Top speed": GaugeIcon,
  Range: RoadIcon,
  Battery: BatteryIcon,
  "Pod weight": WeightIcon,
  "Vehicle category": CategoryIcon,
  "Charging time": BoltIcon,
  "Steer-by-wire": SteerIcon,
  "Autonomous standing": StandIcon,
  "Autonomous vehicle": AutonomousIcon,
  Localisation: GlobeIcon,
  "Subsidy scheme": SubsidyIcon,
  IP: PatentIcon,
};

/**
 * SpecTile — one specification presented as an icon card. The icon sits
 * in a hairline square, the label in small caps, the value in display
 * type. Cards animate in with a slight stagger on scroll.
 */
export function SpecTile({
  spec,
  value,
  index,
}: {
  spec: string;
  value: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = specIcons[spec] ?? GaugeIcon;

  return (
    <motion.div
      ref={ref}
      className="group border border-rule bg-paper-2 p-5 transition-colors hover:border-ink"
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex h-10 w-10 items-center justify-center border border-rule text-ink transition-colors group-hover:border-red group-hover:text-red">
        <Icon className="h-5 w-5" />
      </div>
      <p className="eyebrow mt-4">{spec}</p>
      <p className="mt-1.5 font-display text-base font-bold leading-snug tracking-tight text-ink">
        {value}
      </p>
    </motion.div>
  );
}

/**
 * SpecGauge — a half-dial gauge for a single measured number. Used for
 * the headline performance figures where a number alone feels flat.
 */
export function SpecGauge({
  label,
  value,
  display,
  max,
  unit,
}: {
  label: string;
  value: number;
  display: string;
  max: number;
  unit: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const pct = Math.min(value / max, 1);

  const R = 54;
  const C = Math.PI * R; // half circumference
  const angle = -90 + pct * 180;

  return (
    <div
      ref={ref}
      className="border border-rule bg-paper-2 p-6 text-center"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = INK;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
      }}
    >
      <svg viewBox="0 0 140 82" className="mx-auto w-full max-w-[180px]" role="img" aria-label={`${label}: ${display}`}>
        <path
          d="M16 72 A54 54 0 0 1 124 72"
          fill="none"
          stroke="#E5E5E5"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <motion.path
          d="M16 72 A54 54 0 0 1 124 72"
          fill="none"
          stroke={RED}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={inView ? { strokeDashoffset: C * (1 - pct) } : { strokeDashoffset: C }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.g
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <line
            x1="70"
            y1="72"
            x2="70"
            y2="30"
            stroke={INK}
            strokeWidth="2.5"
            strokeLinecap="round"
            transform={`rotate(${angle} 70 72)`}
          />
          <circle cx="70" cy="72" r="4" fill={INK} />
        </motion.g>
      </svg>
      <p className="mt-3 font-display text-2xl font-bold tracking-tight text-ink">
        {display}
        <span className="ml-1 text-sm font-semibold text-muted">{unit}</span>
      </p>
      <p className="eyebrow mt-1.5">{label}</p>
    </div>
  );
}
