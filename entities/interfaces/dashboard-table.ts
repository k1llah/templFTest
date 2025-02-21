import type { Dayjs } from 'dayjs'

export interface Table {
	available: number
	frozen: string
	name: string
}

export interface ColumnHead {
	id: string
	name: string
	accessorKey: string
	cell: string
}

export interface FormDate {
	start_date: Dayjs | string // Указываем тип Dayjs
	end_date: Dayjs | string
	by_amount?: boolean
	client_id?: string
	provider_id?: string
	order_side?: string
}

export interface OrderAdminInfo {
	buy_revenue: string
	sell_revenue: string
	total_revenue: string
}

export interface BalanceInfo {
	available: string
	frozen: string
	total: string
	owner_id?: string
}

export interface BalanceInfoDetail {
	available: number | string
	frozen: string
	name: string
	owner_id?: string
}

export interface ChartDataResult {
	chart: {
		completed: number
		conversion: number
		conversion_change: number
		date: string
		total: number
	}[]
	total: number
	completed: number
	opened: number
	conversion: number
}

export type ColumnHeads = ColumnHead[]

export type Tables = Table[]
