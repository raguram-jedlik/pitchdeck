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
npm run build      # production build
npm run start      # serve the production build
```

## Editing content

**All copy and every figure lives in [`src/data/jedlikData.ts`](src/data/jedlikData.ts).**
Section components render that data and hold no copy of their own, so a wording
or number change is a one-line edit in one file.

## Layout

```
app/
  layout.tsx           fonts, metadata, root HTML shell
  page.tsx              composes every section in order
  globals.css           Tailwind entrypoint + shared glass/glow utilities
src/
  data/jedlikData.ts     all content — the only file you edit for copy changes
  components/            one component per section (Hero, CommuterNeeds,
                          QuadrantChart, TeamForces, RoadmapScrolly,
                          ProductReveal, SteerByWire, MarketSize, Personas,
                          Footer) plus a shared Nav/scroll-progress bar
```

## Motion

Built with Framer Motion's `useScroll` / `useTransform` for scroll-linked
parallax, sticky-pinned sections, staggered card reveals, and count-up
numbers. No external images are used — all visuals are CSS gradients, SVG
silhouettes, and glow effects.
