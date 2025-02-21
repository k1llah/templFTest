export interface User {
	email: string
	role: string
	api_key: string
	id: string
	hashed_password: string
}
export interface UserUpdate {
	user: {
		email: string
		role: string
		api_key: string
		id: string
		hashed_password: string
	}
	new_password: string
}
export interface UserCreate {
	api_key: string
	password: string
	user: {
		api_key: string
		email: string
		hashed_password: string
		id: string
		role: string
	}
}
