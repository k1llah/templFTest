<script setup lang="ts">
	import { type HTMLAttributes, computed } from 'vue'
	import { PaginationFirst, type PaginationFirstProps } from 'radix-vue'
	import { ChevronsLeft } from 'lucide-vue-next'
	import { Button } from '@/shared/Shadcn/button'
	import { cn } from '@/lib/utils/shadcn'

	const props = withDefaults(
		defineProps<PaginationFirstProps & { class?: HTMLAttributes['class'] }>(),
		{
			asChild: true,
		},
	)

	const delegatedProps = computed(() => {
		const { class: _, ...delegated } = props

		return delegated
	})
</script>

<template>
	<PaginationFirst v-bind="delegatedProps">
		<Button
			:class="cn('w-10 h-10 p-0', props.class)"
			class="shadowPagination border-none"
			variant="outline">
			<slot>
				<ChevronsLeft class="size-4" />
			</slot>
		</Button>
	</PaginationFirst>
</template>
<style scoped>
	.shadowPagination {
		box-shadow: 0px 0px 8px 5px rgba(0, 0, 0, 0.03);
	}
</style>
