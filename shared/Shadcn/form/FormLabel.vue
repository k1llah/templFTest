<script lang="ts" setup>
	import type { HTMLAttributes } from 'vue'
	import type { LabelProps } from 'radix-vue'
	import { useFormField } from './useFormField'
	import { cn } from '@/lib/utils/shadcn'
	import { Label } from '@/shared/Shadcn/label'

	const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()

	const { error, formItemId } = useFormField()
</script>

<template>
	<Label
		:class="cn(error && 'text-red-500 dark:text-red-900', props.class)"
		:for="formItemId">
		<slot />
	</Label>
</template>
