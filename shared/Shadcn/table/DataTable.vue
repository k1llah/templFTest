<script setup lang="ts" generic="TData, TValue">
	import type { ColumnDef } from '@tanstack/vue-table/'
	import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'

	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow,
	} from '@/shared/Shadcn/table'

	const props = withDefaults(
		defineProps<{
			columns: ColumnDef<TData, TValue>[]
			data: TData[]
			isLoading?: boolean
			textEmpty?: string
		}>(),
		{
			isLoading: false,
			textEmpty: 'Ни одной записи не найдено',
		},
	)
	const table = useVueTable({
		get data() {
			return props.data
		},
		get columns() {
			return props.columns
		},
		getCoreRowModel: getCoreRowModel(),
	})
</script>

<template>
	<Table>
		<TableHeader>
			<TableRow
				v-for="headerGroup in table.getHeaderGroups()"
				:key="headerGroup.id">
				<TableHead
					v-for="header in headerGroup.headers"
					:key="header.id">
					<FlexRender
						v-if="!header.isPlaceholder"
						:render="header.column.columnDef.header"
						:props="header.getContext()" />
				</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			<template v-if="table.getRowModel().rows?.length">
				<TableRow
					v-for="row in table.getRowModel().rows"
					:key="row.id"
					:data-state="row.getIsSelected() ? 'selected' : undefined">
					<TableCell
						v-for="cell in row.getVisibleCells()"
						:key="cell.id">
						<FlexRender
							:render="cell.column.columnDef.cell"
							:props="cell.getContext()" />
					</TableCell>
				</TableRow>
			</template>
			<template v-else>
				<TableRow>
					<TableCell
						:colspan="columns.length"
						class="h-24 text-center">
						<SkeletonTable v-if="props?.isLoading" />
						<EmptyDataBlock
							v-else
							:text="props.textEmpty" />
					</TableCell>
				</TableRow>
			</template>
		</TableBody>
	</Table>
</template>

<style>
	.table,
	tbody {
		@apply border rounded-xl;
	}
	.table,
	thead {
		@apply border-none;
	}
	.table,
	th {
		@apply text-center font-bold text-[11px] !important;
	}
	.table,
	tr {
		@apply cursor-pointer;
	}
	.table,
	tr:hover {
		@apply bg-[#E9F2FE];
	}
	.table,
	td {
		@apply text-center text-[11px] !important;
	}
	.table,
	tr:nth-child(even) {
		@apply bg-[#FBFBFB] !important;
	}
	.table,
	tr:nth-child(even):hover {
		@apply bg-[#E9F2FE] !important;
	}
	.table tbody tr:hover {
		@apply bg-[#E9F2FE] !important;
	}
	.table tbody tr.no-hover:hover {
		@apply bg-transparent !important;
		cursor: default;
	}
	thead th {
		position: sticky !important;
		z-index: 1;
		border-bottom: 2px solid #e2e8f0;
		background-color: white;
	}
	thead {
		position: sticky !important;
		top: 0;
	}
</style>
