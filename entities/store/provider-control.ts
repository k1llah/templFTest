import { defineStore } from 'pinia'
import type { ProviderResponse, ProviderData } from '~/entities/interfaces/provider-page'
import type { PaymentData } from '~/entities/interfaces/payment-data'
import type { ClientBalance } from '~/entities/interfaces/client-history'
import type { BlockedData } from '~/entities/interfaces/blocked-data'
import type { Provider } from '~/entities/interfaces/provider'
import type { ProfileData } from '~/entities/interfaces/profile-data'
import type { CountDealsProvider } from '../interfaces/countDeals'
import { toast } from 'vue-sonner'
interface combobox {
	label: string
	value: string
}
export const useProvider = defineStore('provider', {
	state: () => ({
		isActive: false,
		isLoading: false,
		sizePage: 100,
		selectedProvider: '',
		success: '',
		errorAlert: '',

		// Provider data vars
		providerName: '',
		prevProviderDesc: '',
		providerUrl: '',
		providerManager: '',
		providerCountry: '',
		providerDesc: '',
		providerLang: '',
		providerApiKey: '',
		providerSecretKey: '',
		providerId: '',

		// Previous provider data vars
		prevProviderName: '',
		prevProviderUrl: '',
		prevProviderManager: '',
		prevProviderCountry: '',
		prevProviderLang: '',

		// Arrays and objects
		clientPaginationOption: {} as { page: number; size: number; pages: number },
		providerData: [] as ProviderData[],
		providerIp: [] as { ip: string }[],
		paymentData: [] as PaymentData[],
		paymentNames: [] as string[],
		blockedData: [] as BlockedData[],
		clientData: [] as Client[],
		sortedProviderData: [] as Provider[],
		mappedArrOfPaymentMethods: [] as PaymentData[],
		unusedPaymentMethods: [{}] as combobox[],
		providerNames: [{}] as string[],
		selectProviderNames: [{}] as PaymentData[],
		blackList: [{}],
	}),
	actions: {
		async getProviderData(page?: number) {
			this.isLoading = true
			try {
				const providerData = await useNuxtApp().$api<ProviderResponse>(
					`/api/v1/provider/?page=${page ? page : 1}&size=${this.sizePage}`,
				)
				const countDeals = await useNuxtApp().$api<CountDealsProvider[]>(
					'/api/v1/order/count-by-status-per-provider',
				)
				this.providerData = providerData.items
				this.clientPaginationOption = {
					page: providerData.page,
					size: providerData.size,
					pages: providerData.pages,
				}
				const providersWithDeals = providerData.items.map((provider: ProviderData) => {
					const providerDeals = countDeals.find((deal) => deal.provider_id === provider.id)
					const completedDeals = providerDeals ? providerDeals.statuses.Completed : 0
					const canceledDeals =
						(providerDeals ? providerDeals.statuses.CanceledByService : 0) +
						(providerDeals ? providerDeals.statuses.CanceledByTimeout : 0)

					return {
						...provider,
						completedDeals,
						canceledDeals,
					}
				})

				this.providerData = providersWithDeals
				const balances = await useNuxtApp().$api<ClientBalance[]>(
					'/api/v1/finance/provider/balance/detail',
				)
				const providerDataBalance = this.providerData.map((client) => {
					const providerBalance = balances.find((balance) => balance.owner_id === client.id)
					const balance = providerBalance ? providerBalance.available : 0
					return {
						...client,
						balance,
					}
				})
				this.providerData = providerDataBalance
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
				const activityChange = await useNuxtApp().$api(`/api/v1/provider/${id}/toggle-active`, {
					method: 'PATCH',
				})
				const item = this.clientData.find((item: any) => item.id === id)
				if (item) {
					item.active = !item.active
				}
			} catch (error) {
				console.error(error)
			}
		},
		async getProfileProviderData() {
			try {
				const route = useRoute()
				const data = await useNuxtApp().$api<ProfileData>(`/api/v1/provider/${route.params.uuid}`)
				this.providerName = data.name
				this.providerIp = []
				this.providerManager = data.manager
				this.providerCountry = data.country
				this.providerLang = data.language
				this.providerApiKey = data.api_key
				this.providerSecretKey = data.secret_key

				// save first state to validate is form changed

				this.prevProviderName = data.name
				this.prevProviderManager = data.manager
				this.prevProviderCountry = data.country
				this.prevProviderLang = data.language
				// for (const ip of data.ip) {
				// 	this.providerIp.push({
				// 		ip: ip,
				// 	})
				// }
			} catch (error) {
				console.error(error)
			}
		},
		async editClient(form: { api_key?: string; secret_key?: string }): Promise<void> {
			try {
				const route = useRoute()
				// eslint-disable-next-line
				const data = await useNuxtApp().$api(`/api/v1/provider/`, {
					method: 'PATCH',
					query: {
						provider_id: route.params.uuid,
					},
					body: {
						api_key: form.api_key,
						secret_key: form.secret_key,
					},
				})
				toast.success('Активное действие выполнено')
			} catch (error) {
				console.error(error)
				toast.error('Произошла ошибка при обновлении данных')
			}
		},
		async paymentMethodsProvider() {
			try {
				const route = useRoute()
				const data = await useNuxtApp().$api<PaymentData[]>(
					`/api/v1/provider/${route.params.uuid}/methods`,
				)
				this.paymentData = data
			} catch (error) {
				console.error(error)
			}
		},
		async updatePaymentMethod(
			id: string | undefined,
			buy_fee: number | string,
			sell_fee: number | string,
			min_buy: number | string,
			max_buy: number | string,
			min_sell: number | string,
			max_sell: number | string,
			isActive: boolean,
		) {
			try {
				if (id === undefined) return console.error('client id === undefined - error to put fee', id)
				const route = useRoute()
				const methodUpdate = {
					buy_fee: buy_fee,
					sell_fee: sell_fee,
					active: isActive,
					min_buy_amount: min_buy,
					max_buy_amount: max_buy,
					min_sell_amount: min_sell,
					max_sell_amount: max_sell,
				}

				const filteredMethodUpdate = Object.fromEntries(
					Object.entries(methodUpdate).filter(([_, value]) => value !== '' && value !== null),
				)
				// eslint-disable-next-line
				const updateData = await useNuxtApp().$api(`/api/v1/provider/methods`, {
					method: 'PATCH',

					query: {
						provider_id: route.params.uuid,
					},
					body: {
						method_ids: id,
						method_update: filteredMethodUpdate,
					},
				})
				this.paymentMethodsProvider()
				this.success = 'Платежный метод успешно обновлен'
			} catch (error: any) {
				console.error(error)
				this.errorAlert = error.response._data.message
			}
		},
		async providerAccountUpdate() {
			try {
				const route = useRoute()
				// eslint-disable-next-line
				const data = await useNuxtApp().$api(`/api/v1/provider/`, {
					method: 'PATCH',

					query: {
						provider_id: route.params.uuid,
					},
					body: {
						name: this.providerName,
						// provider_id: route.params.uuid,
						country: this.providerCountry,
						language: this.providerLang,
						manager: this.providerManager,
					},
				})
				this.success = 'Данные профиля провайдера успешно обновлены'
			} catch (error: any) {
				console.error(error)
				this.errorAlert = error.response._data.message
			}
		},
		async generateNewIpAddress(ip: string) {
			this.providerIp.push({
				ip: ip,
			})
		},
	},
})
