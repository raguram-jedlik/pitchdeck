import { CountUp, Reveal, RevealText } from '@/components/motion'
import { NeedIcon, SectionHeading, Silhouette } from '@/components/ui'
import { Hero3D } from '@/components/three/Hero3D'
import { needs, positioning, title } from '@/data/deck'
import { gsap, useGsap, useReducedMotion } from '@/lib/motion'

/** Beat 1 — a 3D shape standing in for the vehicle, and who we are. */
export function TitleSection() {
  return (
    <section
      id="title"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-white px-5 py-24"
    >
      <Hero3D className="pointer-events-none absolute inset-0 h-full w-full" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="display-hero text-crimson">
          <RevealText text={title.heading} />
        </h1>

        <p className="display-md mx-auto mt-6 max-w-2xl text-navy sm:mt-8">
          <RevealText text={title.subheading} delay={0.3} />
        </p>

        <Reveal className="mt-10 sm:mt-16" y={16}>
          <p className="mx-auto max-w-2xl font-display text-xs uppercase leading-relaxed tracking-[0.06em] text-navy sm:text-sm">
            {title.note}
          </p>
        </Reveal>
      </div>

      <span className="eyebrow absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-pulse">
        Scroll
      </span>
    </section>
  )
}

/** Beat 2 — the eleven things a commuter actually wants. */
export function NeedsSection() {
  return (
    <section
      id="needs"
      className="ground ground-vignette relative overflow-hidden px-5 py-24 sm:py-32"
    >
      <div className="relative z-10 mx-auto max-w-deck pt-12 sm:pt-16">
        <SectionHeading>{needs.heading}</SectionHeading>
        <p className="display-md mt-4 text-center text-navy">{needs.subheading}</p>

        <Reveal
          as="ul"
          className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:mt-20 sm:grid-cols-3 lg:grid-cols-6"
          stagger={0.06}
        >
          {needs.items.map((item) => (
            <li key={item.label} className="flex flex-col items-center gap-3 text-center">
              <span className="font-display text-sm font-bold uppercase leading-tight text-crimson sm:text-base">
                {item.label}
              </span>
              <NeedIcon name={item.icon} className="h-10 w-10 text-ink sm:h-12 sm:w-12" />
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/** Beat 3 — the positioning map, with the empty quadrant Jedlik lands in. */
export function PositioningSection() {
  const reduced = useReducedMotion()
  const ref = useGsap(
    ({ self }) => {
      if (reduced) return
      const tl = gsap.timeline({
        scrollTrigger: { trigger: self, start: 'top 65%', once: true },
      })
      tl.from(self.querySelectorAll('[data-axis]'), {
        scaleX: 0,
        scaleY: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.12,
      })
        .from(
          self.querySelectorAll('[data-rival]'),
          { opacity: 0, scale: 0.4, duration: 0.5, ease: 'back.out(2)', stagger: 0.13 },
          '-=0.2',
        )
        // The silhouette lands last, alone, in the empty quadrant.
        .from(
          self.querySelector('[data-jedlik]'),
          { opacity: 0, y: -40, scale: 0.5, duration: 0.9, ease: 'back.out(1.7)' },
          '+=0.25',
        )
    },
    [reduced],
  )

  return (
    <section
      id="positioning"
      className="ground ground-vignette relative overflow-hidden px-5 py-24 sm:py-32"
    >
      <div ref={ref} className="relative z-10 mx-auto max-w-deck pt-12 sm:pt-16">
        <SectionHeading>{positioning.heading}</SectionHeading>

        <div className="relative mx-auto mt-12 aspect-[4/3] w-full max-w-3xl sm:mt-16">
          {/* Axes */}
          <div
            data-axis
            className="absolute left-1/2 top-0 h-full w-[2px] origin-center -translate-x-1/2 bg-ink"
          />
          <div
            data-axis
            className="absolute left-0 top-1/2 h-[2px] w-full origin-center -translate-y-1/2 bg-ink"
          />

          <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-6 font-display text-[0.65rem] font-bold text-crimson sm:text-sm">
            {positioning.axes.y}
          </span>
          <span className="absolute right-0 top-1/2 -translate-y-6 font-display text-[0.65rem] font-bold text-crimson sm:text-sm">
            {positioning.axes.x}
          </span>

          {/* Quadrant labels */}
          <span className="absolute left-0 top-[18%] w-20 break-words font-display text-[0.55rem] font-bold uppercase leading-tight text-crimson/70 sm:w-auto sm:text-xs">
            {positioning.quadrants.topLeft}
          </span>
          <span className="absolute right-0 top-[18%] w-20 break-words text-right font-display text-[0.55rem] font-bold uppercase leading-tight text-crimson/70 sm:w-auto sm:text-xs">
            {positioning.quadrants.topRight}
          </span>
          <span className="absolute bottom-0 left-0 w-20 break-words font-display text-[0.55rem] font-bold uppercase leading-tight text-crimson/70 sm:w-auto sm:text-xs">
            {positioning.quadrants.bottomLeft}
          </span>
          <span className="absolute bottom-0 right-0 w-20 break-words text-right font-display text-[0.55rem] font-bold uppercase leading-tight text-crimson/70 sm:w-auto sm:text-xs">
            {positioning.quadrants.bottomRight}
          </span>

          {positioning.rivals.map((rival) => (
            <div
              key={rival.name}
              data-rival
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
              style={{ left: `${rival.x}%`, top: `${100 - rival.y}%` }}
            >
              <span
                className="h-3 w-3 rounded-full sm:h-4 sm:w-4"
                style={{ backgroundColor: rival.dot }}
              />
              <span className="whitespace-nowrap font-display text-[0.55rem] font-bold text-ink sm:text-xs">
                {rival.name}
              </span>
              <img
                src={rival.image}
                alt={rival.name}
                loading="lazy"
                className="hidden h-7 w-auto object-contain sm:block sm:h-11"
              />
            </div>
          ))}

          <div
            data-jedlik
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
            style={{
              left: `${positioning.jedlik.x}%`,
              top: `${100 - positioning.jedlik.y}%`,
            }}
          >
            <Silhouette className="text-ink" size={54} />
            <span
              className="h-3 w-3 rounded-full sm:h-4 sm:w-4"
              style={{ backgroundColor: positioning.jedlik.dot }}
            />
            <span className="font-display text-[0.6rem] font-bold text-ink sm:text-sm">
              {positioning.jedlik.name}
            </span>
          </div>
        </div>

        <p className="mt-10 text-center font-display text-xs uppercase tracking-[0.16em] text-navy-soft">
          One quadrant is empty. <CountUp value={7} className="text-crimson" /> serious attempts,
          none of them there.
        </p>
      </div>
    </section>
  )
}
