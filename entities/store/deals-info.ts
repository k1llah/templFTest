import { defineStore } from 'pinia'
import type {
	GetDealsForm,
	OrderResponse,
	Order,
	ApiRequests,
	PaymentMethod,
	OrderResponseLite,
	OrderResponseItem,
} from '~/entities/interfaces/order-page'

export const useDealsStore = defineStore('deals', {
	state: () => ({
		dealsList: [] as Order[],
		dealsPages: 0,
		methodPaymentList: [] as PaymentMethod[],
		success: '',
		errorAlert: '',
		isLoading: false,
	}),
	actions: {
		async getDealsList(form: GetDealsForm): Promise<void> {
			try {
				this.dealsList = []
				const route = useRoute()
				const typeId = route.matched[0].name === 'providers-uuid' ? 'provider' : 'client'
				const paramsObj = {
					page: form.page,
					size: form.size,
					...(form.byId && typeId === 'provider'
						? { provider_id: form.byId }
						: { client_id: form.byId }),
					...(form.payment_method && { payment_method: form.payment_method }),
					...(form.start_date && { start_date: form.start_date }),
					...(form.end_date && { end_date: form.end_date }),
					...(form.status && { order_status: form.status }),
					...(form.order_side && { order_side: form.order_side }),
				}

				const searchParams = new URLSearchParams(paramsObj as any)

				const endpointBase = `/api/v1/order/${form.byId ? `by_${typeId}` : ''}`

				const response = await useNuxtApp().$api<OrderResponse | OrderResponseLite>(
					`${endpointBase}?${searchParams.toString()}`,
				)
				if ((response as OrderResponse).orders) {
					this.dealsList = (response as OrderResponse).orders.items
					this.dealsPages = (response as OrderResponse).orders.pages
				} else {
					this.dealsList = (response as OrderResponseLite).items
					this.dealsPages = (response as OrderResponseLite).pages
				}
			} catch (error) {
				this.dealsList = []
				console.error('Error fetching deals list:', error)
			}
		},
		async getPaymentMethods(): Promise<void> {
			try {
				const response = await useNuxtApp().$api<ApiRequests>(`/api/v1/finance/payment_methods/all`)
				this.methodPaymentList = response.payment_methods
			} catch (error) {
				console.error('Error fetching payment methods:', error)
			}
		},
		async getOrderId(id: string | number): Promise<void> {
			try {
				interface OrderObject {
					message: string
					order: Order
					success: boolean
				}
				const response = await useNuxtApp().$api<OrderObject | OrderResponseItem>(
					`/api/v1/order/search`,
					{
						query: { id: id },
					},
				)

				this.dealsList = (response as OrderResponseItem).orders
			} catch (error) {
				console.error('Error fetching order:', error)
			}
		},
		async changeDealOrder(form: {
			status: string
			amount: number
			id: string
			start_date: string
			end_date: string
			byId: string | string[]
		}): Promise<void> {
			try {
				await useNuxtApp().$api(`/api/v1/order/`, {
					method: 'PUT',

					query: {
						order_id: form.id,
					},
					body: {
						amount: form.amount,
						status: form.status,
					},
				})
				await this.getDealsList({
					page: 1,
					size: 10,
					start_date: form.start_date,
					end_date: form.end_date,
					byId: form.byId,
				})
				this.success = 'Изменение ордера успешно завершено!'
			} catch (error: any) {
				console.error(error)
				this.errorAlert = error.response._data.message
			}
		},
	},
})
