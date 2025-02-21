export interface PaymentData {
	fiat_name: string
	id: string
	max_amount: string
	min_amount: string
	name: string
	buy_fee: string
	client_id: string
	internal_method_id: string
	internal_method_name: string
	sell_fee: string
	type: string
	max_sell_amount: string
	min_sell_amount: string
	max_buy_amount: string
	min_buy_amount: string
	active: boolean
}
export interface PaymentDataAddMethod {
	payment_methods: [
		{
			fiat_name: string
			id: string
			max_amount: string
			min_amount: string
			name: string
			buy_fee: string
			client_id: string
			internal_method_id: string
			internal_method_name: string
			sell_fee: string
			type: string
		},
		// Другие объекты PaymentData
	]
}
