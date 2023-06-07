/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Be Vietnam Pro', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				primaryRed: 'hsl(12, 88%, 59%)',
				primaryBlue: 'hsl(228, 39%, 23%)',
				secondaryDarkBlue: 'hsl(233, 12%, 13%)',
				secondaryDarkRed: 'hsl(13, 100%, 96%)',
				darkGrayishBlue: 'hsl(227, 12%, 61%)',
				veryLightGray: 'hsl(0, 0%, 98%)',
			},
		},
	},
	plugins: [],
}
