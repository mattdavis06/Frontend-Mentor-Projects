/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			primary: ['League Spartan', 'sans-serif'],
		},
		colors: {
			primaryColor: 'hsl(180, 29%, 50%)',
			secondaryColor: 'hsl(180, 31%, 95%)',
			backgroundColor: 'hsl(180, 52%, 96%)',
			textColor: 'hsl(180, 8%, 52%)',
			darkColor: 'hsl(180, 14%, 20%)',
			white: 'hsl(0, 0%, 100%)',
		},
		extend: {},
	},
	plugins: [],
}
