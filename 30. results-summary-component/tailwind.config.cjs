/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors: {
			// PRIMARY COLOURS
			primary_LightRed: 'hsl(0, 100%, 67%)',
			primary_OrangeyYellow: 'hsl(39, 100%, 56%)',
			primary_GreenTeal: 'hsl(166, 100%, 37%)',
			primary_CobaltBlue: 'hsl(234, 85%, 45%)',

			// GRAIDENTS COLOURS
			gradient_CardTop: '#6743FF',
			gradient_CardBottom: '#312CEA',
			gradient_CircleTop: '#4C23C7',
			gradient_CircleBottom: '#4633EE',

			// NEUTRAL COLOURS
			neutral_White: 'hsl(0, 0%, 100%)',
			neutral_PaleBlue: 'hsl(221, 100%, 96%)',
			neutral_LightLavender: 'hsl(241, 100%, 89%)',
			neutral_DarkGrayBlue: 'hsl(224, 30%, 27%)',
		},
		extend: {},
	},
	plugins: [],
}
