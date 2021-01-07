<template>
	<transition name="slide-up">
		<div
			v-if="text"
			:class="[w]"
			class="toast container mx-auto px-4 fixed bottom-0 pb-5 left-0"
		>
			<div
				:class="[color]"
				class="content rounded-lg text-white text-xs p-5 shadow-md flex items-center justify-between"
			>
				<p class="text-current">{{ text }}</p>
				<slot></slot>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	props: ["text", "color"],
	props: {
		text: {
			type: String,
		},
		color: {
			type: String,
		},
		w: {
			type: String,
			default: "w-full",
		},
	},
};
</script>