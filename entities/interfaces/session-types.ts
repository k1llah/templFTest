export interface GetSessionsForm {
	pages: number
	start_date?: string
	end_date?: string
	page: number
	size: number
	payment_method?: string
	status?: string
	order_side?: string
	clientId?: string | string[]
	items: SessionData[]
}

export interface SessionData {
	amount: number
	client_id: string
	client_order_id: string
	created_at: string
	expires_at: string
	ip_address: string | null
	merchant_name: string
	order_id: string | null
	order_side: string
	payment_confirmation_expires_at: string | null
	payment_confirmation_starts_at: string | null
	payment_method_id: string | null
	payment_method_type: string | null
	redirect_url: string | null
	requisites_request_expires_at: string | null
	requisites_request_starts_at: string | null
	selection: boolean
	session_id: string
	state: string
	support_url: string
	updated_at: string
	created_amount: number | string
	search_count: number | string
}
