import { defineStore } from 'pinia'
export const useDevice = defineStore('device', {
	state: () => ({
		isMobile: false,
	}),
	actions: {
		setIsMobile(isMobile: boolean) {
			this.isMobile = isMobile
		},
	},
})
