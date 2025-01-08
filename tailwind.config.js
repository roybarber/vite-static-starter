/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{ce.vue,vue,js,ts,html,hbs,jsx,tsx}',
	],
	presets: [
		require('./tailwind.preset.projectname.js')
	]
}

