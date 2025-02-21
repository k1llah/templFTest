import type { Dayjs } from 'dayjs'
export interface ChartData {
	labels: string[]
	datasets: {
		data: number[]
		backgroundColor: CanvasGradient | string
		borderColor: string
		borderWidth: number
		pointBackgroundColor?: string
		pointRadius: number
		tension: number
		fill: boolean // Установим fill в true для заполнения области под линией
	}[]
}

export interface ChartOptions {
	responsive: boolean
	plugins: {
		legend: {
			display: boolean
		}
		tooltip: {
			backgroundColor: string
			bodyColor: string
			borderColor: string
			borderWidth: number
			cornerRadius: number
			callbacks: {
				title: any
				label?: (context: { raw: number }) => string
				labelColor: any
			}
			displayColors: boolean
		}
	}
	scales: {
		x: {
			beginAtZero: boolean
			grid: {
				display: boolean
			}
			ticks: {
				align: 'center'
			}
		}
		y: {
			beginAtZero: boolean
			grid: {
				display: boolean
			}
		}
	}
}

export interface ChartItem {
	completed: number
	conversion: number
	conversion_change: number
	date: Dayjs | string
	total: number
}

export interface InfoItem {
	title: string
	value: string | number
}

export interface PropsChartItem extends Array<ChartItem> {}
