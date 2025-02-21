<script setup lang="ts">
	import type { HTMLAttributes } from 'vue'
	import { Primitive, type PrimitiveProps } from 'radix-vue'
	import { type ButtonVariants, buttonVariants } from '.'
	import { cn } from '@/lib/utils/shadcn'

	interface Props extends PrimitiveProps {
		variant?: ButtonVariants['variant']
		size?: ButtonVariants['size']
		class?: HTMLAttributes['class']
	}

	const props = withDefaults(defineProps<Props>(), {
		as: 'button',
	})
</script>

<template>
	<Primitive
		:as="as"
		:as-child="asChild"
		:class="cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)">
		<slot />
	</Primitive>
</template>

<style lang="postcss" scoped>
	.button-gray {
		@apply bg-gray-200 text-gray-600;
	}
	.button-gray:hover {
		@apply bg-primary text-white;
	}
	.button-white {
		@apply bg-white border-2 border-primary text-primary;
	}
	.button-white-not-border {
		@apply bg-white border-2 border-white text-black;
		&:hover {
			@apply bg-[#E9F2FE];
		}
	}
	.button-white:hover {
		@apply bg-primary text-white;
	}
	.button-blue {
		@apply bg-primary text-white;
	}
	.button-blue:hover {
		@apply opacity-95;
	}
</style>
