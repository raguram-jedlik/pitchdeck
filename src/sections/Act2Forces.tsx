import { Reveal } from '@/components/motion'
import { DeckFrame, SilhouetteHeading } from '@/components/ui'
import { funding, team, type FundingStage } from '@/data/deck'
import { gsap, useGsap, useReducedMotion } from '@/lib/motion'

function Portrait({
  src,
  name,
  size = 'lg',
}: {
  src: string
  name: string
  size?: 'lg' | 'md'
}) {
  return (
    <div
      className={`overflow-hidden rounded-full border-[3px] border-ink bg-white ${
        size === 'lg' ? 'h-28 w-28 sm:h-40 sm:w-40' : 'h-24 w-24 sm:h-36 sm:w-36'
      }`}
    >
      <img src={src} alt={name} loading="lazy" className="h-full w-full object-cover" />
    </div>
  )
}

/** Beat 4 — founders and mentors. */
export function TeamSection() {
  return (
    <section id="team" className="ground ground-vignette relative overflow-hidden px-5 py-24 sm:py-32">
      <DeckFrame />
      <div className="relative z-10 mx-auto max-w-deck pt-12 sm:pt-16">
        <SilhouetteHeading lead={team.heading} tail={team.headingTail} />

        <Reveal className="mt-14 grid grid-cols-1 gap-10 sm:mt-20 sm:grid-cols-3" stagger={0.12}>
          {team.founders.map((person) => (
            <div key={person.name} className="flex flex-col items-center gap-4 text-center">
              <Portrait src={person.image} name={person.name} />
              <div>
                <h3 className="font-display text-base font-bold uppercase text-crimson sm:text-lg">
                  {person.name}
                </h3>
                <p className="mt-1 font-display text-xs uppercase tracking-wide text-navy sm:text-sm">
                  {person.role}
                </p>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-12 sm:mt-16" y={12}>
          <p className="rounded-lg bg-navy px-5 py-3 text-center font-display text-[0.7rem] font-semibold uppercase leading-relaxed tracking-wide text-white sm:text-sm">
            {team.band}
          </p>
        </Reveal>

        <Reveal className="mt-14 grid grid-cols-1 gap-10 sm:mt-20 sm:grid-cols-3" stagger={0.12}>
          {team.mentors.map((person) => (
            <div key={person.name} className="flex flex-col items-center gap-4 text-center">
              <Portrait src={person.image} name={person.name} size="md" />
              <div>
                <h3 className="font-display text-sm font-bold uppercase text-crimson sm:text-base">
                  {person.name}
                </h3>
                <p className="mt-1 font-display text-xs font-bold uppercase tracking-wide text-navy">
                  {person.role}
                </p>
                <p className="mx-auto mt-1 max-w-[28ch] text-xs leading-snug text-navy-soft">
                  {person.detail}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function StageCard({ stage }: { stage: FundingStage }) {
  const past = stage.past

  return (
    <article
      data-stage
      className={`flex w-[80vw] shrink-0 snap-center flex-col rounded-3xl border-2 bg-white p-6 sm:w-[19rem] ${
        stage.now ? 'border-crimson shadow-[0_0_0_4px_rgba(209,10,60,0.12)]' : 'border-ink'
      } ${past ? 'sm:w-[15rem] sm:self-start' : ''}`}
    >
      {stage.now && (
        <span className="mb-4 self-center rounded-full bg-crimson px-5 py-1 font-display text-xs font-bold uppercase tracking-wider text-white">
          Now
        </span>
      )}

      {past ? (
        <div className="flex items-center gap-3">
          <span className="h-4 w-4 rounded-full" style={{ backgroundColor: stage.dot }} />
          <span className="font-display text-sm font-bold uppercase text-ink">{stage.fy}</span>
        </div>
      ) : (
        <div
          className="mx-auto flex h-24 w-24 flex-col items-center justify-center rounded-full text-center font-display text-[0.7rem] font-bold uppercase leading-tight text-white sm:h-28 sm:w-28 sm:text-xs"
          style={{ backgroundColor: stage.dot }}
        >
          <span>{stage.fy}</span>
          <span>{stage.stage}</span>
        </div>
      )}

      {!past && (
        <div className="mt-5 font-display text-sm font-bold uppercase sm:text-base">
          {stage.ask && (
            <p className="text-navy-soft">
              Ask <span className="text-crimson">{stage.ask}</span>
            </p>
          )}
          {stage.valuation && (
            <p className="text-navy-soft">
              Valuation <span className="text-crimson">{stage.valuation}</span>
            </p>
          )}
          {stage.returnMultiple && (
            <p className="text-navy-soft">
              Return <span className="text-crimson">{stage.returnMultiple}</span>
            </p>
          )}
        </div>
      )}

      <ul
        className={`space-y-1.5 text-sm leading-snug text-navy ${
          past ? 'mt-3' : 'mt-4 border-t border-navy-soft/25 pt-4'
        }`}
      >
        {stage.milestones.map((m) => (
          <li key={m} className="flex gap-2">
            <span aria-hidden="true">•</span>
            <span>{m}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

/**
 * Beat 5 — the funding timeline.
 *
 * Desktop drags the row sideways as you scroll down; mobile is a plain
 * snap-scroll carousel, which behaves far better than a scrubbed transform
 * on iOS Safari.
 */
export function FundingSection() {
  const reduced = useReducedMotion()
  const ref = useGsap(
    ({ self }) => {
      const row = self.querySelector<HTMLElement>('[data-row]')
      if (!row || reduced) return

      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const distance = () => Math.max(0, row.scrollWidth - self.clientWidth + 80)
        gsap.to(row, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: self.parentElement!,
            start: 'top top',
            end: () => `+=${distance() + window.innerHeight * 0.5}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
      })

      return () => mm.revert()
    },
    [reduced],
  )

  return (
    <section id="funding" className="ground ground-vignette relative md:h-[420vh]">
      <div className="sticky top-0 flex min-h-[100svh] flex-col justify-center overflow-hidden py-20 md:h-[100svh]">
        <DeckFrame />
        <div className="relative z-10 px-5 pt-10">
          <SilhouetteHeading lead={funding.heading} tail={funding.headingTail} />
        </div>

        <div ref={ref} className="relative z-10 mt-10 overflow-hidden sm:mt-14">
          <div
            data-row
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:snap-none md:overflow-visible md:px-10"
          >
            {funding.stages.map((stage) => (
              <StageCard key={`${stage.fy}-${stage.stage}`} stage={stage} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
