import { defineStore } from 'pinia'
import type { User } from '~/entities/interfaces/user'
export const useUsers = defineStore('users', {
	state: () => ({
		data: [] as User[],
		errorAlert: '',
		success: '',
		isLoading: false,
	}),
	actions: {
		async userFetch() {
			this.isLoading = true
			try {
				const fetchUser = await useNuxtApp().$api<User[]>('/api/v1/user/')
				this.data = fetchUser
			} catch (error) {
				console.error(error)
			} finally {
				this.isLoading = false
			}
		},
	},
})
