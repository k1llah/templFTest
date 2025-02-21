import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintPluginTailwindCss from 'eslint-plugin-tailwindcss'
import eslintPluginVue from 'eslint-plugin-vue'

export default withNuxt(
	eslintConfigPrettier,
	...eslintPluginTailwindCss.configs['flat/recommended'],
	...eslintPluginVue.configs['flat/recommended'],
	{
		plugins: {
			prettier: eslintPluginPrettier,
			tailwindcss: eslintPluginTailwindCss,
			vue: eslintPluginVue,
		},
		rules: {
			/**
			 * Eslint
			 */
			
			'@typescript-eslint/no-explicit-any': 'off',
			/**
			 * Prettier
			 */
			'prettier/prettier': [
				'error',
				{
					printWidth: 100,
					tabWidth: 2,
					useTabs: true,
					singleQuote: true,
					trailingComma: 'all',
					quoteProps: 'as-needed',
					bracketSpacing: true,
					bracketSameLine: true,
					arrowParens: 'always',
					proseWrap: 'never',
					htmlWhitespaceSensitivity: 'css',
					vueIndentScriptAndStyle: true,
					endOfLine: 'lf',
					semi: false,
					embeddedLanguageFormatting: 'auto',
					singleAttributePerLine: true,
				},
			],

			/**
			 * Tailwindcss
			 */
			'tailwindcss/no-custom-classname': 'off',
			'tailwindcss/classnames-order': ['warn'],
			'tailwindcss/no-unnecessary-arbitrary-value': 'off',

			/**
			 * Vue
			 */
			'vue/html-closing-bracket-newline': [
				'error',
				{
					singleline: 'never',
					multiline: 'never',
					selfClosingTag: {
						singleline: 'never',
						multiline: 'never',
					},
				},
			],
			'vue/singleline-html-element-content-newline': 'off',
			'vue/html-indent': [
				'off',
				'tab',
				{
					attribute: 1,
					baseIndent: 1,
					closeBracket: 0,
					alignAttributesVertically: true,
					ignores: [],
				},
			],
			'vue/html-self-closing': 'off',
			'vue/multi-word-component-names': 'off',
			'vue/no-multiple-template-root': 'off',
			'no-explicit-any': 'off',
			'vue/require-default-prop': 'off',
		},
	},
	{
		files: ['error.vue', 'app.vue', 'layouts/**/*.vue', 'pages/**/*.vue'],
		rules: {
			'vue/no-multiple-template-roots': 'off',
		},
	},
)
