import { defineStore } from 'pinia'
import type { Client } from '~/entities/interfaces/client-page'
import type { ClientBalance } from '~/entities/interfaces/client-history'
import type { PaymentData } from '~/entities/interfaces/payment-data'
import type { BlockedData } from '~/entities/interfaces/blocked-data'
import type { Provider } from '~/entities/interfaces/provider'
import type { ProfileData } from '~/entities/interfaces/profile-data'
import type { CountDeals } from '~/entities/interfaces/countDeals'
import type { combobox } from '../interfaces/combobox'
interface ClientData {
	page: number
	pages: number
	size: number
	items: []
}

export const useClient = defineStore('client', {
	state: () => ({
		isActive: false,
		isLoading: false,
		errorAlert: '',
		success: '',
		emailUser: '',
		emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		isEmailCorrect: false,
		clientData: [] as Client[],
		clientPaginationOption: {} as { page: number; size: number; pages: number },

		// Client data vars
		clientName: '',
		clientUrl: '',
		clientManager: '',
		clientCountry: '',
		clientSupportLink: '',
		clientDesc: '',
		clientApiKey: '',
		clientSell_webhook_url: '',
		clientBuy_webhook_url: '',
		clientUserId: '',
		prevClientSell_webhook_url: '',
		prevClientBuy_webhook_url: '',

		// Previous client data vars
		prevClientName: '',
		prevClientUrl: '',
		prevClientManager: '',
		prevClientCountry: '',
		prevClientSupportLink: '',
		prevClientDesc: '',
		selectedProvider: '',
		providerId: '',
		prevClientApiKey: '',

		// Arrays and objects
		clientIp: [] as { ip: string }[],
		paymentData: [] as PaymentData[],
		paymentNames: [] as string[],
		blockedData: [] as BlockedData[],
		providerData: [] as Provider[],
		sortedProviderData: [] as Provider[],
		mappedArrOfPaymentMethods: [] as PaymentData[],
		unusedPaymentMethods: [{}] as combobox[],
		providerNames: [{}] as string[],
		selectProviderNames: [] as Provider[],
		blackList: [{}],
	}),
	actions: {
		async getClientData() {
			this.isLoading = true
			try {
				const clientData = await useNuxtApp().$api<ClientData>(`/api/v1/client/`, {
					method: 'GET',
				})
				const countDeals = await useNuxtApp().$api<CountDeals[]>(
					'/api/v1/order/count-by-status-per-client',
				)
				this.clientData = clientData.items

				const clientsWithDeals = clientData.items.map((client: Client) => {
					const clientDeals = countDeals.find((deal) => deal.client_id === client.id)
					const completedDeals = clientDeals ? clientDeals.statuses.Completed : 0
					const canceledDeals =
						(clientDeals ? clientDeals.statuses.CanceledByService : 0) +
						(clientDeals ? clientDeals.statuses.CanceledByTimeout : 0)

					return {
						...client,
						completedDeals,
						canceledDeals,
					}
				})

				this.clientData = clientsWithDeals
				const balances = await useNuxtApp().$api<ClientBalance[]>(
					'/api/v1/finance/client/balance/detail',
				)
				const clientDataBalance = this.clientData.map((client) => {
					const clientBalance = balances.find((balance) => balance.owner_id === client.id)
					const balance = clientBalance ? clientBalance.available : 0
					return {
						...client,
						balance,
					}
				})
				this.clientData = clientDataBalance
			} catch (error) {
				console.error(error)
			} finally {
				this.isLoading = false
			}
		},
		async toggleEvent() {
			this.isActive = !this.isActive
		},
		async handleButton(id: number | string) {
			try {
				if (!this.clientData) return console.error('this.client data error', this.clientData)
				// eslint-disable-next-line
				const activityChange = await useNuxtApp().$api(`/api/v1/client/${id}/toggle-active`, {
					method: 'PATCH',
				})
				const item = this.clientData.find((item: any) => item.id === id)
				if (item) {
					item.active = !item.active
				}
				this.success = 'Переключение активности клиента успешно завершено!'
			} catch (error: any) {
				console.error(error)
				this.errorAlert = error.response._data.message
			}
		},
		async getProfileData() {
			try {
				const route = useRoute()
				const data = await useNuxtApp().$api<ProfileData>(`/api/v1/client/${route.params.uuid}`)
				this.clientUserId = data.user_id || ''
				this.clientName = data.name || ''
				this.clientDesc = data.description || ''
				this.clientManager = data.manager || ''
				this.clientCountry = data.country || ''
				this.clientSupportLink = data.support_link || ''
				this.clientApiKey = data.user_info.api_key || ''
				this.clientUserId = data.user_id || ''
				this.clientSell_webhook_url = data.sell_webhook_url || ''
				this.clientBuy_webhook_url = data.buy_webhook_url || ''

				this.emailUser = data.user_info.email
				// save first state to validate is form changed

				this.prevClientName = data.name || ''
				this.prevClientDesc = data.description || ''
				this.prevClientManager = data.manager || ''
				this.prevClientCountry = data.country || ''
				this.prevClientSupportLink = data.support_link || ''
				this.prevClientApiKey = data.user_info.api_key
				this.prevClientSell_webhook_url = data.sell_webhook_url
				this.prevClientBuy_webhook_url = data.buy_webhook_url
				this.clientIp = []
				for (const ip of data.ip) {
					this.clientIp.push({
						ip: ip,
					})
				}
				this.clientIp = [...this.clientIp]
			} catch (error) {
				console.error(error)
			}
		},
		async createClient(name: string, email: string, domain: string, ip: string[]) {
			try {
				// Validate conditions
				if (name.length === 0) return (this.errorAlert = 'Поле "Имя" не может быть пустым')
				if (email.length === 0)
					return (this.errorAlert = 'Поле "Электронная почта" не может быть пустым')
				this.isEmailCorrect = this.emailRegex.test(email)
				if (this.isEmailCorrect === false) return (this.errorAlert = 'Вы ввели некорректный email')
				if (domain.length === 0) return (this.errorAlert = 'Поле "Домен" не может быть пустым')
				// eslint-disable-next-line
				const data = await useNuxtApp().$api(`/api/v1/client/`, {
					method: 'POST',

					body: {
						name,
						email,
						domain: domain,
						ip,
					},
				})
				await this.getClientData()
				this.success = 'Новый клиент успешно создан!'
			} catch (error: any) {
				console.error(`Ошибка: ${error.response._data.message}`)
				if (error.response._data.message === 'Пользователь с таким email уже существует.')
					return (this.errorAlert = error.response._data.message)
				this.errorAlert = 'Произошла ошибка при добавлении нового клиента'
			}
		},
		async settingApiClient(): Promise<void> {
			try {
				const route = useRoute()
				const buyWebhookUrl = this.clientBuy_webhook_url === '' ? null : this.clientBuy_webhook_url
				const sellWebhookUrl =
					this.clientSell_webhook_url === '' ? null : this.clientSell_webhook_url
				// eslint-disable-next-line
				const data = await useNuxtApp().$api(`/api/v1/client/`, {
					method: 'PUT',

					query: {
						id: route.params.uuid,
					},
					body: {
						ip: this.clientIp.map((item) => item.ip),
						buy_webhook_url: buyWebhookUrl,
						sell_webhook_url: sellWebhookUrl,
					},
				})
			} catch (error) {
				console.error(error)
			}
		},
		async updateApiKey() {
			try {
				if (this.clientApiKey !== '') {
					await useNuxtApp().$api(`/api/v1/auth/update-api-key/${this.clientUserId}`, {
						method: 'PUT',
						body: JSON.stringify({
							api_key: this.clientApiKey,
						}),
					})
				}
			} catch (e) {
				console.error(e)
			}
		},
		async paymentMethods() {
			this.isLoading = true
			try {
				const route = useRoute()
				const data = await useNuxtApp().$api<PaymentData[]>(
					`/api/v1/finance/client/${route.params.uuid}/payment-methods`,
				)
				this.paymentData = data
				const { payment_methods: fetchingAllPaymentMethods } = await useNuxtApp().$api<{
					payment_methods: PaymentData[]
				}>(`/api/v1/finance/payment_methods/all`)

				this.mappedArrOfPaymentMethods = data.map((dataItem) => {
					const matchingItem = fetchingAllPaymentMethods.find(
						(fetchItem) => fetchItem.id === dataItem.internal_method_id,
					)
					return {
						...dataItem,
						type: matchingItem ? matchingItem.type : 'unknown',
					}
				})
				this.paymentNames = this.mappedArrOfPaymentMethods.map((item) => item.internal_method_name)
				this.unusedPaymentMethods = fetchingAllPaymentMethods.filter(
					(item) =>
						!this.mappedArrOfPaymentMethods.some(
							(data) =>
								data.internal_method_name === item.name && data.internal_method_id === item.id,
						),
				)

				this.unusedPaymentMethods = this.unusedPaymentMethods.map((item: any) => ({
					value: item.id,
					label: item.name,
				}))
			} catch (error) {
				console.error(error)
			} finally {
				this.isLoading = false
			}
		},
		async blockedProviders() {
			this.isLoading = true
			try {
				const route = useRoute()
				const data = await useNuxtApp().$api<BlockedData[]>(
					`/api/v1/client/blocked-providers/${route.params.uuid}`,
				)
				this.blockedData = data

				// eslint-disable-next-line
				// @ts-ignore
				const { items } = await useNuxtApp().$api<Provider[]>(`/api/v1/provider/`, {
					query: {
						size: 100,
					},
				})
				this.providerData = items

				// filter providers which are not blocked by user for select
				this.selectProviderNames = items.filter(
					(provider: Provider) => !data.some((blocked) => blocked.name === provider.name),
				)
				this.providerNames = this.selectProviderNames.map((provider: Provider) => provider.name)
			} catch (error) {
				console.error(error)
			} finally {
				this.isLoading = false
			}
		},

		async updatePaymentMethod(
			client_id: string | undefined,
			internal_method_id: string | undefined | [],
			buyFee: string | null,
			sellFee: string | null,
			minBuy: string | null,
			maxBuy: string | null,
			minSell: string | null,
			maxSell: string | null,
			isFeeEmpty: boolean,
		) {
			const route = useRoute()
			try {
				if (
					client_id === undefined ||
					internal_method_id === undefined ||
					buyFee === undefined ||
					sellFee === undefined ||
					minSell === undefined ||
					maxSell === undefined ||
					minBuy === undefined ||
					maxBuy === undefined
				)
					return (
						(this.errorAlert =
							'Произошла ошибка при обновлении метода, кажется ID клиента или платежного метода пуст'),
						console.error('client id and internal method id === undefined - error to put fee')
					)
				const methodUpdate = {
					buy_fee: buyFee,
					sell_fee: sellFee,
					min_buy_amount: minBuy,
					max_buy_amount: maxBuy,
					min_sell_amount: minSell,
					max_sell_amount: maxSell,
				}

				let filteredMethodUpdate = {}

				// Convert empty strings to null
				if (isFeeEmpty) {
					filteredMethodUpdate = Object.fromEntries(
						Object.entries(methodUpdate).map(([key, value]) => [key, value === '' ? null : value]),
					)
				} else {
					filteredMethodUpdate = Object.fromEntries(
						Object.entries(methodUpdate).filter(([_, value]) => value !== '' && value !== null),
					)
				}
				//eslint-disable-next-line
				const updateData = await useNuxtApp().$api(`/api/v1/finance/update-multiple-client-fees`, {
					method: 'PUT',

					query: {
						client_id: route.params.uuid,
					},
					body: {
						internal_method_ids: internal_method_id,
						client_fee_update: filteredMethodUpdate,
					},
				})
				this.success = 'Метод оплаты успешно обновлен!'
				await this.paymentMethods()
			} catch (error: any) {
				this.errorAlert = error.response._data.error
				console.error(error.response)
			}
		},
		async userAccountUpdate() {
			try {
				const route = useRoute()
				// eslint-disable-next-line
				const data = await useNuxtApp().$api(`/api/v1/client/`, {
					method: 'PUT',
					query: {
						id: route.params.uuid,
					},

					body: {
						name: this.clientName,
						user_id: route.params.uuid,
						country: this.clientCountry,
						support_link: this.clientSupportLink || null,
						description: this.clientDesc,
						manager: this.clientManager,
					},
				})
				this.success = 'Данные профиля клиента успешно обновлены'
			} catch (error: any) {
				console.error(error)
				this.errorAlert = error.response._data.message
			}
		},
		async generateNewIpAddress(ip: string) {
			this.clientIp.push({
				ip: ip,
			})
			this.clientIp = [...this.clientIp]
		},
		async deleteIpAddress(ip: string) {
			this.clientIp = this.clientIp.filter((item) => item.ip !== ip)
			this.clientIp = [...this.clientIp]
		},
	},
})
