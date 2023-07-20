/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			colors:{
				primary: {
					900: '#052933',
					800: '#074659',
					700: '#066380',
					600: '#0480A6',
					500: '#0099cc',
					400: '#20AAD6',
					300: '#43BAE0',
					200: '#6ACBEB',
					100: '#93DDF5',
					50: '#C0EFFF'
				}
			}
		},
	},
	plugins: [
		// eslint-disable-next-line no-undef
		require('@tailwindcss/typography'),
	],
};

