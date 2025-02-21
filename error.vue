<script setup lang="ts">
	import type { NuxtError } from '#app'

	const props = defineProps({
		error: Object as () => NuxtError,
	})
	const route = useRoute()
	const router = useRouter()
	const refresh = async () => {
		await useNuxtApp().$api('/api/v1/auth/refresh', {
			method: 'POST',
		})
	}
	const isAuth = ref()
	onBeforeMount(async () => {
		try {
			await refresh()
			isAuth.value = true
		} catch (error) {
			console.error(error)
			isAuth.value = false
		}
	})
</script>

<template>
	<div v-if="isAuth === true || isAuth === false">
		<NuxtLayout :name="isAuth ? 'default' : 'auth'">
			<div class="flex items-center justify-center sm:h-fit sm:w-full md:h-[100vh] md:w-full">
				<div class="flex flex-col items-center justify-center">
					<h1 class="font-bold text-[#E0E0E0] sm:text-[160px] md:text-[200px]">
						{{ props?.error?.statusCode }}
					</h1>
					<div
						v-if="props?.error?.message"
						class="sm:text-[24px] md:text-[32px]">
						<p class="text-[#3A485E]">
							Страница не найдена <span class="text-[#000000]">{{ route.path }}</span>
						</p>
					</div>
					<ShadcnButton
						class="sm:mt-6 md:mt-8"
						@click="router.back">
						Вернуться на предыдущую страницу
					</ShadcnButton>
				</div>
			</div>
		</NuxtLayout>
	</div>
</template>
