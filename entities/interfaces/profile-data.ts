export interface ProfileData {
	name: string
	api_key: string
	secret_key: string
	url: string
	id: string
	country: string
	user_id: string
	manager: string
	sell_webhook_url: string
	buy_webhook_url: string
	user_info: {
		email: string
		role: string
		api_key: string
		hashed_password: string
		id: string
	}
	support_link: string
	language: string
	description: string
	active: boolean
	ip: string[]
}
