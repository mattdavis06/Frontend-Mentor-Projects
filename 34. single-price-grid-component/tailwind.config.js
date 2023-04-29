/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Karla", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        primaryCyan: "hsl(179, 62%, 43%)",
        primaryBrightYellow: "hsl(71, 73%, 54%)",
        neutralGray: "hsl(204, 43%, 93%)",
        neutralGrayishBlue: "hsl(218, 22%, 67%)",
        bgWhite: "hsl(0, 100%, 100%)",
      },
    },
  },
  plugins: [],
};
