<script setup lang="ts">
	import { type HTMLAttributes, computed } from 'vue'
	import { TabsList, type TabsListProps } from 'radix-vue'
	import { cn } from '@/lib/utils/shadcn'

	const props = defineProps<TabsListProps & { class?: HTMLAttributes['class'] }>()

	const delegatedProps = computed(() => {
		const { class: _, ...delegated } = props

		return delegated
	})
</script>

<template>
	<TabsList
		v-bind="delegatedProps"
		:class="
			cn('inline-flex h-10 items-center rounded-md bg-muted text-muted-foreground', props.class)
		">
		<slot />
	</TabsList>
</template>
