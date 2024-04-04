/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    },
    colors: {
      /* White */
      'color-white': '#FFFFFF',
      /* Black */
      'color-black': '#1E1E1E',
      /* Light Orange */
      'color-light-orange': '#FFD28D',
      /* Light Red */
      'color-light-red': '#FF8D8D',
      /* Light Red */
      'color-border-light-grey': '#929292',
    },
    fontFamily: {
      'roboto': ['roboto', 'sans-serif'],
    }
  },
  plugins: [],
}