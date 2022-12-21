/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		container: {
			center: true,
		},
		colors: {
			white: 'hsl(0, 0%, 100%)',
			redErrors: 'hsl(0, 100%, 66%)',
			lightGrayishViolet: 'hsl(270, 3%, 87%)',
			darkGrayishViolet: 'hsl(279, 6%, 55%)',
			veryDarkViolet: 'hsl(278, 68%, 11%)',
			linearGradient_From: 'hsl(249, 99%, 64%)',
			linearGradient_To: 'hsl(278, 94%, 30%)',
		},
		fontFamily: {
			sans: ['Space Grotesk', 'sans-serif'],
		},
		extend: {},
	},
	plugins: [],
}
