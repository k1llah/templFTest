export interface CountDeals {
	client_id: string
	statuses: {
		Completed: number
		CanceledByService: number
		CanceledByTimeout: number
		Unpaid: number
	}
}
export interface CountDealsProvider {
	provider_id: string
	statuses: {
		Completed: number
		CanceledByService: number
		CanceledByTimeout: number
		Unpaid: number
	}
}
