const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

// const round = (num) =>
//   num
//     .toFixed(7)
//     .replace(/(\.[0-9]+?)0+$/, '$1')
//     .replace(/\.0$/, '')
// const rem = (px) => `${round(px / 16)}rem`
// const em = (px, base) => `${round(px / base)}em`

// MHFAE Preset
module.exports = {
	theme: {
		// Typography
		fontFamily: {
			'sans': ['Lato', ...defaultTheme.fontFamily.sans],
			'mono': [...defaultTheme.fontFamily.mono]
		},
		// Layout
		container: {
			center: true,
			screens: {
				'xs': '100%',
				'sm': '100%',
				'md': '100%',
				'lg': '100%',
				'xl': '1280px',
				'2xl': '1360px' // 1328 plus padding
			},
			padding: {
				DEFAULT: '1rem'
			}
		},
		extend: {
			colors: {
				'selection': '#fd0',
				'focus': '#FFD642',
				'social': {
					'facebook':'#4A6597',
					'linked-in': '#367BA1',
					'instagram': '#E1306C',
					'twitter': '#47AFE5'
				},
				'primary': colors.gray[900],
				'secondary': colors.white,
				'blood': colors.red[600],
				'banana': colors.amber[400],
				'violet': colors.purple[600],
				'green': colors.emerald[500],
			},
			aspectRatio: {
				'4/3': '4 / 3', // class name: aspect-4/3
				'5/4': '5 / 4', // class name: aspect-5/4
				'4/5': '4 / 5', // class name: aspect-4/5
				'16/9': '16 / 9', // class name: aspect-16/9
				'3/2': '3 / 2', // class name: aspect-3/2
				'5/2': '5 / 2', // class name: aspect-5/2
				'2/1': '2 / 1', // class name: aspect-2/1
				'1/1': '1 / 1' // class name: aspect-1/1
			},
			keyframes: {
				fadein: {
					'0%': {
						opacity: '0'
					},
					'50%': {
						opacity: '1'
					}
				},
				fadeinup: {
					'0%': {
						opacity: '0',
						transform: 'translate3d(0, 50px, 0)',
						visibility: 'visible'
					},
					'100%': {
						transform: 'translate3d(0, 0, 0)',
						opacity: '1' 
					}
				},
			},
			animation: {
				fadein: 'fadein 3000ms',
				fadeinfast: 'fadein 1000ms',
				fadeinup: 'fadeinup 300ms'
			},
			zIndex: {
				60: '60',
				70: '70',
				80: '80',
				90: '90',
				100: '100',
			},
			//typography: ({ theme }) => ({
				// Default values can be found here: https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
				//base: {
					// css: [{
					// 	'--tw-prose-body': theme('colors.bottle-green'),
					// 	fontSize: rem(18),
					// 	lineHeight: round(30 / 20),
					// 	maxWidth: '100%',
					// }],
				//}
			//})
		}
	},
	plugins: [
		require('@tailwindcss/typography')({
			className: 'wysiwyg' // overide the container class to be .wysiwyg see docs: https://tailwindcss.com/docs/typography-plugin
		}),
		require('@tailwindcss/forms')({
			strategy: 'base', // only generate global styles, see docs: https://github.com/tailwindlabs/tailwindcss-forms
		})
	]
	
}
