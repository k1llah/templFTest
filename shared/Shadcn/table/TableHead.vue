<script setup lang="ts">
	import type { HTMLAttributes } from 'vue'
	import { cn } from '@/lib/utils/shadcn'

	const props = defineProps<{
		class?: HTMLAttributes['class']
	}>()
</script>

<template>
	<th
		:class="
			cn(
				'h-12 md:px-4 sm:px-0 text-left align-middle font-bold text-[#151515] [&:has([role=checkbox])]:pr-0',
				props.class,
			)
		">
		<slot />
	</th>
</template>
