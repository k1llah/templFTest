<script setup lang="ts">
	import type { HTMLAttributes } from 'vue'
	import { cn } from '@/lib/utils/shadcn'

	const props = defineProps<{
		class?: HTMLAttributes['class']
	}>()
</script>

<template>
	<div class="no-scroll no-scrollbar mt-6 max-h-[60vh] w-full overflow-scroll">
		<table :class="cn('w-full caption-bottom text-sm', props.class)">
			<slot />
		</table>
	</div>
</template>
