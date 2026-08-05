import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

/** SSR-safe layout effect. */
export const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * True when the visitor has asked for reduced motion. Every animated component
 * reads this and renders its final state directly instead of animating.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/**
 * One Lenis instance for the page, driving ScrollTrigger. Skipped entirely
 * under reduced motion so the browser's native scroll is left alone.
 */
export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [enabled])
}

/**
 * Scopes a GSAP context to a container ref so every tween and ScrollTrigger
 * created inside is reverted on unmount. `deps` behaves like useEffect's.
 */
export function useGsap(
  setup: (ctx: { self: HTMLElement }) => void,
  deps: unknown[] = [],
): React.RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null)

  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => setup({ self: el }), el)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}

/**
 * Standard entrance: fade up on enter, played once.
 *
 * `once: true` and `invalidateOnRefresh` matter here — a trigger that fails to
 * fire must never leave content permanently invisible, so callers under reduced
 * motion skip this entirely rather than relying on it.
 */
export function fadeUp(
  targets: gsap.TweenTarget,
  trigger: Element,
  opts: { stagger?: number; y?: number | string; delay?: number; start?: string } = {},
) {
  return gsap.from(targets, {
    opacity: 0,
    y: opts.y ?? 28,
    duration: 0.9,
    ease: 'power3.out',
    stagger: opts.stagger ?? 0.08,
    delay: opts.delay ?? 0,
    scrollTrigger: {
      trigger,
      start: opts.start ?? 'top 78%',
      once: true,
      invalidateOnRefresh: true,
    },
  })
}
