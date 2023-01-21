/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./public/**/*.html'],
	theme: {
		colors: {
			// ===== PRIMARY =====
			// ===== Typography
			mainHeading: 'hsl(271, 36%, 24%)',
			subHeading: 'hsl(276, 100%, 81%)',
			paragraph: 'hsl(270, 7%, 64%)',
			placholder: 'hsl(206, 6%, 79%)',
			chatLeft: 'hsl(276, 55%, 52%)',
			chatRight: 'hsl(271, 15%, 43%)',
			// ===== Gradients
			lightMagenta: 'hsl(293, 100%, 63%)',
			lightViolet: 'hsl(264, 100%, 61%)',
			// ===== SECONDARY =====
			appBg: 'hsl(270, 20%, 96%)',
			btnBg: 'hsl(271, 36%, 24%)',
			radioBtnOutline: 'hsl(289, 100%, 72%)',
			white: ' hsl(0, 0%, 100%)',
		},
		fontFamily: {
			sans: ['Rubik', 'sans-serif'],
		},
		extend: {
			keyframes: {
				bounce: {
					'0%, 100%': {
						transform: 'translateY(-2%)',
						animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
					},
					'50%': {
						transform: 'translateY(0)',
						animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
					},
					'50%': { transform: 'rotate(2deg)' },
				},
			},
			animation: {
				bounce: 'bounce 0.6s 6',
			},
		},
	},
	plugins: [],
}
