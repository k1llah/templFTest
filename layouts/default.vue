<script setup lang="ts">
	const statusSidebar = ref(false)
	function toggleSidebar() {
		statusSidebar.value = !statusSidebar.value
	}
</script>
<template>
	<div
		id="__layout"
		class="flex min-h-screen">
		<AppSidebar :status-sidebar="statusSidebar" />
		<div class="flex w-full flex-col items-start">
			<AppHeader @change-status="toggleSidebar" />

			<slot />

			<div class="md:hidden">
				<AppMobileSidebar />
			</div>
		</div>
	</div>
</template>
