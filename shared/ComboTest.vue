<script setup lang="ts">
	import { ref, computed } from 'vue'
	import { Check } from 'lucide-vue-next'
	import type { ClientBalance } from '~/entities/interfaces/client-history'
	import { cn } from '@/lib/utils/shadcn'
	import { Button } from '@/shared/Shadcn/button'
	import {
		Command,
		CommandEmpty,
		CommandGroup,
		CommandInput,
		CommandItem,
		CommandList,
	} from '@/shared/Shadcn/command'
	import { Popover, PopoverContent, PopoverTrigger } from '@/shared/Shadcn/popover'

	const props = defineProps({
		modelValue: { type: String, default: '' },
		items: { type: Array as () => Array<{ label: string; value: string }>, default: () => [] },
		clients: { type: Array as () => Array<ClientBalance>, default: () => [] },
		providers: { type: Array as () => Array<ClientBalance>, default: () => [] },
		label: { type: String, default: '' },
		externalClass: { type: String, default: '' },
		clearable: { type: Boolean, default: true },
	})
	const emit = defineEmits(['update:modelValue'])
	const selectedItemLabel = computed(() => {
		if (props.items.length) {
			return props.items.find((item) => item.value === props.modelValue)?.label || props.label
		} else {
			return (
				[...props.clients, ...props.providers].find((item) => item.owner_id === props.modelValue)
					?.name || props.label
			)
		}
	})
	const open = ref(false)
	const handleSelect = (value: typeof props.modelValue) => {
		emit('update:modelValue', value)
		open.value = false
	}

	function clearValue() {
		emit('update:modelValue', '')
	}
	// Сортировка items по value
	const sortedItems = computed(() => {
		return (props.items || []).sort((a, b) => a.value.localeCompare(b.value))
	})
</script>

<template>
	<Popover v-model:open="open">
		<PopoverTrigger as-child>
			<Button
				variant="outline"
				role="combobox"
				:aria-expanded="open"
				class="justify-between !rounded-[8px] text-[#596679]"
				:class="props.externalClass">
				{{ selectedItemLabel }}
				<img
					v-if="!modelValue || !props.clearable"
					class="ml-2 size-4 shrink-0 opacity-50"
					src="/icons/arrow-down.svg"
					alt="arrow" />
				<img
					v-else-if="modelValue && props.clearable"
					src="@/public/icons/close.svg"
					class="ml-2 size-4 shrink-0 opacity-50"
					alt="close"
					@click="clearValue" />
			</Button>
		</PopoverTrigger>
		<PopoverContent class="p-0">
			<Command>
				<CommandInput
					class="h-9"
					placeholder="Поиск" />
				<CommandEmpty>Ничего не найдено</CommandEmpty>
				<CommandList>
					<CommandGroup v-if="props.clients.length">
						<div class="p-2 text-sm text-gray-500">Клиенты</div>
						<CommandItem
							v-for="item in props.clients"
							:key="item.owner_id"
							:value="item.owner_id"
							@select="handleSelect(item.owner_id)">
							{{ item.name }}
							<Check
								:class="
									cn(
										'ml-auto h-4 w-4',
										item.owner_id === props.modelValue ? 'opacity-100' : 'opacity-0',
									)
								" />
						</CommandItem>
					</CommandGroup>
					<CommandGroup v-if="props.providers.length">
						<div class="p-2 text-sm text-gray-500">Провайдеры</div>
						<CommandItem
							v-for="item in props.providers"
							:key="item.owner_id"
							:value="item.owner_id"
							@select="handleSelect(item.owner_id)">
							{{ item.name }}
							<Check
								:class="
									cn(
										'ml-auto h-4 w-4',
										item.owner_id === props.modelValue ? 'opacity-100' : 'opacity-0',
									)
								" />
						</CommandItem>
					</CommandGroup>
					<CommandGroup v-else>
						<CommandItem
							v-for="item in sortedItems"
							:key="item.value"
							:value="item.label"
							@select="handleSelect(item.value)">
							{{ item.label }}
							<Check
								:class="
									cn(
										'ml-auto h-4 w-4',
										item.value === props.modelValue ? 'opacity-100' : 'opacity-0',
									)
								" />
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</PopoverContent>
	</Popover>
</template>
