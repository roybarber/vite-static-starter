require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
	root: true,
	extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'plugin:tailwindcss/recommended'],
	ignorePatterns: ['./build'],
	parserOptions: {
		ecmaVersion: 'latest'
	},
	env: {
		node: true
	},
	rules: {
		semi: ['error', 'never'],
		quotes: ['error', 'single'],
		indent: 'off',
		'tailwindcss/no-arbitrary-value': 'off',
		'tailwindcss/no-custom-classname': 'off'
	},
	plugins: ['tailwindcss']
}
