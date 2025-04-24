// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'cursive'], // fallback to serif
      },
      colors: {
        primary: '#0F363D',
        secondary: '#FFAB91',
        lightSecondary: '#FFD3B6',
        body: '#F5F5F5',
        pb: '#A8E6CF', // primary button
        sb: '#84A9AC', // secondary button
        yellowish: '#FFE8A3', // custom yellow,
        heading: '#2D3436', // headings h2,h3, titles
        paragraph: '#ADAFB0',
      },
    },
  },
  plugins: [],
}

export default config
