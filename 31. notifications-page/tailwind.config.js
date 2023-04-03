/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['Plus Jakarta Sans', 'sans-serif']
      },
      colors: {
        'primaryRed': 'hsl(1, 90%, 64%)',
        'primaryBlue': 'hsl(219, 85%, 26%)',
        'grayishBlue': 'hsl(219, 14%, 63%)',
        'darkGrayishBlue': 'hsl(219, 12%, 42%)',
        'lightGrayishBlue_1': 'hsl(211, 68%, 94%)',
        'lightGrayishBlue_2': 'hsl(205, 33%, 90%)',
        'veryLightGrayishBlue': 'hsl(210, 60%, 98%)',
        'veryDarkBlue': 'hsl(224, 21%, 14%)',
        'white': 'hsl(0, 0%, 100%)',
      }
    },
  },
  plugins: [],
}

