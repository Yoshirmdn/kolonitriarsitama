/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Jost"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      colors: {
        stone: {
          950: '#0c0a09',
        },
        warm: {
          50: '#faf8f5',
          100: '#f4efe8',
          200: '#e8ddd1',
          300: '#d6c4b0',
          400: '#c4a98e',
          500: '#b08d6e',
          600: '#9a7355',
          700: '#7f5d43',
          800: '#694d39',
          900: '#574032',
          950: '#2e2018',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      fontSize: {
        '10xl': '10rem',
        '11xl': '12rem',
        '12xl': '14rem',
      },
      letterSpacing: {
        'ultra': '0.3em',
        'mega': '0.5em',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}
