import { useDevice } from '~/entities/store/device'

export default defineNuxtPlugin(async (_nuxtApp) => {
	const deviceStore = useDevice()
	const headers = useRequestHeaders()

	deviceStore.setIsMobile(
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(headers['user-agent']),
	)
})
