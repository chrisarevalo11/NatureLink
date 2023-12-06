import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			backgroundImage: {
				banner: "url('/images/banner.jpg')"
			},
			colors: {
				green400: '#1EB854',
				green500: '#3f882b',
				green600: '#2b5222'
			},
			animation: {
				'spin-slow': 'spin 5s linear infinite'
			}
		}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['forest']
	}
}
export default config
