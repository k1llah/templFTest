export interface ProviderData {
	api_key: string
	country: string
	id: string
	language: string
	manager: string | null
	name: string
	secret_key: string
	url: string
	balance: string
	priority_level?: string | number | null
	priority_expires_at?: string | null
	priority_revenue_threshold?: string | number | null
	priority_set_at?: string | null
	turnover?: string | number | null
}

export interface ProviderResponse {
	total: number
	page: number
	size: number
	pages: number
	items: ProviderData[]
}
