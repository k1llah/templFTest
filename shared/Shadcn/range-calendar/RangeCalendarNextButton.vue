<script lang="ts" setup>
	import { type HTMLAttributes, computed } from 'vue'
	import { RangeCalendarNext, type RangeCalendarNextProps, useForwardProps } from 'radix-vue'
	import { ChevronRight } from 'lucide-vue-next'
	import { cn } from '@/lib/utils/shadcn'
	import { buttonVariants } from '@/shared/Shadcn/button'

	const props = defineProps<RangeCalendarNextProps & { class?: HTMLAttributes['class'] }>()

	const delegatedProps = computed(() => {
		const { class: _, ...delegated } = props

		return delegated
	})

	const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
	<RangeCalendarNext
		:class="
			cn(
				buttonVariants({ variant: 'outline' }),
				'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
				props.class,
			)
		"
		v-bind="forwardedProps">
		<slot>
			<ChevronRight class="size-4" />
		</slot>
	</RangeCalendarNext>
</template>
