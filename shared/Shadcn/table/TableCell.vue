<script setup lang="ts">
	import type { HTMLAttributes } from 'vue'
	import { cn } from '@/lib/utils/shadcn'

	const props = defineProps<{
		class?: HTMLAttributes['class']
	}>()
</script>

<template>
	<td :class="cn('md:p-4 sm:p-3 sm:px-1 align-middle [&:has([role=checkbox])]:pr-0', props.class)">
		<slot />
	</td>
</template>
