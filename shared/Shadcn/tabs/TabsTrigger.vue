<script setup lang="ts">
	import { type HTMLAttributes, computed } from 'vue'
	import { TabsTrigger, type TabsTriggerProps, useForwardProps } from 'radix-vue'
	import { cn } from '@/lib/utils/shadcn'

	const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'] }>()

	const delegatedProps = computed(() => {
		const { class: _, ...delegated } = props

		return delegated
	})

	const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
	<TabsTrigger
		v-bind="forwardedProps"
		:class="
			cn(
				'inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-100 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:border-b-2 active:!shadow-none border-[#2182F5]',
				props.class,
			)
		">
		<slot />
	</TabsTrigger>
</template>
