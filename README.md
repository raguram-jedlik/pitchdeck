# Jedlik Motors — Interactive Pitchdeck

A mobile-first, scroll-driven presentation of the Jedlik Motors investor pitch.
One page, eleven beats, built to be sent as a link.

Design spec: [`docs/superpowers/specs/2026-08-05-jedlik-pitchdeck-design.md`](docs/superpowers/specs/2026-08-05-jedlik-pitchdeck-design.md)

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

```bash
npm run build      # typecheck + production build to dist/
npm run preview    # serve the built dist/
```

`dist/` is a static folder — deploy it to Vercel, Netlify, Cloudflare Pages or
any static host with no configuration.

## The idea

The deck withholds the product. On the positioning map, and in "the forces /
the fuel needed to bring **?** alive", the vehicle appears only as a blacked-out
silhouette. That withholding is the spine of the site: the silhouette rides the
progress rail through the first six beats, then gives way to the real e-POD at
the reveal.

## Editing content

**All copy and every figure lives in [`src/data/deck.ts`](src/data/deck.ts).**
Sections render that data and hold no copy of their own, so a wording or number
change is a one-line edit in one file. If a figure there ever disagrees with the
deck, the deck wins.

## Layout

```
src/
  data/deck.ts          all content — the only file you edit for copy changes
  lib/motion.ts         GSAP + Lenis setup, reduced-motion hook
  components/motion/    Reveal, RevealText, CountUp, StickyTrack
  components/ui/        Silhouette, DeckFrame, icons
  sections/             the eleven beats, grouped into four acts
  styles/index.css      design tokens and the crab-walk steering keyframes
public/assets/          images extracted from the deck and optimised
```

## Motion

- **One Lenis instance** drives the smooth scroll and `ScrollTrigger.update`.
- **Sticky, not pinned.** Long containers with `position: sticky` children
  rather than `ScrollTrigger.pin`, which transform-jitters on iOS Safari.
- **`prefers-reduced-motion` is honoured throughout.** Animated components
  return early and render their final state; they never set opacity, so no
  failed trigger can leave content invisible. The crab-walk wheels *rest* at
  their steering angle so the three modes stay distinguishable with animation
  off.

## Assets

Images were extracted from the source PDF with `pdfimages`, composited against
their soft masks, and re-encoded. The embedded rasters top out around 1365×768,
which is comfortable on phones and slightly soft on a large desktop. If a
higher-resolution e-POD render turns up, replacing
`public/assets/epod-reveal.jpg` is the single highest-impact upgrade available.

## Before circulating

The deck cites SIAM 2024 for the 18M figure; the other market and valuation
numbers are uncited. A live page invites scrutiny in a way a presented slide
does not, so consider adding sources to the close section.
