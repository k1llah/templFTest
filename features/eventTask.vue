<template>
	<div v-for="item of items" v-if="items[0] !== 1">
		<p>item: {{ item }}</p>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	const items = ref([1,2,3,4,5])
	// Найти ошибку, исправить
</script>

<style>

</style>
