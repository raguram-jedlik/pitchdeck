import type { Config } from "tailwindcss";

/**
 * Strict black / white / red. Three values. No cyan, no emerald, no glass,
 * no glow. The site must read as a printed prospectus, not a tech-bro dashboard.
 *
 * The paper is warm off-white rather than pure #FFFFFF so the page reads as
 * stock rather than a blank screen. `paper-2` and `paper-3` give the layered
 * surfaces (cards, rails, table headers) enough separation from the page
 * ground to create depth without introducing a second hue.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        paper: {
          DEFAULT: "#FBFAF7",
          2: "#F4F2ED",
          3: "#EDEAE3",
        },
        muted: "#6B6B6B",
        rule: "#E5E5E5",
        red: {
          DEFAULT: "#C8023B",
          deep: "#9C0614",
          soft: "#FBD9DC",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        headline: ["var(--font-headline)"],
        label: ["var(--font-label)"],
      },
      maxWidth: {
        deck: "1180px",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        // The track is duplicated, so -50% lands exactly on the second copy.
        //
        // Duration is NOT fixed: a fixed duration makes the perceived speed
        // scale with card size (bigger cards => longer track => same seconds
        // => faster pixels/second). Instead the component measures the real
        // track width and sets `--marquee-duration` to
        // (trackWidth / TARGET_PX_PER_SEC). That keeps the scroll speed
        // constant and calm at every breakpoint.
        //
        // The var has a sane fallback so the track never jumps or renders
        // unanimated while the measurement is pending.
        marquee: "marquee var(--marquee-duration, 60s) linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;