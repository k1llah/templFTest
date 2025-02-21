export interface ClientBalance {
	available: string
	frozen: string
	total: string
	name: string
	owner_id: string
}

export interface GetClientHistoryForm {
	start_date?: string
	end_date?: string
	page: number
	size: number
	payment_method?: string
	status?: string
	order_side?: string
	clientId?: string | string[]
}

export interface HistoryItem {
	amount: string
	client_id: string
	created_at: string
	description: string
	id: string
	transaction_type: string
}

export interface History {
	items: HistoryItem[]
	total: number
	page: number
	size: number
	pages: number
}
