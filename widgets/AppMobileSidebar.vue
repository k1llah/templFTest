<script setup lang="ts">
	const isVisible = ref(true)

	let lastScrollTop = 0
	const scrollThreshold = 30
	const handleScroll = () => {
		const currentScroll = window.scrollY || document.documentElement.scrollTop

		if (currentScroll > lastScrollTop + scrollThreshold) {
			isVisible.value = false
		} else if (lastScrollTop > currentScroll + scrollThreshold) {
			isVisible.value = true
		}

		lastScrollTop = currentScroll <= 0 ? 0 : currentScroll
	}

	onMounted(() => {
		window.addEventListener('scroll', handleScroll)
	})

	onUnmounted(() => {
		window.removeEventListener('scroll', handleScroll)
	})
</script>

<template>
	<div
		:class="{ 'hide-sidebar': !isVisible }"
		class="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between bg-white px-6 pb-7 pt-4 transition-all duration-300 ease-in-out">
	<h1>sidebar</h1>
	</div>
</template>
<style scoped>
	.hide-sidebar {
		position: fixed;
		bottom: -100px;
		transition: all 0.3s ease-in-out;
	}
</style>
