<template>
	<div class="bg-gray-50 dark:bg-gray-900 bg-opacity-40 h-screen">
		<header
			class="fixed top-0 w-full flex items-center justify-between p-5"
		>
			<div class="left self-start">
				<p
					class="mb-2 dark:text-gray-200 text-gray-600 text-sm font-semibold"
				>
					Last Score : {{ score }}
				</p>
			</div>
			<div class="right">
				<button
					@click="toggleTheme()"
					class="p-4 rounded-full relative bg-white shadow-light w-14 h-14 block dark:bg-gray-800"
				>
					<transition name="slide">
						<div
							class="absolute w-full h-full flex top-0 left-0 items-center justify-center"
							v-if="is_dark"
							key="dark"
						>
							<svg
								class="fill-current text-white"
								xmlns="http://www.w3.org/2000/svg"
								enable-background="new 0 0 24 24"
								height="24"
								viewBox="0 0 24 24"
								width="24"
							>
								<rect fill="none" height="24" width="24" />
								<path
									d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"
								/>
							</svg>
						</div>
						<div
							class="absolute w-full h-full flex top-0 left-0 items-center justify-center"
							v-else
							key="day"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								enable-background="new 0 0 24 24"
								height="24"
								viewBox="0 0 24 24"
								width="24"
							>
								<rect fill="none" height="24" width="24" />
								<path
									d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"
								/>
							</svg>
						</div>
					</transition>
				</button>
			</div>
		</header>
		<div
			class="main flex items-center justify-center h-screen mx-auto container px-4"
		>
			<div class="content mb-20">
				<h1
					class="text-3xl font-semibold text-center dark:text-gray-200"
				>
					TajQwuiz
				</h1>
				<p class="text-gray-400 text-sm text-center">
					Quiz Seputar Tajwid
				</p>
			</div>
		</div>
		<div class="fixed bottom-0 w-full p-4">
			<input
				v-model="name"
				@click="playAudio(button_clicked)"
				@keydown="playAudio(keydown)"
				@keydown.delete="playAudio(backspace)"
				type="text"
				class="p-4 rounded-2xl transform-gpu dark:text-gray-100 text-sm border-2 dark:bg-gray-800 border-transparent focus:border-indigo-600 bg-white shadow-light w-full mb-4 scale-on-click"
				placeholder="Masukan Nama"
				:disabled="loadData"
			/>
			<button
				@click="getQuestions()"
				class="rounded-2xl transform-gpu relative block w-full py-4 text-sm active:bg-indigo-600 bg-indigo-500 text-white shadow-light scale-on-click"
			>
				<pulse-loader
					:loading="loadData"
					color="#ffffff"
					size="5px"
				></pulse-loader>
				<span v-if="!loadData">Mulai</span>
			</button>
		</div>
		<Toast color="bg-red-500" :text="error_message"></Toast>
	</div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { Howl, Howler } from "howler";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
	transition: "slide",
	components: {
		PulseLoader,
	},
	data() {
		return {
			button_clicked: require("@/assets/button-clicked.mp3"),
			keydown: require("@/assets/keydown.mp3"),
			backspace: require("@/assets/backspace.mp3"),
			switch_theme: require("@/assets/switch-theme.mp3"),
			name: "",
			error_message: null,
		};
	},

	computed: {
		is_dark: {
			get() {
				return this.$store.state.is_dark;
			},

			set(newVal) {
				this.$store.commit("SET_DARK", newVal);
			},
		},
		loadData: {
			get() {
				return this.$store.state.loadData;
			},

			set(newVal) {
				this.$store.commit("SET_LOAD_DATA", newVal);
			},
		},
		score: {
			get() {
				return this.$store.state.score;
			},
			set(newVal) {
				this.$store.commit("SET_SCORE", newVal);
			},
		},
	},

	methods: {
		toggleTheme() {
			this.is_dark = !this.is_dark;
			this.playAudio(this.switch_theme);
		},

		playAudio(file) {
			let sound = new Audio(file);
			sound.play();
		},

		async getQuestions() {
			this.playAudio(this.button_clicked);
			if (!this.name) {
				this.error_message =
					"Please fill the name before you start the quiz";
			} else {
				this.score = 0;
				this.loadData = true;
				this.$store.commit("SET_PLAYER_NAME", this.name);
				await this.$store.dispatch("loadData");
				this.$router.replace(`/questions/${1}`);
				this.$store.commit("SET_PAGE", 1);
				this.$store.commit("SET_IS_STARTED", true);
			}
		},
	},

	watch: {
		is_dark(is_dark) {
			let html = document.querySelector("html");
			if (is_dark) {
				html.classList.add("dark");
			} else {
				html.classList.remove("dark");
			}
		},

		error_message(text) {
			setTimeout(() => {
				this.error_message = null;
			}, 3000);
		},
	},

	mounted() {
		this.$store.commit("SET_PAGE", 1);
	},
};
</script>

