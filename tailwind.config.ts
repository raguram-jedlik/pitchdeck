import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        crimson: { DEFAULT: '#D10A3C', deep: '#8E0526', soft: '#F5D3DC' },
        navy: { DEFAULT: '#2B3340', soft: '#5A6472' },
        ink: '#111417',
        lime: { DEFAULT: '#B8E62E', soft: '#E4F7AC' },
        mist: { DEFAULT: '#DCE3EA', warm: '#EFEAE4' },
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
