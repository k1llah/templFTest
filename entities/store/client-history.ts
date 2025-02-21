import { defineStore } from 'pinia'
import type {
	ClientBalance,
	History,
	GetClientHistoryForm,
	HistoryItem,
} from '~/entities/interfaces/client-history'

export const useClientHistory = defineStore('history', {
	state: () => ({
		clientBalance: {} as ClientBalance,
		historyList: [] as HistoryItem[],
		isLoading: false,
		lastPage: 1,
	}),
	actions: {
		async getClientDepositTransaction(form: GetClientHistoryForm): Promise<void> {
			this.isLoading = true
			try {
				const response = await useNuxtApp().$api<History>(
					`/api/v1/finance/client/${form.clientId}/deposit-transactions`,
					{
						query: {
							page: form.page,
							size: form.size,
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
		async getClientBalanceById(id: string | string[]): Promise<void> {
			try {
				const response = await useNuxtApp().$api<ClientBalance>(
					`/api/v1/finance/client/${id}/balance`,
				)

				this.clientBalance = Object.assign(
					{},
					{
						available: response.available,
						frozen: response.frozen,
						total: response.total,
					},
				)
			} catch (error) {
				console.error(error)
			}
		},
	},
})
