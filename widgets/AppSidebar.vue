<script setup lang="ts">
	defineProps<{
		statusSidebar: boolean
	}>()
</script>

<template>
	<div
		class="default-shadow z-50 flex flex-col items-start border-r border-gray-400 p-2 pt-[1rem] max-md:hidden"
		:class="statusSidebar ? 'min-w-44' : 'min-w-16'">
		<h1 class="text-white">sidebar</h1>
	</div>
</template>

<style scoped>
	.shadow {
		box-shadow: 0 0 8px 5px rgba(0, 0, 0, 0.03);
	}
	.link:hover {
		width: 95%;
		opacity: 0.8;
		background-color: #e9f2fe;
		.hover-img-blue {
			filter: brightness(0) saturate(100%) invert(34%) sepia(92%) saturate(1768%) hue-rotate(202deg)
				brightness(91%) contrast(92%);
		}
	}
	.link:hover h3 {
		color: #2182f5;
	}

	.router-link-active {
		width: 95%;
		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;
		border-color: #2182f5;
		background-color: #e9f2fe;
	}
	.img-blue {
		filter: brightness(0) saturate(100%) invert(34%) sepia(92%) saturate(1768%) hue-rotate(202deg)
			brightness(91%) contrast(92%);
	}
	.default-shadow {
		transition: 0.3s;
	}
</style>
