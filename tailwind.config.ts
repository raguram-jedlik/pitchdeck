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
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;