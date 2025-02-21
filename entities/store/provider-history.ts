import { defineStore } from 'pinia'
import type { ApiRequests, PaymentMethod } from '~/entities/interfaces/order-page'
import type { ClientBalance, History, HistoryItem } from '~/entities/interfaces/client-history'

export const useProviderHistory = defineStore('provider-history', {
	state: () => ({
		token: useCookie('access_token'),
		methodPaymentList: reactive<PaymentMethod[]>([]),
		providerBalance: {} as ClientBalance,
		historyList: [] as HistoryItem[],
		isLoading: false,
		lastPage: 1,
	}),
	actions: {
		async getProviderDepositTransaction(paginationParams: GetClientHistoryForm): Promise<void> {
			this.isLoading = true
			try {
				const route = useRoute()
				const response = await useNuxtApp().$api<History>(
					`/api/v1/finance/provider/${route.params.uuid}/deposit-transactions`,
					{
						query: {
							page: paginationParams.page,
							size: paginationParams.size,
						},
					},
				)

				this.historyList = response.items
				this.lastPage = response.pages
			} catch (error) {
				console.error(error)
			} finally {
				this.isLoading = false
			}
		},
		async getProviderBalanceById(id: string | string[]): Promise<void> {
			const response = await useNuxtApp().$api<ClientBalance>(
				`/api/v1/finance/provider/${id}/balance`,
			)

			this.providerBalance = Object.assign(
				{},
				{
					available: response.available,
					frozen: response.frozen,
					total: response.total,
				},
			)
		},
		async getPaymentMethods(): Promise<void> {
			try {
				this.methodPaymentList = await useNuxtApp().$api<ApiRequests>(
					`/api/v1/finance/payment_methods/all`,
				)
			} catch (error) {
				console.error('Error fetching payment methods:', error)
			}
		},
	},
})
