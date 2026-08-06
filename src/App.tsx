import { useEffect } from 'react'
import { ScrollTrigger, useLenis, useReducedMotion } from '@/lib/motion'
import { Nav } from '@/components/ui/Nav'
import { NeedsSection, PositioningSection, TitleSection } from '@/sections/Act1Setup'
import { FundingSection, TeamSection } from '@/sections/Act2Forces'
import { RevealSection, TeaseSection, TechSection } from '@/sections/Act3Reveal'
import { CloseSection, MarketSection, PersonasSection } from '@/sections/Act4Market'

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
      <Nav />
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
