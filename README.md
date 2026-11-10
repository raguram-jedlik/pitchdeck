# Jedlik Motors — Interactive Pitchdeck

A single-page, scroll-driven investor pitch site for Jedlik Motors, built with
Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

Live: **https://pitch.jedlik.in**

Two routes:

| Route | What it is |
|---|---|
| `/` | The deck — 14 full-screen sections, one screen per scroll stop. |
| `/detail` | The long-form data room — specs, BOM, unit economics, cap table, milestones, patents. |

## Running it

```bash
npm install         # once, on a fresh clone
npm run dev          # dev server on http://localhost:3000
npm run build:prod   # typecheck + lint + build into .next-prod
npm run start        # serve .next-prod (honours PORT, default 3111)
```

`npm run build` also works for a typecheck-and-build, but it writes to `.next` —
the dev server's directory — while `npm run start` serves from `.next-prod`.
The two never collide (`next.config.js` sets `distDir` from `NEXT_DIST_DIR`),
but use `build:prod` + `start` as a pair for the production path.

To run several copies side by side (deck plus verification instances), see
`.claude/launch.json` — it defines the project on ports 3001–3005.

## Design

Black, white, and red — nothing else. No glow, no glass, no parallax orbs, no
gradient text, no decorative icons. Just type, hairline rules, and photography.

The palette is defined once in `tailwind.config.ts`:

| Token | Value | Role |
|---|---|---|
| `ink` | `#000000` | Type on paper. |
| `paper` | `#FBFAF7` | Page ground — warm off-white, so it reads as stock, not a blank screen. |
| `paper-2` / `paper-3` | `#F4F2ED` / `#EDEAE3` | Layered surfaces (cards, rails, table headers). |
| `muted` | `#6B6B6B` | Secondary text. |
| `rule` | `#E5E5E5` | Hairlines. |
| `red` | `#C8023B` | The single accent. `red-deep` `#9C0614`, `red-soft` `#FBD9DC`. |

Fonts are four `next/font/google` faces wired to CSS variables in
`app/layout.tsx`: Space Grotesk (`--font-display`), Inter (`--font-body`),
Antonio (`--font-headline`), Roboto Mono (`--font-label`).

Section eyebrows (`Section 12 — Your Verdict`) and the red wordmark at the
reveal are the only colour accents.

## Editing content

**All copy and every figure lives in two files:**

- [`src/data/jedlikData.ts`](src/data/jedlikData.ts) — the deck (`/`).
- [`src/data/detailData.ts`](src/data/detailData.ts) — the data room (`/detail`).

Section components render that data and hold no copy of their own, so a wording
or number change is a one-line edit in one file. Do not hunt through
components for copy — it is not there.

## Layout

```
app/
  layout.tsx            fonts, metadata, root HTML shell
  page.tsx              composes the deck sections in order (12 components
                        render the 14 full-screen sections on /)
  detail/page.tsx       the data room
  api/feedback/route.ts POST /api/feedback — investor vote + intent capture
  globals.css           Tailwind entrypoint + deck scroll/snap tokens
src/
  data/jedlikData.ts    all deck content — the only file you edit for copy
  data/detailData.ts    all data-room content
  components/           one component per section (Hero, CommuterNeeds,
                        QuadrantChart, TeamForces, RoadmapScrolly,
                        ProductReveal, SteerByWire, BuildingEPod, MarketSize,
                        Personas, MediaCoverage, Feedback, Footer) plus the
                        shared Nav, DeckShell, SnapSection, DetailNav,
                        InvestButton, KnowMoreCta, RevealHeadline,
                        ScrollReveal, ScrollToTopOnMount
  components/charts/    shared chart and diagram parts (CountUpNumber,
                        AnimatedBar, DonutChart, LineChart, ColumnChart,
                        CanvasWheel, CompareBars, StageTimeline, SpecTile,
                        ValidationCollage)
  hooks/useFitScale.ts  scales a section's content to fit one screen
  lib/visitor.ts        the visitor's session id, shared by every capture point
  lib/feedbackStore.ts  Neon-backed storage for investor feedback
public/assets/          e-POD renders and video, build photos, team portraits,
                        rivals, supporters, needs icons, press media,
                        validation screenshots, the IP patent PDF
scripts/
  export-pdf.js         headless Chrome -> Jedlik-Pitch-Deck.pdf
  shot.js               headless Chrome -> per-section screenshots
```

## Motion

Framer Motion is used for *subtle* scroll-driven entrances — staggered reveals
on view, a count-up on the market figures, a single red bar that grows down
the funding timeline, and one constant-speed marquee over the build photos. No
3D tilt, no scroll-jacking. `prefers-reduced-motion` collapses everything to
its final state.

The deck's scroll behaviour lives in `DeckShell` + `useFitScale`: every section
is exactly one screen tall, and a section whose content is taller than the
screen is scaled down (via the standalone CSS `scale` property, so it composes
with Framer Motion's `transform` rather than overwriting it) until all of it
fits at once. The reader never has to scroll twice to finish reading.

## Investor feedback

The verdict widget (Section 12) and the header Invest button both write to
`POST /api/feedback`, which stores into Neon via `@neondatabase/serverless`.
The schema is created lazily on first write, so there is no migration step.

`DATABASE_URL` is optional. With no database configured every write degrades to
a no-op that reports `stored: false` instead of throwing — a dead database is
our problem, never something an investor sees on screen.

## Scripts

```bash
# regenerate the PDF (1920x1080 slides -> Jedlik-Pitch-Deck.pdf)
PUPPETEER_CORE=1 CHROME_PATH=/path/to/chrome EXPORT_URL=http://localhost:3000 \
  node scripts/export-pdf.js

# screenshot the deck, one PNG per section, into .shots/
CHROME_PATH=/path/to/chrome node scripts/shot.js http://localhost:3000 mylabel
```

`PUPPETEER_CORE=1` makes `export-pdf.js` use `puppeteer-core` (the only Puppeteer
installed) and point it at the Chrome binary named by `CHROME_PATH`. Without it
the script tries to require the full `puppeteer` package, which is not a
dependency and will fail. `shot.js` always uses `puppeteer-core`.

## Deploying

Push to `main`. Vercel builds and deploys to pitch.jedlik.in automatically —
there is no CI workflow file and no deploy step to run by hand.
