/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pokedex-red': colors.red[400],
        'pokedex-dark-red': '#CC0000',
        'pokedex-blue': '#3B4CCA',
        'pokedex-yellow': '#FFDE00',
        'pokedex-gold': '#B3A125',
      },
      screens: {
        'xs': '320px',
        'sm': '480px',
      },
    },
  },
  plugins: [],
}