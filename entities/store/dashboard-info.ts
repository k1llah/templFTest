import { defineStore } from 'pinia'
import type {
	OrderAdminInfo,
	BalanceInfo,
	BalanceInfoDetail,
	FormDate,
	ChartDataResult,
} from '~/entities/interfaces/dashboard-table'

export const useDashboardStore = defineStore('dashboard', {
	state: () => ({
		orderAdminInfo: {
			buy_revenue: '0.00',
			sell_revenue: '0.00',
			total_revenue: '0.00',
		} as OrderAdminInfo,

		providerBalance: {
			available: '0.00',
			frozen: '0.00',
			total: '0.00',
		} as BalanceInfo,

		clientBalance: {
			available: '0.00',
			frozen: '0.00',
			total: '0.00',
		} as BalanceInfo,

		clientBalanceDetail: [] as BalanceInfoDetail[],

		providerBalanceDetail: [] as BalanceInfoDetail[],

		chartData: {} as ChartDataResult,

		chartDataAmount: {} as ChartDataResult,

		isLoading: false,
	}),
	actions: {
		async getOrderAdmin(form: FormDate): Promise<void> {
			this.isLoading = true
			try {
				const paramsObj = {
					...(form.start_date && { start_date: form.start_date }),
					...(form.end_date && { end_date: form.end_date }),
					...(form.client_id && { client_id: form.client_id }),
					...(form.provider_id && { provider_id: form.provider_id }),
				}
				const searchParams = new URLSearchParams(paramsObj as any)
				const res = await useNuxtApp().$api<OrderAdminInfo>(
					`/api/v1/finance/revenue?${searchParams.toString()}`,
				)
				this.orderAdminInfo = {
					buy_revenue: Number.parseFloat(res.buy_revenue).toFixed(2),
					sell_revenue: Number.parseFloat(res.sell_revenue).toFixed(2),
					total_revenue: Number.parseFloat(res.total_revenue).toFixed(2),
				}
			} catch (error) {
				console.error(error)
			} finally {
				this.isLoading = false
			}
		},
		async getBalance(name: string): Promise<void> {
			try {
				const res = await useNuxtApp().$api<BalanceInfo>(`/api/v1/finance/${name}/balance`)
				const formatNumber: BalanceInfo = {
					available: Number.parseFloat(res.available).toFixed(2),
					frozen: Number.parseFloat(res.frozen).toFixed(2),
					total: Number.parseFloat(res.total).toFixed(2),
				}
				if (name === 'provider') {
					this.providerBalance = formatNumber
				} else {
					this.clientBalance = formatNumber
				}
			} catch (error) {
				console.error(error)
			}
		},
		async getBalanceDetail(name: string): Promise<void> {
			const formatData: BalanceInfoDetail[] = []
			try {
				const res = await useNuxtApp().$api<BalanceInfoDetail[]>(
					`/api/v1/finance/${name}/balance/detail`,
				)
				for (const item of res) {
					formatData.push({
						available: Number(item.available),
						frozen: Number.parseFloat(item.frozen).toFixed(2),
						name: item.name,
						owner_id: item.owner_id,
					})
				}

				if (name === 'provider') {
					this.providerBalanceDetail = formatData
				} else {
					this.clientBalanceDetail = formatData
				}
			} catch (error) {
				console.error(error)
			}
		},
		async getChartData(form: FormDate) {
			this.isLoading = true
			try {
				const paramsObj = {
					...(form.start_date && { start_date: form.start_date }),
					...(form.end_date && { end_date: form.end_date }),
					...(form.client_id && { client_id: form.client_id }),
					...(form.provider_id && { provider_id: form.provider_id }),
					...(form.by_amount && { by_amount: form.by_amount }),
					...(form.order_side && { order_side: form.order_side }),
				}

				const searchParams = new URLSearchParams(paramsObj as any)
				const response = await useNuxtApp().$api<ChartDataResult>(
					`/api/v1/order/chart?${searchParams.toString()}`,
				)
				if (form.by_amount) this.chartDataAmount = response
				else this.chartData = response
			} catch (error) {
				console.error(error)
			} finally {
				this.isLoading = false
			}
		},
	},
})
