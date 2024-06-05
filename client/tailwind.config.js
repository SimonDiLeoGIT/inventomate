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
      '--color-white': '#FFFFFF',
      /* Black */
      '--color-black': '#1E1E1E',
      /* Black Shadow*/
      '--color-black-shadow': 'rgba(0,0,0, 0.25)',
      /* Semi Dark Violet */
      '--color-semidark-violet': '#410052',
      /* Mate Dark Violet */
      '--color-mate-dark-violet': '#5F5063',
      /* Violet user email */
      '--color-violet-user-email': '#726376',
      /* Light Opaque Pink*/
      '--color-light-opaque-pink': 'rgba(171, 127, 182, 0.4)',
      /* Light Pink*/
      '--color-light-pink': '#EEE1F1',
      /* Full Red */
      '--color-ful-red': '#920000',
      /* Light Red */
      '--color-light-red': '#FF8D8D',
      /* Green */
      '--color-green': 'rgba(0, 121, 7, 0.8)',
      /* Light Grey */
      '--color-border-light-grey': '#929292',
      /* Very Light Grey */
      '--color-border-very-light-grey': '#C9C9C9',
      /* Very Lightest Grey */
      '--color-border-very-lightest-grey': '#E1E1E1',
      /* Semi White */
      '--color-form-background-semi-white': '#F9F9F9',
    },
    fontFamily: {
      'roboto': ['roboto', 'sans-serif'],
    }
  },
  plugins: [],
}