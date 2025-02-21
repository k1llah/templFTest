export default {
	plugins: ['stylelint-scss', 'stylelint-prettier', 'stylelint-order'],
	extends: [
		'stylelint-config-recommended',
		'stylelint-config-recommended-scss',
		'stylelint-config-recommended-vue',
		'stylelint-config-property-sort-order-smacss',
		'stylelint-prettier/recommended',
	],

	rules: {
		'prettier/prettier': true,
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'tailwind',
					'layer',
					'base',
					'apply',
					'variants',
					'responsive',
					'screen',
					'use',
				],
			},
		],

		'scss/at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'tailwind',
					'layer',
					'base',
					'apply',
					'variants',
					'responsive',
					'screen',
					'use',
				],
			},
		],
	},
	overrides: [
		{
			files: ['**/*.vue'],
			rules: {
				'no-empty-source': null,
			},
		},
	],
}
