<template>
	<transition name="slide-up">
		<div
			v-if="app_is_updated"
			class="w-full container mx-auto px-4 fixed bottom-0 pb-5 left-0"
		>
			<div
				class="content rounded-lg text-xs p-5 shadow-md flex items-center justify-between"
			>
				<p class="dark:text-gray-100">
					New content available, please Refresh
				</p>
				<button
					class="px-3 py-2 text-sm text-white bg-indigo-500 rounded-md active:bg-indigo-600 transition-colors duration-100"
				>
					Refresh
				</button>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: "Refresh",
	computed: {
		app_is_updated() {
			return this.$store.state.is_updated;
		},
	},
};
</script>