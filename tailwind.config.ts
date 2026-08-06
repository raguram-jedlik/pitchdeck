import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Strict black / white / red system. These keys are kept so every
        // existing utility class (text-crimson, bg-navy, etc.) still works —
        // only the hex values changed.
        crimson: { DEFAULT: '#E5091E', deep: '#9C0614', soft: '#FBD9DC' },
        navy: { DEFAULT: '#0A0A0A', soft: '#6B6B6B' },
        ink: '#000000',
        lime: { DEFAULT: '#E5091E', soft: '#FBD9DC' },
        mist: { DEFAULT: '#FFFFFF', warm: '#F4F4F4' },
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['"DM Sans Variable"', 'system-ui', 'sans-serif'],
      },
      maxWidth: { deck: '1280px' },
    },
  },
  plugins: [],
} satisfies Config
