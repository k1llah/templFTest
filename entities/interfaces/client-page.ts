export interface Client {
	active: boolean
	country: string | null
	description: string | null
	id: string
	ip: string[]
	language: string | null
	name: string
	url: string
	user_id: string
	user_info: {
		email: string
		role: string
		api_key: string
		hashed_password: string
		id: string
	}
}

export interface ClientResponse {
	total: number
	page: number
	size: number
	pages: number
	items: Client[]
}
