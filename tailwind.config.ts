import type { Config } from "tailwindcss";

/**
 * Strict black / white / red. Three values. No cyan, no emerald, no glass,
 * no glow. The site must read as a printed prospectus, not a tech-bro dashboard.
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
        paper: "#FFFFFF",
        muted: "#6B6B6B",
        rule: "#E5E5E5",
        red: {
          DEFAULT: "#E5091E",
          deep: "#9C0614",
          soft: "#FBD9DC",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      maxWidth: {
        deck: "1180px",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
      },
    },
  },
  plugins: [],
};

export default config;