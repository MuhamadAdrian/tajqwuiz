<template>
	<transition name="slide-up">
		<div
			v-if="text"
			class="toast w-full container mx-auto px-4 fixed bottom-0 pb-5 left-0"
		>
			<div
				class="content rounded-lg bg-red-500 text-white text-xs p-5 shadow-md"
			>
				<p class="text-current">{{ text }}</p>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	props: ["text"],
};
</script>