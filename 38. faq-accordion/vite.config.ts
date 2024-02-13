import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	server: {
		port: 3000,
		open: true,
		strictPort: true,
	},
	preview: {
		port: 3001,
		open: true,
		strictPort: true,
	},
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
