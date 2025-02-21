<template>
	<div class="flex items-center justify-center gap-1">
		<span>{{ props.deposit?.currency || '' }}</span>
		<div
			v-if="currencySign"
			class="flex size-4 items-center justify-center rounded-full bg-[#085EC5]">
			<div class="flex size-full items-center justify-center rounded-full text-white">
				<p class="">{{ currencySign }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	interface Deposit {
		currency: string
		available?: string
		frozen?: string
	}
	const props = defineProps({
		deposit: Object as () => Deposit,
	})
	const currencySign = computed(() => {
		switch (props.deposit?.currency) {
			case 'RUB':
				return '\u20BD'
			case 'UZS':
				return '\u20B9'

			case 'TJS':
				return '\u0404'

			case 'AZN':
				return '₼'

			case 'KGS':
				return '\u20B9'

			default:
				return ''
		}
	})
</script>
