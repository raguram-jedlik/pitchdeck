import { Reveal } from '@/components/motion'
import { DeckFrame, SectionHeading } from '@/components/ui'
import { reveal, tease, tech } from '@/data/deck'
import { gsap, useGsap, useReducedMotion } from '@/lib/motion'

/** Beat 6 — the tease. The blur pulls to zero as you scroll through. */
export function TeaseSection() {
  const reduced = useReducedMotion()
  const ref = useGsap(
    ({ self }) => {
      if (reduced) return
      gsap.fromTo(
        self.querySelector('[data-blur]'),
        { filter: 'blur(26px)', scale: 1.15 },
        {
          filter: 'blur(6px)',
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: self, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    },
    [reduced],
  )

  return (
    <section
      id="tease"
      ref={ref}
      className="ground relative flex min-h-[100svh] items-center overflow-hidden px-5 py-24"
    >
      <img
        data-blur
        src="/assets/epod-blur.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ filter: 'blur(14px)' }}
      />
      <DeckFrame />

      <Reveal className="relative z-10 mx-auto w-full max-w-4xl space-y-4 sm:space-y-6" stagger={0.18}>
        <p className="display-lg text-navy">{tease.line1}</p>
        <p className="display-lg text-navy">
          <span className="text-crimson">{tease.line2Lead}</span> {tease.line2Tail}
        </p>
        <p className="display-lg text-navy">{tease.line3}</p>
      </Reveal>
    </section>
  )
}

/** Beat 7 — the payoff. */
export function RevealSection() {
  const reduced = useReducedMotion()
  const ref = useGsap(
    ({ self }) => {
      if (reduced) return
      const tl = gsap.timeline({
        scrollTrigger: { trigger: self, start: 'top 60%', once: true },
      })
      tl.from(self.querySelector('[data-hero]'), {
        scale: 1.18,
        opacity: 0,
        duration: 1.3,
        ease: 'power3.out',
      })
        .from(
          self.querySelectorAll('[data-mark]'),
          { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
          '-=0.8',
        )
        .from(
          self.querySelectorAll('[data-callout]'),
          { opacity: 0, x: (i) => (i % 2 === 0 ? 24 : -24), duration: 0.5, stagger: 0.12 },
          '-=0.3',
        )
    },
    [reduced],
  )

  const left = reveal.callouts.filter((c) => c.side === 'left')
  const right = reveal.callouts.filter((c) => c.side === 'right')

  return (
    <section id="reveal" ref={ref} className="relative overflow-hidden bg-white">
      <DeckFrame />

      <div className="relative">
        <img
          data-hero
          src={reveal.image}
          alt="The Jedlik e-POD — a fully enclosed two-wheeled electric vehicle"
          width={1365}
          height={768}
          className="h-[62svh] w-full object-cover sm:h-auto sm:max-h-[100svh]"
        />

        <div className="pointer-events-none absolute inset-x-0 top-14 z-20 text-center sm:top-20">
          <p data-mark className="eyebrow text-ink">
            {reveal.eyebrow}
          </p>
          <p
            data-mark
            className="font-display font-extrabold uppercase italic text-crimson"
            style={{ fontSize: 'clamp(3rem, 11vw, 8rem)', letterSpacing: '-0.02em' }}
          >
            {reveal.wordmark}
          </p>
        </div>

        {/* Leader lines only make sense at desktop width. */}
        <div className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
          {reveal.callouts.map((c) => (
            <div
              key={c.label}
              data-callout
              className={`absolute flex items-center gap-2 ${
                c.side === 'left' ? 'flex-row-reverse' : ''
              }`}
              style={{
                left: c.side === 'left' ? 'auto' : `${c.x}%`,
                right: c.side === 'left' ? `${100 - c.x}%` : 'auto',
                top: `${c.y}%`,
              }}
            >
              <span className="h-[2px] w-16 bg-ink lg:w-24" />
              <span className="whitespace-nowrap font-display text-xs font-bold uppercase text-crimson lg:text-sm">
                {c.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: the same callouts as an honest list. */}
      <Reveal
        as="ul"
        className="grid grid-cols-2 gap-x-4 gap-y-3 px-5 py-10 sm:hidden"
        stagger={0.06}
      >
        {[...left, ...right].map((c) => (
          <li
            key={c.label}
            className="border-l-2 border-crimson pl-3 font-display text-xs font-bold uppercase leading-tight text-crimson"
          >
            {c.label}
          </li>
        ))}
      </Reveal>
    </section>
  )
}

/**
 * The three crab-walk modes, drawn as a top-down chassis whose wheels really
 * rotate to their steering angles. This is the thing the PDF can't do.
 *
 * The steering is CSS rather than GSAP so that the *resting* state is the
 * steered angle: when animation is switched off for reduced motion, the three
 * modes still read as three genuinely different geometries.
 */
function WheelMode({ name, front, rear }: { name: string; front: number; rear: number }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 90 150" className="h-36 w-auto sm:h-44" aria-hidden="true">
        <rect x="24" y="18" width="42" height="114" rx="10" fill="#7C7A74" />
        <g className="wheel" style={{ '--angle': `${front}deg` } as React.CSSProperties}>
          <rect x="36" y="2" width="18" height="34" rx="7" fill="#111417" />
        </g>
        <g
          className="wheel"
          style={{ '--angle': `${rear}deg`, animationDelay: '0.12s' } as React.CSSProperties}
        >
          <rect x="36" y="114" width="18" height="34" rx="7" fill="#111417" />
        </g>
      </svg>
      <span className="text-center font-display text-[0.6rem] font-bold uppercase leading-tight text-navy sm:text-sm">
        {name}
      </span>
    </div>
  )
}

/** Beat 8 — how two wheels stay upright and park sideways. */
export function TechSection() {
  return (
    <section id="tech" className="ground ground-vignette relative overflow-hidden px-5 py-24 sm:py-32">
      <DeckFrame />
      <div className="relative z-10 mx-auto max-w-deck pt-12 sm:pt-16">
        <SectionHeading>{tech.heading}</SectionHeading>

        <div className="mt-14 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-2 md:gap-10 md:divide-x-2 md:divide-ink">
          <Reveal className="flex flex-col items-center md:pr-10">
            <span className="chip bg-lime">{tech.steerByWire.label}</span>
            <div className="mt-8 w-full rounded-3xl border-2 border-ink bg-white p-4">
              <img
                src="/assets/steer-by-wire.png"
                alt="Mechanical steering column compared with steer-by-wire"
                loading="lazy"
                className="w-full"
              />
            </div>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-navy sm:text-base">
              {tech.steerByWire.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="flex flex-col items-center md:pl-10">
            <span className="chip bg-orange-300">{tech.crabWalk.label}</span>
            <div className="mt-8 grid w-full grid-cols-3 gap-2 rounded-3xl border-2 border-ink bg-mist-warm p-4">
              {tech.crabWalk.modes.map((mode) => (
                <WheelMode key={mode.name} name={mode.name} front={mode.front} rear={mode.rear} />
              ))}
            </div>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-navy sm:text-base">
              {tech.crabWalk.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
