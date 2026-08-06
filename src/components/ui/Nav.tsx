import { useEffect, useState } from 'react'
import { beats, brand } from '@/data/deck'

/**
 * A single persistent top bar — wordmark left, toggle right — that opens a
 * full-screen black menu. Replaces the old per-section logo/year stamps and
 * side dot-rail; the page now reads as one continuous site, not eleven slides.
 */
export function Nav() {
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      setProgress(doc.scrollTop / Math.max(1, doc.scrollHeight - doc.clientHeight))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
        <div
          className="h-full origin-left bg-crimson transition-transform duration-150"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 mix-blend-difference sm:px-8 sm:py-7">
        <a href="#title" className="font-display text-sm font-extrabold uppercase tracking-wide text-white">
          {brand.name}
        </a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="font-display text-xs font-bold uppercase tracking-[0.2em] text-white"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </header>

      <div
        className={`fixed inset-0 z-[55] flex flex-col justify-center bg-black px-5 transition-[clip-path] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] sm:px-12 ${
          open ? '[clip-path:circle(150%_at_100%_0%)]' : '[clip-path:circle(0%_at_100%_0%)]'
        }`}
      >
        <nav aria-label="Sections" className="mx-auto w-full max-w-2xl">
          <ul className="space-y-2 sm:space-y-3">
            {beats.map((beat, i) => (
              <li key={beat.id}>
                <a
                  href={`#${beat.id}`}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4 py-1.5"
                >
                  <span className="font-display text-xs font-bold text-crimson">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-3xl font-extrabold uppercase tracking-tight text-white transition-colors group-hover:text-crimson sm:text-5xl">
                    {beat.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
