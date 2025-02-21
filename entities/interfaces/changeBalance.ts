export interface ChangeBalancePayload {
	clientId: string | string[]
	type: string
	amount: string
	description: string
}
