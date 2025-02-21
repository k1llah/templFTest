<template>
	<div class="m-auto flex flex-col items-center gap-20 p-10 text-white">
		<h2 class="text-2xl">START PAGE</h2>
		<div class="flex gap-5">
			<NuxtLink
				to="/"
				class="text-xl font-bold underline">
				Page start
			</NuxtLink>
			<NuxtLink
				to="/test"
				class="text-xl font-bold underline">
				Another page
			</NuxtLink>
		</div>
		<div class="flex gap-10">
			<div class="flex flex-col gap-5">
				<TheComponent />
				<TheComponent />
			</div>

			<div class="flex flex-col gap-5">
				<TheComponent />
				<TheComponent />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup></script>

<style></style>
