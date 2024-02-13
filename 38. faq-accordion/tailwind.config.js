import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export const darkMode = ['class']
export const content = [
	'./pages/**/*.{ts,tsx}',
	'./components/**/*.{ts,tsx}',
	'./app/**/*.{ts,tsx}',
	'./src/**/*.{ts,tsx}',
	'./index.html',
]
export const prefix = ''
export const theme = {
	fontFamily: {
		sans: ['"Work Sans"', ..._fontFamily.sans],
	},
	container: {
		center: true,
		padding: '2rem',
		screens: {
			'2xl': '1400px',
		},
	},
	extend: {
		colors: {
			primaryDarkPurple: 'hsl(292, 42%, 14%)',
			primaryGrayPurple: 'hsl(292, 16%, 49%)',
			primaryBrightPink: 'hsl(281, 83%, 54%)',
			secondaryPink: 'hsl(275, 100%, 97%)',
			white: 'hsl(0, 0%, 100%)',
		},
		keyframes: {
			'accordion-down': {
				from: { height: '0' },
				to: { height: 'var(--radix-accordion-content-height)' },
			},
			'accordion-up': {
				from: { height: 'var(--radix-accordion-content-height)' },
				to: { height: '0' },
			},
		},
		animation: {
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out',
		},
	},
}
export const plugins = [require('tailwindcss-animate')]
