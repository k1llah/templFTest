// https://nuxt.com/docs/api/configuration/nuxt-config

const isDev = process.env.NODE_ENV === 'development'
export default defineNuxtConfig({
 ssr: false,
 devtools: { enabled: isDev },
 css: ['@/assets/css/tailwind.css'],

 app: {
					layoutTransition: {
									name: 'layout',
									mode: 'default',
					},
					pageTransition: {
									name: 'page',
									mode: 'default',
					},
					head: {


									htmlAttrs: { lang: 'ru-RU' },
									meta: [
													{
																	name: 'viewport',
																	content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
													},
									],
					},
	},

 plugins: ['@/plugins/fetch.ts', '@/plugins/device.server.ts'],

 modules: [
					'@nuxtjs/tailwindcss',
					'@formkit/auto-animate',
					'@vueuse/nuxt',
					'@dargmuesli/nuxt-cookie-control',
					'@pinia/nuxt',
					'shadcn-nuxt',
					'@nuxt/eslint',
					'@nuxt/fonts',
	],

 shadcn: {
					prefix: 'Shadcn',
					componentDir: './shared/Shadcn',
	},

 pinia: {
					storesDirs: ['./stores/**', './entities/**'],
	},

 eslint: {},

 imports: {
					autoImport: true,
					dirs: [
									'~/components',
									'~/features/**/*',
									'~/widgets/**/*',
									'~/stores/**',
									'~/shared/**/*',
									'~/entities/**/*',
									'~/shared/**',
					],
	},

 components: [
					{
									path: '~/components',
									pathPrefix: false,
					},
					{
									path: '~/features',

									pathPrefix: false,
					},
					{
									path: '~/shared',

									pathPrefix: false,
					},
					{
									path: '~/widgets',

									pathPrefix: false,
					},
	],

 compatibilityDate: '2025-01-27',
})