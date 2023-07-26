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
				},
			},
			blur: {
				'2lg': '32px'
			},
			fontFamily:{
				'Source_man': ['Source Han'],
				'Instrument_sans':['Instrument sans'],
				'Noto_Sans_Light': ['NotoSans-Light'],
				'Noto_Sans_Thin': ['NotoSans-Thin'],
				'Noto_Sans': ['NotoSans-Regular'],
				'Noto_Sans_Medium': ['NotoSans-Medium'],
				'Noto_Sans_Bold': ['NotoSans-Bold'],
				'Noto_Sans_Black': ['NotoSans-Black']
			},
		},
	},
	plugins: [
		// eslint-disable-next-line no-undef
		require('@tailwindcss/typography'),
	],
};

