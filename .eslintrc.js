require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
	root: true,
	extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'plugin:tailwindcss/recommended', 'prettier'],
	ignorePatterns: ['./build'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	env: {
		browser: true,
		es6: true,
		es2021: true,
		node: true
	},
	rules: {
		'comma-dangle': 0,
		'arrow-parens': 0,
		semi: ['error', 'never'],
		quotes: ['error', 'single'],
		noTabs: 0,
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'tailwindcss/classnames-order': 'off',
		'tailwindcss/no-arbitrary-value': 'off',
		'tailwindcss/no-custom-classname': 'off',
		'prettier/prettier': ['error', { tabWidth: 4, useTabs: true, trailingComma: 'none', semi: false, singleQuote: true, arrowParens: 'avoid', endOfLine: 'auto' }]
	},
	plugins: ['tailwindcss', 'prettier', 'html']
}
