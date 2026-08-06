# Jedlik Motors — Interactive Pitchdeck

A single-page, scroll-driven investor pitch site for Jedlik Motors, built with
Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build      # typecheck + production build
npm run start      # serve the production build
```

## Design

A strict black, white, and red palette — nothing else. Three values do the
whole job: `#000000`, `#FFFFFF`, and `#E5091E`. No glow, no glass, no parallax
orbs, no gradient text, no decorative icons. Just type, hairline rules, and
photography from the deck.

Section eyebrows (`Section 01 — The Need`) and the red wordmark at the reveal
are the only colour accents.

## Editing content

**All copy and every figure lives in [`src/data/jedlikData.ts`](src/data/jedlikData.ts).**
Section components render that data and hold no copy of their own, so a wording
or number change is a one-line edit in one file.

## Layout

```
app/
  layout.tsx            fonts, metadata, root HTML shell
  page.tsx              composes every section in order
  globals.css           Tailwind entrypoint + display/eyebrow tokens
src/
  data/jedlikData.ts    all content — the only file you edit for copy changes
  components/           one component per section (Hero, CommuterNeeds,
                        QuadrantChart, TeamForces, RoadmapScrolly,
                        ProductReveal, SteerByWire, MarketSize, Personas,
                        Footer) plus the shared Nav
public/assets/          e-POD render, build photos, team portraits,
                        rivals, supporters, steer-by-wire diagram
```

## Motion

Framer Motion is used for *subtle* scroll-driven entrances — staggered reveals
on view, a count-up on the market figures, a single red bar that grows down
the funding timeline. No parallax transforms, no 3D tilt, no scroll-jacking.
`prefers-reduced-motion` collapses everything to its final state.