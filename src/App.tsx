import { useEffect, useState } from 'react'
import { beats } from '@/data/deck'
import { ScrollTrigger, useLenis, useReducedMotion } from '@/lib/motion'
import { Silhouette } from '@/components/ui'
import { NeedsSection, PositioningSection, TitleSection } from '@/sections/Act1Setup'
import { FundingSection, TeamSection } from '@/sections/Act2Forces'
import { RevealSection, TeaseSection, TechSection } from '@/sections/Act3Reveal'
import { CloseSection, MarketSection, PersonasSection } from '@/sections/Act4Market'

const REVEAL_INDEX = beats.findIndex((b) => b.id === 'reveal')

/**
 * The rail on the right, plus the marker that carries the withheld vehicle.
 * Once you pass the reveal, the silhouette is replaced by the real thing.
 */
function ProgressRail() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const sections = beats
      .map((b) => document.getElementById(b.id))
      .filter((el): el is HTMLElement => el !== null)

    const onScroll = () => {
      const doc = document.documentElement
      setProgress(doc.scrollTop / Math.max(1, doc.scrollHeight - doc.clientHeight))

      const mid = window.innerHeight * 0.45
      let current = 0
      sections.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= mid) current = i
      })
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const revealed = active >= REVEAL_INDEX

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent">
        <div
          className="h-full origin-left bg-crimson transition-transform duration-150"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <nav
        aria-label="Sections"
        className="fixed right-2 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
      >
        <span className="mb-1 mr-1 text-ink" aria-hidden="true">
          {revealed ? (
            <img
              src="/assets/epod-reveal.jpg"
              alt=""
              className="h-9 w-14 rounded-sm border border-ink object-cover"
            />
          ) : (
            <Silhouette size={48} />
          )}
        </span>

        {beats.map((beat, i) => (
          <a
            key={beat.id}
            href={`#${beat.id}`}
            className="group flex items-center gap-2 pr-1"
            aria-current={i === active ? 'true' : undefined}
          >
            <span className="pointer-events-none font-display text-[0.6rem] font-bold uppercase tracking-wide text-navy opacity-0 transition-opacity group-hover:opacity-100">
              {beat.label}
            </span>
            <span
              className={`block rounded-full transition-all ${
                i === active ? 'h-2.5 w-2.5 bg-crimson' : 'h-1.5 w-1.5 bg-navy-soft/45'
              }`}
            />
          </a>
        ))}
      </nav>
    </>
  )
}

export default function App() {
  const reduced = useReducedMotion()
  useLenis(!reduced)

  // Images settle after mount and change section heights; recompute triggers
  // once the page has loaded so every start/end position is correct.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    const id = window.setTimeout(refresh, 400)
    window.addEventListener('load', refresh)
    return () => {
      window.clearTimeout(id)
      window.removeEventListener('load', refresh)
    }
  }, [])

  return (
    <main>
      <ProgressRail />
      <TitleSection />
      <NeedsSection />
      <PositioningSection />
      <TeamSection />
      <FundingSection />
      <TeaseSection />
      <RevealSection />
      <TechSection />
      <MarketSection />
      <PersonasSection />
      <CloseSection />
    </main>
  )
}
