/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		container: {
			center: true,
		},
		colors: {
			white: 'hsl(0, 0%, 100%)',
			black: 'hsl(0, 0%, 0%)',
			darkGray: 'hsl(0, 0%, 55%)',
			veryDarkGray: 'hsl(0, 0%, 41%)',
		},
		fontFamily: {
			primaryFont: ['Alata', 'sans-serif'],
			secondaryFont: ['Josefin Sans', 'sans-serif'],
		},
		extend: {},
	},
	plugins: [],
}
