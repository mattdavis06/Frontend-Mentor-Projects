/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		container: {
			center: true,
		},
		extend: {
			colors: {
				// ==== PRIMARY COLOURS ====
				marineBlue: ' hsl(213, 96%, 18%)',
				purplishBlue: 'hsl(243, 100%, 62%)',
				pastelBlue: ' hsl(228, 100%, 84%)',
				lightBlue: 'hsl(206, 94%, 87%)',
				strawberryRed: 'hsl(354, 84%, 57%)',

				// ==== NEUTRAL COLOURS ====
				coolGray: 'hsl(231, 11%, 63%)',
				lightGray: 'hsl(229, 24%, 87%)',
				magnolia: 'hsl(217, 100%, 97%)',
				alabaster: 'hsl(231, 100%, 99%)',
				white: 'hsl(0, 0%, 100%)',
			},
			backgroundImage: {
				'header-img': "url('/src/assets/images/bg-sidebar-mobile.svg')",
				'aside-img': "url('/src/assets/images/bg-sidebar-desktop.svg')",
			},
			boxShadow: {
				footerShadow: '0px -10px 20px 0px rgb(0 0 0 / 10%)',
			},
		},
	},
	plugins: [require('prettier-plugin-tailwindcss')],
}
