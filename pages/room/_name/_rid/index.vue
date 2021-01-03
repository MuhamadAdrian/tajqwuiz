<template>
	<div class="h-full relative">
		<header
			class="fixed bg-white bg-opacity-95 left-0 top-0 w-full flex items-center justify-between p-5 shadow"
		>
			<div class="left flex items-center">
				<button @click="$router.back()" class="dark:text-white mr-2">
					<svg
						class="fill-current inline-block"
						xmlns="http://www.w3.org/2000/svg"
						height="24"
						viewBox="0 0 24 24"
						width="24"
					>
						<path d="M0 0h24v24H0z" fill="none" />
						<path
							d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
						/>
					</svg>
				</button>
				<h2 class="font-semibold text-sm">Room Detail</h2>
			</div>
		</header>

		<div class="container mx-auto px-4 pt-24 main">
			<div class="flex items-center justify-between mb-3">
				<div class="left self-start">
					<h1 class="text-sm mb-1">ID : {{ rid }}</h1>
				</div>
				<div class="right self-start">
					<p class="text-gray-400 text-xs">
						Created : {{ room.created_at }}
					</p>
				</div>
			</div>
			<div class="title mb-3">
				<h2 class="text-md font-semibold mb-1">{{ room.title }}</h2>
				<p class="text-sm mb-1">{{ room.description }}</p>
			</div>
			<button
				@click="generateRandomQuestion()"
				class="inline px-3 py-2 bg-indigo-500 rounded-md shadow text-white text-sm"
			>
				<pulse-loader
					:loading="is_loading"
					color="#ffffff"
					size="5px"
				></pulse-loader>
				<span v-if="!is_loading">Generate Question</span>
			</button>
			<button
				@click="saveGeneratedQuestion()"
				v-if="!is_loading"
				class="inline px-3 py-2 bg-indigo-500 rounded-md shadow text-white text-sm"
			>
				<pulse-loader
					:loading="is_saving"
					color="#ffffff"
					size="5px"
				></pulse-loader>
				<span v-if="!is_saving">Save</span>
			</button>
		</div>
		<div class="container mx-auto px-4 question mt-3">
			<div
				v-for="question in questions"
				:key="question.id"
				class="bg-white shadow-md mb-2 p-4 rounded-md"
			>
				<div class="flex items-center mb-1">
					<div class="id mr-2 self-start">
						<p class="font-semibold">#{{ question.id }}</p>
					</div>
					<div class="text">
						<p class="text-gray-500">{{ question.text }}</p>
					</div>
				</div>
				<p
					class="text-2xl text-right mb-2"
					v-if="question.lafadz"
					v-html="question.lafadz"
				></p>
				<div
					v-for="answer in question.answers"
					:key="answer.id"
					:class="[
						answer.is_correct
							? 'bg-green-400'
							: 'bg-gray-100 text-gray-600',
					]"
					class="p-4 text-white rounded-md mb-2"
				>
					<div class="flex items-center">
						<div class="selector text-sm font-semibold">
							<p>{{ answer.selector }}</p>
						</div>
						<div class="text w-full">
							<p class="text-sm text-center">{{ answer.text }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
	transition: "slide",
	middleware: "auth",
	components: {
		PulseLoader,
	},
	async asyncData({ route, $axios, store, params, redirect, error }) {
		try {
			const rid = params.rid;

			let res = await $axios.get(`/api/room/${rid}/detail`);

			const room = res.data.data;

			return {
				rid,
				room,
			};
		} catch (err) {
			error("200", "Something went wrong");
			console.log(err);
		}
	},

	computed: {
		questions() {
			return this.$store.state.masterRoom.questions;
		},
		is_loading: {
			get() {
				return this.$store.state.masterRoom.is_load;
			},
			set(val) {
				this.$store.commit("masterRoom/SET_IS_LOAD", val);
			},
		},

		is_saving: {
			get() {
				return this.$store.state.masterRoom.is_saving;
			},
			set(val) {
				this.$store.commit("masterRoom/SET_IS_SAVING", val);
			},
		},
	},

	methods: {
		async generateRandomQuestion() {
			try {
				let res = await this.$store.dispatch(
					"masterRoom/generateRandomQuestion"
				);
				if (res) {
					console.log(res);
				}
			} catch (err) {
				console.log(err);
			}
		},

		async saveGeneratedQuestion() {
			try {
				this.is_saving = true;
				let res = await this.$axios.$post(
					`/api/question-room/${this.rid}/store`,
					this.questions
				);
				this.is_saving = false;
				console.log(res);
			} catch (err) {
				console.log(err);
			}
		},
	},

	async created() {
		try {
			await this.$store.dispatch(
				"masterRoom/loadQuestionsRoom",
				this.rid
			);
		} catch (err) {
			console.log(err);
		}
	},
};
</script>