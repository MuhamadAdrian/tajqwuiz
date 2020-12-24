<template>
	<div>
		<p class="text-2xl" v-html="question.lafadz"></p>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	computed: {
		...mapState(["question"]),
	},
};
</script>