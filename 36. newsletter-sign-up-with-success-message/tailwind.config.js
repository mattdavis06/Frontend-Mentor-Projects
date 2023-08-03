/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primaryRed: ' hsl(4, 100%, 67%)',
				darkSlateGrey: 'hsl(234, 29%, 20%)',
				charcoalGrey: 'hsl(235, 18%, 26%)',
				grey: 'hsl(231, 7%, 60%)',
				white: 'hsl(0, 0%, 100%)',
				gradientStart: '#ff5968',
				gradientMiddle: '#ff5e5e',
				gradientEnd: '#ff6939',
			},
		},
	},
	plugins: [],
}
