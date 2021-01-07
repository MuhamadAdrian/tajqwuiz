<template>
	<div class="bg-gray-50 dark:bg-gray-900 bg-opacity-40 h-screen">
		<header
			class="fixed top-0 w-full flex items-center justify-between p-5"
		>
			<div class="left self-start">
				<div
					class="flex items-center bg-indigo-500 p-2 rounded-3xl pr-3 mb-2"
				>
					<div class="img w-6 h-6 rounded-full bg-gray-200">
						<img
							v-if="$auth.loggedIn && $auth.user.picture"
							:src="$auth.user.picture"
							alt=""
							class="rounded-full"
						/>
					</div>
					<p v-if="!$auth.loggedIn" class="ml-1 text-xs text-white">
						Guest ({{ player_name }})
					</p>
					<p v-else class="ml-1 text-xs text-white">
						{{ $auth.user.name }}
					</p>
				</div>
				<p
					class="mb-2 dark:text-gray-200 text-gray-600 text-xs font-semibold"
				>
					Skor Terakhir : {{ score }}
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
				<button
					id="triger"
					class="p-4 rounded-full relative dark:text-white bg-white shadow-light w-14 h-14 block dark:bg-gray-800 mt-2"
				>
					<div
						class="absolute w-full h-full flex top-0 left-0 items-center justify-center transform duration-300 hover:rotate-90 transition-transform"
					>
						<svg
							class="fill-current"
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 0 24 24"
							width="24"
						>
							<path d="M0 0h24v24H0z" fill="none" />
							<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
						</svg>
					</div>
					<div
						id="menu"
						class="absolute bg-white dark:bg-gray-800 p-4 right-0 top-0 w-52 rounded-md shadow-md"
					>
						<p class="text-xs text-gray-400 mb-1 text-left">Menu</p>
						<ul>
							<li
								class="text-sm bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-600 text-center mb-2 p-2 rounded-md"
							>
								<nuxt-link
									to="/make-room"
									class="flex items-center justify-center"
								>
									<span>
										<svg
											class="fill-current"
											xmlns="http://www.w3.org/2000/svg"
											height="24"
											viewBox="0 0 24 24"
											width="24"
										>
											<path
												d="M0 0h24v24H0z"
												fill="none"
											/>
											<path
												d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
											/>
										</svg>
									</span>
									Buat Kelas
								</nuxt-link>
							</li>
							<li
								@click="modal_show = !modal_show"
								class="text-sm bg-gray-100 dark:active:bg-gray-700 dark:hover:bg-gray-700 dark:bg-gray-600 p-2 rounded-md"
							>
								<p class="flex items-center justify-center">
									<span class="mr-1">
										<svg
											class="fill-current"
											xmlns="http://www.w3.org/2000/svg"
											enable-background="new 0 0 24 24"
											height="24"
											viewBox="0 0 24 24"
											width="24"
										>
											<rect
												fill="none"
												height="24"
												width="24"
											/>
											<g>
												<path
													d="M12,12.75c1.63,0,3.07,0.39,4.24,0.9c1.08,0.48,1.76,1.56,1.76,2.73L18,18H6l0-1.61c0-1.18,0.68-2.26,1.76-2.73 C8.93,13.14,10.37,12.75,12,12.75z M4,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C2,12.1,2.9,13,4,13z M5.13,14.1 C4.76,14.04,4.39,14,4,14c-0.99,0-1.93,0.21-2.78,0.58C0.48,14.9,0,15.62,0,16.43V18l4.5,0v-1.61C4.5,15.56,4.73,14.78,5.13,14.1z M20,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C18,12.1,18.9,13,20,13z M24,16.43c0-0.81-0.48-1.53-1.22-1.85 C21.93,14.21,20.99,14,20,14c-0.39,0-0.76,0.04-1.13,0.1c0.4,0.68,0.63,1.46,0.63,2.29V18l4.5,0V16.43z M12,6c1.66,0,3,1.34,3,3 c0,1.66-1.34,3-3,3s-3-1.34-3-3C9,7.34,10.34,6,12,6z"
												/>
											</g>
										</svg>
									</span>
									Gabung Kelas
								</p>
							</li>
							<p
								class="text-xs text-gray-400 mb-1 text-left mt-3"
							>
								Kelas
							</p>
							<li
								class="text-sm bg-gray-100 dark:active:bg-gray-700 dark:hover:bg-gray-700 dark:bg-gray-600 p-2 rounded-md"
							>
								<nuxt-link
									:to="'/room/' + slug"
									class="flex items-center justify-center"
								>
									<span class="mr-1">
										<svg
											class="fill-current"
											xmlns="http://www.w3.org/2000/svg"
											enable-background="new 0 0 24 24"
											height="24"
											viewBox="0 0 24 24"
											width="24"
										>
											<rect
												fill="none"
												height="24"
												width="24"
											/>
											<g>
												<path
													d="M12,12.75c1.63,0,3.07,0.39,4.24,0.9c1.08,0.48,1.76,1.56,1.76,2.73L18,18H6l0-1.61c0-1.18,0.68-2.26,1.76-2.73 C8.93,13.14,10.37,12.75,12,12.75z M4,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C2,12.1,2.9,13,4,13z M5.13,14.1 C4.76,14.04,4.39,14,4,14c-0.99,0-1.93,0.21-2.78,0.58C0.48,14.9,0,15.62,0,16.43V18l4.5,0v-1.61C4.5,15.56,4.73,14.78,5.13,14.1z M20,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C18,12.1,18.9,13,20,13z M24,16.43c0-0.81-0.48-1.53-1.22-1.85 C21.93,14.21,20.99,14,20,14c-0.39,0-0.76,0.04-1.13,0.1c0.4,0.68,0.63,1.46,0.63,2.29V18l4.5,0V16.43z M12,6c1.66,0,3,1.34,3,3 c0,1.66-1.34,3-3,3s-3-1.34-3-3C9,7.34,10.34,6,12,6z"
												/>
											</g>
										</svg>
									</span>
									Kelas Saya
								</nuxt-link>
							</li>
							<p
								v-if="$auth.loggedIn"
								class="text-xs text-gray-400 mb-1 text-left mt-3"
							>
								Lainnya
							</p>
							<li
								v-if="$auth.loggedIn"
								@click="logoutGoogle()"
								class="text-sm text-white bg-red-400 active:bg-red-500 hover:bg-red-500 p-2 rounded-md"
							>
								<button
									class="flex items-center justify-center w-full"
								>
									Keluar
								</button>
							</li>
						</ul>
					</div>
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
				@click="playAudio($refs.button_clicked)"
				@keydown="playAudio($refs.keydown)"
				@keydown.delete="playAudio($refs.backspace)"
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
		<ModalJoin
			@modalClicked="modal_show = !modal_show"
			:show="modal_show"
		></ModalJoin>
		<audio
			ref="button_clicked"
			crossorigin="anonymous"
			src="/button-clicked.mp3"
		></audio>
		<audio ref="keydown" crossorigin="anonymous" src="/keydown.mp3"></audio>
		<audio
			ref="backspace"
			crossorigin="anonymous"
			src="/backspace.mp3"
		></audio>
		<audio
			ref="switch_theme"
			crossorigin="anonymous"
			src="/switch-theme.mp3"
		></audio>
	</div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { Howl, Howler } from "howler";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
	transition: {
		name: "slide",
	},
	components: {
		PulseLoader,
	},
	data() {
		return {
			//button_clicked: require("../static/button-clicked.mp3"),
			//keydown: require("../static/keydown.mp3"),
			//backspace: require("../static/backspace.mp3"),
			//switch_theme: require("../static/switch-theme.mp3"),
			name: this.$auth.loggedIn ? this.$auth.user.name : "",
			error_message: null,
			modal_show: false,
		};
	},

	computed: {
		...mapState(["player_name"]),
		slug() {
			if (this.$auth.loggedIn) {
				let slug = this.$auth.user.name + " " + this.$auth.user.sub;
				slug = slug.toLowerCase();
				slug = slug.replace(/\s/g, "-");
				return slug;
			}
		},
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
		rid() {
			return this.$store.state.join.rid;
		},
	},

	methods: {
		logoutGoogle() {
			this.$router.replace("/logout");
		},
		async test() {
			await this.$auth.loginWith("google");
		},
		toggleTheme() {
			this.is_dark = !this.is_dark;
			this.playAudio(this.$refs.switch_theme);
		},

		playAudio(ref) {
			ref.pause();
			ref.currentTime = 0;
			ref.play();
		},

		async getQuestions() {
			this.playAudio(this.$refs.button_clicked);
			let offlineEl = document.querySelector("#offline");
			if (!this.name) {
				this.error_message =
					"Please fill the name before you start the quiz";
			} else if (this.$nuxt.isOffline) {
				offlineEl.classList.add("animate-shake");
				setTimeout(() => {
					offlineEl.classList.remove("animate-shake");
				}, 1000);
			} else {
				if (this.rid) {
					this.$store.commit("join/RESET_RID");
				}
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

<style scoped>
#menu {
	transform: translateY(10px) scale(0);
	transform-origin: top right;
	opacity: 0;
	transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}
#menu ul li {
	text-align: left;
	opacity: 0;
	transform: translateY(-10px) translateX(20px);
	transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
}
#triger:focus #menu {
	transform: translateY(0px) scale(1);
	opacity: 1;
}
#triger:focus #menu ul li {
	transform: translateY(0px) translateX(0px);
	transition-delay: 0.1s;
	opacity: 1;
}
#triger:focus #menu ul li:nth-child(1) {
	transition-delay: 0.2s;
}
#triger:focus #menu ul li:nth-child(2) {
	transition-delay: 0.25s;
}
</style>

