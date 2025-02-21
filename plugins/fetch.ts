import { toast } from 'vue-sonner'
import type { FetchOptions, FetchContext, FetchResponse } from 'ofetch'

export default defineNuxtPlugin(async () => {
	const config = useRuntimeConfig()
	const client = useClient()

	const route = useRoute()
	interface FetchOptionsWithRetry extends FetchOptions {
		method: 'POST' | 'GET' | 'HEAD' | 'PATCH' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE'
		_retry?: boolean
	}

	const api = $fetch.create({
		baseURL: config.public.apiBase,
		credentials: 'include',
		async onResponseError(
			ctx: FetchContext & { options: FetchOptionsWithRetry; response: FetchResponse<ResponseType> },
		) {
			// 401
			if (ctx.response.status === 401) {
				if (typeof ctx.request === 'string' && String(ctx.request).endsWith('/api/v1/auth/access'))
					return
				if (typeof ctx.request === 'string' && String(ctx.request).endsWith('/api/v1/auth/logout'))
					return
				if (typeof ctx.request === 'string' && String(ctx.request).endsWith('/api/v1/auth/refresh'))


				if (!ctx.options._retry) {
					try {
						ctx.options._retry = true

						await api(`/api/v1/auth/refresh`, { method: 'POST' })

						ctx.response = await api(ctx.request, {
							method: ctx.options.method,
							_retry: ctx.options._retry,
						})
					} catch (error: any) {

					}
				}
			}

			// 422
			else if (ctx.response.status === 422) {
				const jsonString = ctx.response._data.error
					.replace(/'/g, '"') // Заменяем все одинарные кавычки на двойные
					.replace(/\((.*?)\)/g, '[$1]') // Заменяем кортежи на массивы

				const errorArray = JSON.parse(jsonString)

				// Пример обработки ошибок
				errorArray.forEach((err: any) => {
					toast.error(client.errorAlert, { description: `${err.msg}: ${err.input}` })
				})
			}

			// Все другие коды
			else {
				if (route.name !== 'login') {
					toast.error(client.errorAlert, {
						description: `Произошла ошибка: ${ctx.response._data.message ? ctx.response._data.message : ctx.response.status}`,
					})
				}
			}
		},
	})

	return {
		provide: {
			api,
		},
	}
})
