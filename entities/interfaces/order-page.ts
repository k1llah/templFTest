export interface GetDealsForm {
	start_date?: string
	end_date?: string
	page: number
	size: number
	payment_method?: string
	status?: string
	order_side?: string
	clientId?: string | string[]
}
export interface OrderObject {
	message: string
	order: Order
	success: boolean
}
export interface ChangeDealOrderForm {
	status: string
	amount: number
	id: string
	start_date: string
	end_date: string
	byId: string | string[]
}
export interface Orders {
	order_side: string
	client_id: string
	provider_id: string
	client_order_id: string
	provider_order_id: string
	internal_method_id: string
	amount: string
	provider_amount: string
	provider_fee: string
	fee: string
	status: string
	holder_name: string
	holder_account: string
	customer_name: string
	customer_account: string
	created_at: string
	updated_at: string
	expires_at: string
	id: string
}

export interface OrderResponse {
	message: string
	orders: {
		items: Order[]
		pages: number
	}
	success: boolean
}

export interface OrderResponseItem {
	message: string
	orders: Order[]
	success: boolean
}

export interface OrderResponseLite {
	total: number
	page: number
	size: number
	pages: number
	items: Order[]
}

export interface PaymentMethod {
	name: string
	fiat_name: string
	type: string
	min_amount: string
	max_amount: string
	id: string
}

export type ApiRequests = {
	message: string
	payment_methods: PaymentMethod[]
	success: boolean
}
