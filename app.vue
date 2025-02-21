<script setup lang="ts">
	useHead({
		meta: [{ name: 'description', content: 'Ваше описание здесь' }],
	})
</script>
<template>
	<div id="__app">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
<style>
	.layout-enter-active,
	.layout-leave-active {
		transition: all 0.5s;
	}

	.layout-enter,
	.layout-leave-to {
		opacity: 0;
		filter: blur(1rem);
	}
</style>
