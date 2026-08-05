import { brand } from '@/data/deck'

/** The blacked-out vehicle the deck withholds until the reveal. */
export function Silhouette({ className, size = 64 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 120 62"
      width={size}
      height={(size * 62) / 120}
      className={className}
      role="img"
      aria-label="An undisclosed vehicle"
    >
      <path
        fill="currentColor"
        d="M14 47c-6 0-11-3-12-9-1-7 3-13 9-16 5-3 9-7 14-11C31 6 39 2 49 1c13-1 25 2 35 9 6 4 12 7 19 9 8 2 15 7 16 15 1 7-4 13-11 13H14Z"
      />
      <circle cx="34" cy="47" r="13" fill="currentColor" />
      <circle cx="90" cy="47" r="13" fill="currentColor" />
      <text
        x="62"
        y="30"
        textAnchor="middle"
        fill="#fff"
        fontSize="24"
        fontWeight="700"
        fontFamily="Poppins, sans-serif"
      >
        ?
      </text>
    </svg>
  )
}

export function LogoLockup({ className }: { className?: string }) {
  return (
    // The wordmark PNG already carries "Redefine the class." beneath it.
    <img
      src="/assets/logo.png"
      alt={`${brand.name} — ${brand.tagline}`}
      width={120}
      height={44}
      className={`h-9 w-auto brightness-0 sm:h-11 ${className ?? ''}`}
    />
  )
}

/** The persistent frame every deck slide carries: logo left, year right. */
export function DeckFrame({ dark = false }: { dark?: boolean }) {
  return (
    <>
      <div className={`absolute left-5 top-5 z-30 sm:left-8 sm:top-7 ${dark ? 'invert' : ''}`}>
        <LogoLockup />
      </div>
      <span
        className={`absolute right-5 top-6 z-30 font-display text-sm font-bold sm:right-8 sm:top-8 sm:text-base ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {brand.year}
      </span>
    </>
  )
}

export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2 className={`display-lg text-center text-crimson ${className ?? ''}`}>{children}</h2>
  )
}

/**
 * Heading of the form "The forces that will bring [?] alive", where the
 * silhouette stands in for the unrevealed vehicle.
 */
export function SilhouetteHeading({ lead, tail }: { lead: string; tail: string }) {
  return (
    <h2 className="display-lg flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-crimson">
      <span>{lead}</span>
      <Silhouette className="inline-block text-ink" size={56} />
      <span>{tail}</span>
    </h2>
  )
}

const ICONS: Record<string, string> = {
  speed: 'M12 4a8 8 0 0 0-8 8h2a6 6 0 1 1 12 0h2a8 8 0 0 0-8-8Zm4.2 3.8L11 11.6a1.6 1.6 0 1 0 1.4 1.4l3.8-5.2ZM3 15h4v2H3v-2Zm14 0h4v2h-4v-2Z',
  status: 'M4 20V10h4v10H4Zm6 0V4h4v16h-4Zm6 0v-7h4v7h-4Z',
  comfort: 'M6 4h3v9h6v3H6V4Zm10 5h3v11h-3V9ZM4 18h16v3H4v-3Z',
  dashboard: 'M4 5h16v10H4V5Zm2 2v6h12V7H6Zm2 11h8v2H8v-2Zm3-8 2 2-2 2v-4Z',
  storage: 'M3 5h18v5H3V5Zm0 7h18v5H3v-5Zm2-5v1h14V7H5Zm0 7v1h14v-1H5Z',
  weather: 'M12 2v3h-1V2h1Zm6 4-2 2-.7-.7L17 5.3l1 .7ZM6 6l1-.7 1.7 2L8 8 6 6Zm6 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm-9 3H1v-1h2v1Zm20 0h-2v-1h2v1ZM6 18l2-2 .7.7L7 19l-1-1Zm12 0-1 1-1.7-1.7.7-.7 2 1.4Z',
  efficiency: 'M5 3h9v18H5V3Zm2 2v5h5V5H7Zm10 1 3 3v8a2 2 0 1 1-4 0v-4h-1V8l2-2Z',
  pickup: 'M14 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 20l5-8 3 2 2-4 3 5-2 1-1-2-2 4-3-2-3 4H3Z',
  helmet: 'M12 4a8 8 0 0 1 8 8v3H9a5 5 0 0 1 0-10h3V4Zm-3 6a3 3 0 0 0 0 6h9v-1a6 6 0 0 0-6-5H9Z',
  maneuver: 'M4 4h16v16H4V4Zm2 2v12h12V6H6Zm2 8 3-4 2 2.5L15 9l3 5H8Z',
  parking: 'M3 17h18v3H3v-3Zm3-13h7a4 4 0 0 1 0 8H9v3H6V4Zm3 3v2h4a1 1 0 0 0 0-2H9Z',
}

export function NeedIcon({ name, className }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d={ICONS[name] ?? ICONS.speed} />
    </svg>
  )
}

const CONTACT_ICONS: Record<string, string> = {
  globe:
    'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 9h-3a15 15 0 0 0-1.3-5.6A8 8 0 0 1 18.9 11ZM12 4.2c.8 1.1 1.6 3.3 1.8 6.8h-3.6c.2-3.5 1-5.7 1.8-6.8ZM5.1 11a8 8 0 0 1 4.3-5.6A15 15 0 0 0 8.1 11h-3Zm0 2h3a15 15 0 0 0 1.3 5.6A8 8 0 0 1 5.1 13Zm5 0h3.8c-.2 3.5-1 5.7-1.9 6.8-.8-1.1-1.6-3.3-1.8-6.8Zm4.5 5.6a15 15 0 0 0 1.3-5.6h3a8 8 0 0 1-4.3 5.6Z',
  mail: 'M2 5h20v14H2V5Zm2.4 2L12 12.3 19.6 7H4.4ZM4 8.7V17h16V8.7l-8 5.6-8-5.6Z',
  instagram:
    'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-2.8a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z',
  phone:
    'M6.6 3h3l1.5 4-2.2 1.6a13 13 0 0 0 6.5 6.5L17 12.9l4 1.5v3a2.5 2.5 0 0 1-2.7 2.5A17 17 0 0 1 4.1 5.7 2.5 2.5 0 0 1 6.6 3Z',
}

export function ContactIcon({ name, className }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d={CONTACT_ICONS[name] ?? CONTACT_ICONS.globe} />
    </svg>
  )
}
