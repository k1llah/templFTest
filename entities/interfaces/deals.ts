export interface Order {
	order_side: string // Buy или Sell
	client_id: string
	provider_id: string
	client_order_id: string
	provider_order_id: string
	internal_method_id: string
	method_name: string
	amount: number
	provider_amount: number
	fee: number
	provider_fee: number
	status: string
	holder_name: string | null
	holder_account: string | null
	customer_name: string | null
	customer_account: string | null
	created_at: string
	updated_at: string
	expires_at: string
	id: string
}

export interface OrdersResponse {
	success: boolean
	message: string
	orders: {
		total: number
		page: number
		size: number
		pages: number
		items: Order[]
	}
}
