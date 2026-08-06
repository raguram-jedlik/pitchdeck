import { Fragment } from 'react'
import { CountUp, Reveal } from '@/components/motion'
import { ContactIcon, SectionHeading } from '@/components/ui'
import { brand, close, market, personas } from '@/data/deck'
import { gsap, useGsap, useReducedMotion } from '@/lib/motion'

/** Beat 9 — TAM/SAM/SOM, India, and where the product travels next. */
export function MarketSection() {
  const reduced = useReducedMotion()
  const ref = useGsap(
    ({ self }) => {
      if (reduced) return
      gsap.from(self.querySelectorAll('[data-bar]'), {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: self.querySelector('[data-bars]')!, start: 'top 80%', once: true },
      })
    },
    [reduced],
  )

  const maxValue = Math.max(...market.next.map((n) => n.value))

  return (
    <section id="market" className="ground ground-vignette relative overflow-hidden px-5 py-24 sm:py-32">
      <div ref={ref} className="relative z-10 mx-auto max-w-deck pt-12 sm:pt-16">
        <SectionHeading>{market.heading}</SectionHeading>
        <p className="mt-3 text-center font-display text-sm font-bold text-navy sm:text-lg">
          {market.subheading}
        </p>

        <p className="eyebrow mt-14 text-crimson">Global market size</p>
        <Reveal
          className="mt-4 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr]"
          stagger={0.14}
        >
          {market.funnel.map((step, i) => (
            <Fragment key={step.key}>
              <div className="rounded-2xl border-2 border-ink bg-mist-warm p-5">
                <p className="font-display text-xs font-bold uppercase tracking-wide text-navy">
                  {step.key}
                </p>
                <p className="font-display text-2xl font-extrabold text-crimson sm:text-3xl">
                  {step.value}
                </p>
                <p className="mt-2 text-sm leading-snug text-navy">{step.detail}</p>
              </div>
              {i < market.funnel.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden self-center font-display text-2xl font-black text-ink sm:block"
                >
                  ›››
                </span>
              )}
            </Fragment>
          ))}
        </Reveal>

        <p className="eyebrow mt-14 text-crimson">India</p>
        <Reveal className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {market.india.map((stat) => (
            <div
              key={stat.detail}
              className="rounded-2xl border-2 border-ink p-5"
              style={{ backgroundColor: stat.fill }}
            >
              <p className="font-display text-3xl font-extrabold text-crimson">
                <CountUp
                  value={stat.value}
                  prefix={'prefix' in stat ? (stat.prefix as string) : ''}
                  suffix={stat.suffix}
                  decimals={stat.value % 1 === 0 ? 0 : 2}
                />
              </p>
              <p className="mt-2 text-sm leading-snug text-navy">{stat.detail}</p>
            </div>
          ))}
        </Reveal>

        <p className="eyebrow mt-14 text-crimson">{market.nextHeading}</p>
        <div data-bars className="card mt-4 space-y-3 p-5">
          {market.next.map((row) => (
            <div key={row.country} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-right font-display text-[0.65rem] font-bold uppercase leading-tight text-ink sm:w-40 sm:text-xs">
                {row.country}
              </span>
              <span
                data-bar
                className="h-5 rounded-sm sm:h-6"
                style={{
                  width: `${(row.value / maxValue) * 100}%`,
                  backgroundColor: row.fill,
                }}
              />
              <span className="font-display text-xs font-bold text-crimson sm:text-sm">
                {row.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ShareDonut({ share, accent }: { share: number; accent: string }) {
  const reduced = useReducedMotion()
  const circumference = 2 * Math.PI * 40
  const ref = useGsap(
    ({ self }) => {
      if (reduced) return
      gsap.from(self.querySelector('[data-arc]'), {
        strokeDashoffset: circumference,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: { trigger: self, start: 'top 85%', once: true },
      })
    },
    [reduced, share],
  )

  return (
    <div ref={ref as never} className="relative mx-auto h-32 w-32">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#C4C4C4" strokeWidth="16" />
        <circle
          data-arc
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={accent}
          strokeWidth="16"
          strokeDasharray={`${(share / 100) * circumference} ${circumference}`}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center text-center font-display text-[0.65rem] font-bold leading-tight text-navy">
        {share}% of
        <br />
        TAM
      </span>
    </div>
  )
}

/** Beat 10 — the three buyers. */
export function PersonasSection() {
  return (
    <section id="personas" className="ground ground-vignette relative overflow-hidden px-5 py-24 sm:py-32">
      <div className="relative z-10 mx-auto max-w-deck pt-12 sm:pt-16">
        <SectionHeading>{personas.heading}</SectionHeading>

        <Reveal className="mt-14 grid grid-cols-1 gap-6 sm:mt-20 lg:grid-cols-3" stagger={0.14}>
          {personas.items.map((persona) => (
            <article
              key={persona.name}
              className="flex flex-col rounded-3xl border-2 border-ink p-6"
              style={{ backgroundColor: persona.fill }}
            >
              <h3
                className="text-center font-display text-base font-bold uppercase sm:text-lg"
                style={{ color: persona.accent }}
              >
                {persona.name}
              </h3>
              <p className="mt-3 text-center text-sm text-navy">{persona.profile}</p>

              <div className="my-6">
                <ShareDonut share={persona.share} accent={persona.accent} />
              </div>

              <dl className="space-y-3 text-sm">
                {persona.rows.map((row) => (
                  <div key={row.k}>
                    <dt className="font-display text-[0.7rem] font-bold uppercase tracking-wide text-crimson">
                      {row.k}
                    </dt>
                    <dd className="leading-snug text-navy">{row.v}</dd>
                  </div>
                ))}
              </dl>

              <p
                className="mt-6 rounded-full border-2 border-ink py-2 text-center font-display text-sm font-bold text-white"
                style={{ backgroundColor: persona.accent }}
              >
                {persona.ltv}
              </p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/** Beat 11 — the close. */
export function CloseSection() {
  return (
    <section
      id="close"
      className="relative overflow-hidden bg-black px-5 py-24 sm:py-32"
    >

      <div className="relative z-10 mx-auto max-w-deck pt-12 sm:pt-16">
        <Reveal stagger={0.14}>
          <h2 className="display-lg text-white">{close.thanks}</h2>
          <p className="display-lg mt-4 text-white">
            {close.lineLead} <span className="text-lime">{close.lineAccent}</span> {close.lineTail}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[auto_1fr] lg:gap-14">
          <Reveal as="ul" className="space-y-5" stagger={0.09}>
            {close.contact.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group flex items-center gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black">
                    <ContactIcon name={item.icon} className="h-5 w-5 text-white" />
                  </span>
                  <span className="font-body text-sm text-white underline underline-offset-4 transition-colors group-hover:text-lime sm:text-base">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </Reveal>

          <Reveal className="grid grid-cols-2 gap-2 sm:grid-cols-4" stagger={0.07}>
            {close.buildPhotos.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`Building the e-POD prototype, ${i + 1} of ${close.buildPhotos.length}`}
                loading="lazy"
                className="h-28 w-full rounded-sm border-2 border-black object-cover sm:h-32"
              />
            ))}
          </Reveal>
        </div>

        <Reveal className="mt-16 flex flex-col items-center gap-4" y={12}>
          <span className="font-body text-xs text-white/70">Supported by</span>
          <img
            src={close.supporters}
            alt="Anna Incubator, DPIIT Startup India, MAARG, DST NIDHI PRAYAS, EDII-TN, Startup India Seed Fund Scheme"
            loading="lazy"
            className="w-full max-w-3xl rounded bg-white/95 px-4 py-2"
          />
        </Reveal>

        <p className="mt-14 text-center font-body text-xs text-white/60">
          {brand.name} Private Limited · {brand.year} · Figures are forward-looking projections, not
          commitments.
        </p>
      </div>
    </section>
  )
}
