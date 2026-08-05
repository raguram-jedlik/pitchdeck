import { useEffect, useRef, type ReactNode } from 'react'
import { fadeUp, gsap, useGsap, useReducedMotion } from '@/lib/motion'

/**
 * Fades its children up as the block enters view. Under reduced motion the
 * children are simply rendered — no opacity is ever set, so nothing can get
 * stuck invisible.
 */
export function Reveal({
  children,
  className,
  stagger,
  y,
  start,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  stagger?: number
  y?: number | string
  start?: string
  as?: 'div' | 'section' | 'ul' | 'header'
}) {
  const reduced = useReducedMotion()
  const ref = useGsap(
    ({ self }) => {
      if (reduced) return
      fadeUp(Array.from(self.children), self, { stagger, y, start })
    },
    [reduced, stagger, y, start],
  )

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  )
}

/** Splits a string into words and staggers them upward on entry. */
export function RevealText({
  text,
  className,
  wordClassName,
  delay = 0,
}: {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
}) {
  const reduced = useReducedMotion()
  const ref = useGsap(
    ({ self }) => {
      if (reduced) return
      fadeUp(self.querySelectorAll('[data-word] > span'), self, {
        stagger: 0.05,
        y: '100%',
        delay,
      })
    },
    [reduced, text, delay],
  )

  return (
    <span ref={ref as never} className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} data-word className="inline-block overflow-hidden align-bottom">
          <span className={`inline-block ${wordClassName ?? ''}`}>
            {word}
            {i < text.split(' ').length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </span>
  )
}

/** Counts from zero to `value` when scrolled into view. */
export function CountUp({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}: {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const formatted = `${prefix}${value.toFixed(decimals)}${suffix}`

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const counter = { n: 0 }
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: value,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${counter.n.toFixed(decimals)}${suffix}`
        },
      })
    }, el)

    return () => ctx.revert()
  }, [value, prefix, suffix, decimals, reduced])

  // Rendering the final value means a missed trigger still shows the number.
  return (
    <span ref={ref} className={className}>
      {formatted}
    </span>
  )
}

/**
 * A tall scroll track with a sticky viewport-height child. Used instead of
 * ScrollTrigger.pin — pinning transform-jitters on iOS Safari.
 */
export function StickyTrack({
  children,
  screens = 3,
  className,
  id,
}: {
  children: ReactNode
  screens?: number
  className?: string
  id?: string
}) {
  return (
    <div id={id} className={className} style={{ height: `${screens * 100}vh`, position: 'relative' }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        {children}
      </div>
    </div>
  )
}
