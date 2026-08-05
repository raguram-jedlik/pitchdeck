# Jedlik Motors — Interactive Pitchdeck Website

**Date:** 2026-08-05
**Status:** Approved design, ready for implementation planning

## Purpose

A mobile-first, scroll-driven website that presents the Jedlik Motors investor
pitch as a continuous narrative rather than a slide deck. The audience is
investors receiving a link — often on a phone, often without a live presenter.

The source of truth for content is `Pitch Deck-2.pdf` (11 slides, 2026). An
older MVP deck exists and is explicitly **out of scope** — do not pull content,
figures, or styling from it.

The animation reference is [breakthroughenergy.org](https://www.breakthroughenergy.org).

## The core idea

The deck withholds the product. On the positioning map, in "the forces that
will bring **?** alive", and in "the fuel needed to bring **?** alive", the
vehicle appears only as a blacked-out silhouette with a question mark. Slide 6
teases the unveil; slide 7 reveals the e-POD.

**That withholding is the spine of the site.** The silhouette persists in the
sticky header through beats 1–6 and morphs into the real e-POD render at the
reveal. Every beat before it builds pressure; every beat after pays it off.

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Location | New standalone site in the `pitchdeck` repo | Clean separation from the marketing site, which syncs with Lovable and can reach production without review |
| Stack | Vite + React 18 + TypeScript + Tailwind | Matches the team's existing stack |
| Animation | GSAP ScrollTrigger + Lenis | ScrollTrigger for scroll-driven timelines; Lenis for the inertial smooth-scroll that defines the reference site's feel |
| Navigation | Continuous scroll, one route | Reads as a modern site on a phone rather than a deck being swiped |
| Palette | Light, faithful to the deck | The deck is light; the reference site proves this scroll language works on off-white grounds |
| Investor ask | Included, public | Simplest to share; the ask is already in the deck being circulated |

## Visual system

### Colour

| Token | Value | Use |
|---|---|---|
| `crimson` | `#D10A3C` | Primary accent — headings, key figures, the wordmark |
| `crimson-deep` | `#8E0526` | Gradient partner for the closing section |
| `navy` | `#2B3340` | Body and secondary heading type |
| `mist` | `#DCE3EA` → `#EFEAE4` | The soft blue-grey → warm-grey gradient grounds |
| `paper` | `#FFFFFF` | Cards, panels |
| `lime` | `#B8E62E` | Sparing accent — steer-by-wire chip, "move differently" |
| `ink` | `#111417` | The `?` silhouette, photo-grid frames |

Persona and market sections carry their own pastel card fills, taken from the
deck (green / yellow / pink for personas; green for the TAM funnel; blue-violet
for the India stats).

### Type

- **Poppins** — geometric display caps, matching the deck's headings.
- **DM Sans** — body copy.
- The `E-POD` wordmark on the reveal is a heavy italic condensed treatment,
  set as display type rather than an image so it stays crisp.

Self-host both via `@fontsource` — no render-blocking request to Google Fonts.

### Recurring motifs

- Logo lockup with the "Redefine the class." tagline, top-left, persistent.
- Year marker `2026`, top-right.
- The `?` silhouette, which becomes the site's progress indicator.

## Narrative structure

Each beat is one component in `src/sections/`.

### 1. Title — `TitleSection`

Pencil-sketch street scene. Sketch strokes draw in via SVG stroke-dashoffset,
crimson `JEDLIK MOTORS` staggers up word by word.

- H1: JEDLIK MOTORS
- H2: We are redefining the way the world commutes in cities
- Body: Jedlik is named after Ányos Jedlik, who built the world's first electric
  motor in 1828. We're continuing that legacy on Indian roads.

### 2. Needs — `NeedsSection`

- H1: What does an urban commuter really need?
- H2: Not just a vehicle. A better way to move.
- Eleven need-icons stagger into place: Higher Speed · Status · Comfort ·
  Android Dashboard · Boot Storage · Weather Protection · Fuel Efficiency ·
  Quick Pickup · Helmet Free Driving · Maneuverable · Easy Parking

Mobile: 2 columns. Desktop: 6 + 5 as in the deck.

### 3. Positioning — `PositioningSection`

- H1: What's on the road today?
- Axes: Comfort (x) × Maneuverability (y)
- Axes draw first, then competitors drop in sequence: MG Comet, PMV Eas-E,
  Lit Motors C-1, Gensol EV/Ezio, Wings Robin, Sina Version-E, T-Shell Bad Boy
- The `?` silhouette lands **last**, alone in the high-comfort /
  high-maneuverability quadrant, labelled `Jedlik`

Mobile: the map keeps its aspect ratio and scales down; labels shorten. It is
never allowed to force horizontal page scroll.

### 4. Team — `TeamSection`

- H1: The forces that will bring **?** alive

Founders — Raguram SK (Founder & CEO), Muthuram B (Co-founder & CTO),
Nishanthraj GV (Co-founder & COO).

Band: *Combined 15+ years experience in automotive design across TVS, Samsung,
Daimler Trucks and Sertel.*

Mentors — Srikanthan Sridharan (Electrical Mentor; Assistant Professor, Dept of
Engineering Design, IIT-M) · Swathi Thombarappu (Mechanical Mentor; EE-Chassis
Electronics & ADAS Expert, VinFast) · Shankar Subramanian (Business Mentor;
Strategic Advisor & Independent Director — Governance, Growth & Business
Advisory).

Portraits open via an expanding circle mask as each enters view.

> The deck's band reads "Serte"; the company is **Sertel**, as named in the
> earlier deck and the marketing site. Corrected here.

### 5. Funding — `FundingSection`

- H1: The fuel needed to bring **?** alive

Horizontally pinned timeline. The **NOW** card settles at centre. Valuations
and return multiples count up as each card enters.

| Stage | Figures | Milestones |
|---|---|---|
| FY2025 | Grants ₹26L | Prototype completed |
| FY2026 Angel | ₹47L, valuation ₹4.67 Cr | MVP in progress |
| **FY2026 Pre-seed — NOW** | **Ask ₹7 Cr · Valuation ₹75 Cr** | MVP completion · Testing & ARAI approval · Pilot production ready · Road-legal homologation |
| FY2027 Seed Launch | Valuation ₹114.6 Cr · 24.5× | Own dark factory · Single city launch · OTA, stack + subsidy |
| FY2028 Series-A | Valuation ₹286.5 Cr · 61.4× | 3× plant capacity · 3 metro expansion · In-house battery assembly |
| FY2029 Series-A2 | Valuation ₹716.3 Cr · 153.4× | Full automation · BLDC motor line · 8 city expansion |
| FY2030 Series-B | Valuation ₹1671.3 Cr · 357.9× | Own battery cell sourcing · 16 city hub · Long range variant |

Mobile: a scroll-snapped horizontal carousel opening on the NOW card, rather
than a pinned timeline — pinning is unreliable on iOS Safari.

### 6. Tease — `TeaseSection`

Blurred vehicle behind; CSS blur drives to zero on scroll progress.

- Once in every generation, **a new class of vehicle** is born.
- Now, we unveil ours…

### 7. Reveal — `RevealSection`

The payoff. Full-bleed desert render scales in; the `E-POD` wordmark lands;
callout leader-lines draw out to their labels in sequence.

Callouts: Fully enclosed · Airbags · Air conditioning · Top speed 120 km/hr ·
200 km range · Pushback seats

Mobile: callouts become a list beneath the render — leader-lines to a
phone-width image are illegible.

### 8. Technology — `TechSection`

- H1: The trick with two wheels

**Steer-by-wire** (lime chip) — No rigid steel column: a computer sends the turn
command through a wire, like a game controller. Lighter, faster, more precise
steering than any mechanical linkage. Shown as mechanical-vs-wire diagram.

**Crab-walk steering** (amber chip) — Front and rear wheels turn the same way at
once, not just the front wheel. The e-POD glides sideways for effortless,
wiggle-free tight parking. Three modes: Front Wheel Drive · Circle · Glide.

The wheel-mode diagrams are inline SVG whose wheels **actually rotate through
their steering angles** on a loop. This is the one thing the site does that the
PDF cannot, and it is the section's reason to exist.

### 9. Market — `MarketSection`

- H1: Market potential
- Sub: India: $517M SAM · World: $1.6B SAM · 2030 forecast

Funnel: TAM **$7.0B/yr** (every 2-wheeler sold worldwide per year, 60M units) →
SAM **$1.6B/yr** (the enclosed, weatherproof segment, 3.5M units globally) →
SOM **$70M ARR** (Jedlik's 2030 target — 0.8M units across 15 countries).

India: **230M** 2-wheelers on Indian roads, the largest fleet in the world ·
**18M** new 2-wheelers sold every year (SIAM 2024) · **1.08M** of those were
electric in 2024, a 6% and rising share · **$517M** is India's enclosed e-2W
opportunity by 2030 (17.8K units).

Where we go next: India $517M · Vietnam + Thailand $86M · Indonesia $63M ·
EU-5 + USA $40M+ · Brazil $8M.

Funnel fills left to right; figures count up; country bars grow from zero.

### 10. Customers — `CustomersSection`

- H1: Target customers

Three persona cards, donut rings sweeping to their TAM share:

**Weather Exposed Commuters — 60% of TAM.** Age 28–45 · salaried · $600–2K/mo.
Tier-1 metros. Currently any open 2W. Trigger: bad monsoon commute. Decides on
enclosed cabin, range, EMI fit, service network. Channel: YouTube, dealer,
influencer, IT-CSR. LTV $3.5–4.5K.

**Family Buyer — 25% of TAM.** Age 30–45 (wife) · family decision ·
$800–2.5K/mo household. India, Indonesia, Vietnam. Often no 2W currently;
auto-rickshaw. Trigger: daughter/son turns 12–14, second child. Decides on
step-in access, storage, brand trust. Channel: women's 2W Facebook groups,
mom-influencers. LTV $3.5–4.5K.

**Premium Aspirant — 15% of TAM.** Age 30–50 · tech-savvy · $2–5K/mo. Premium
metros. Considering a small car or a premium 2W. Trigger: grand launch, wow
test ride. Decides on tech stack, design language, premium service. Channel:
auto-journalist reviews, reservation queue. LTV $5–7K.

### 11. Close — `CloseSection`

Crimson → deep-crimson gradient flood.

- Thank you.
- **The city will move differently from here.** ("move differently" in lime)

Contact: www.jedlik.in · info@jedlik.in · instagram jedlik.in · +91 90940 36915

Build-photo grid assembles on a stagger. Supporter logos: Anna Incubator ·
DPIIT #startupindia · MAARG · DST NIDHI PRAYAS · EDII-TN · Startup India Seed
Fund Scheme.

## Architecture

```
src/
  sections/        one component per narrative beat, listed in order by App.tsx
  components/
    motion/        RevealText, ScaleIn, CountUp, DrawSVG, StickyTrack
    ui/            Chip, Card, LogoLockup, ProgressRail
  hooks/
    useLenis.ts    smooth-scroll setup, one instance
    useReducedMotion.ts
  data/            deck content as typed modules — one per section
  styles/          tokens.css, index.css
public/assets/     images, extracted and optimised
```

Two rules that keep this maintainable:

- **Content lives in `src/data/`, not inside components.** Every figure, name
  and label from the deck is a typed export. A copy change is a data edit; the
  numbers are auditable in one place. The existing marketing site inlines its
  content in 500-line page components — this deliberately does not.
- **Animation lives in `components/motion/`, not inside sections.** Sections
  compose primitives. A section file describes what it says, not how GSAP is
  wired.

`ProgressRail` renders the `?` silhouette and the beat markers, and is the one
component that knows about the whole sequence.

## Motion rules

- **One Lenis instance**, created in `useLenis`, driving `ScrollTrigger.update`.
  Every `ScrollTrigger` registers against it.
- **Sticky over pin.** Long scroll containers with `position: sticky` children,
  not `ScrollTrigger.pin`. Pinning transform-jitters on iOS Safari; the marketing
  site's interior section already uses the sticky approach successfully.
- **`prefers-reduced-motion` is honoured.** All entrance animations resolve to
  their final state immediately; scrubbed sequences become static; the wheel
  loop stops. The page must read completely with zero motion.
- **Nothing is hidden without a trigger.** Any element starting at opacity 0
  must have a ScrollTrigger that reveals it. A failed trigger must never leave
  content permanently invisible — this is the standard failure mode for
  scroll-animated sites and the reason the deck must also be readable as a
  static document.

## Performance

Budget: **under 2.5s LCP on a 4G phone**, and no layout shift on the hero.

- Extract deck assets with `pdfimages`; re-encode as WebP with JPEG fallback.
  Source rasters top out around 1365×768, so serve at 1×/2× within that ceiling
  rather than upscaling. Where the repo has a higher-resolution version of the
  same subject (e-POD renders, build photos, portraits), prefer it.
- Every image gets explicit `width`/`height` and `loading="lazy"` below the fold.
- GSAP and Lenis are the only animation dependencies. No component library.
- Sections below the fold are code-split so the title beat ships minimal JS.

## Accuracy and content integrity

Figures are reproduced verbatim from the deck. Two things to carry forward:

- The deck cites SIAM 2024 for the 18M figure but leaves other market and
  valuation numbers uncited. A live page invites scrutiny in a way a presented
  slide does not; a `Sources` note in the footer is worth adding before the link
  is circulated. Flagged, not blocking.
- Projected valuations and return multiples (up to 357.9×) are forward-looking
  targets. They are presented as the deck presents them, labelled as
  projections, without additional framing that would imply they are commitments.

## Out of scope

- No CMS or admin. Content changes are edits to `src/data/`.
- No contact form or backend. The close section links to mail, phone and social.
- No analytics.
- No multi-page routing, no PDF export, no passcode gating.
- No changes to the `jedlik-tron-drive` marketing site.

## Verification

There is no test runner and adding one for a single-page presentational site is
not justified. Verification is empirical:

1. `npm run build` succeeds with no TypeScript errors.
2. Every beat renders and is legible at 375px, 768px and 1440px.
3. Every figure on the page is checked against the deck, section by section.
4. The full page is scrolled top to bottom on a real mobile viewport with no
   horizontal overflow and no element stuck invisible.
5. The same pass is repeated with `prefers-reduced-motion: reduce` forced.
6. Lighthouse mobile run recorded, confirming the LCP budget.
