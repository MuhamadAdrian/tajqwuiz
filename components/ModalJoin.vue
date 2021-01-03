<template>
	<div class="modal-join">
		<Toast
			style="bottom: unset"
			:text="toast.text"
			:color="toast.color"
			class="top-0 mt-2 z-20"
		></Toast>
		<transition name="fade" mode="out-in">
			<div
				v-if="show"
				@click="closeModal()"
				class="overlay bg-gray-900 bg-opacity-50 fixed top-0 left-0 w-full h-full"
			></div>
		</transition>
		<transition name="up" mode="out-in">
			<div
				v-if="show"
				class="fixed bottom-0 left-0 w-full flex items-center justify-center"
			>
				<div class="bg-white dark:bg-gray-800 p-4 rounded-t-md w-full">
					<form @submit.prevent="searchRoom">
						<div class="flex flex-col mb-2">
							<label class="text-xs text-gray-400 mb-1"
								>Nama Lengkap</label
							>
							<input
								v-model="name"
								type="text"
								class="px-3 py-2 text-sm border-2 border-gray-300 dark:border-transparent dark:text-white dark:bg-gray-700 dark:focus:border-indigo-500 focus:border-indigo-500 rounded-md"
								placeholder="Masukan nama lengkap"
							/>
						</div>
						<div class="flex flex-col mb-2">
							<label class="text-xs text-gray-400 mb-1"
								>Kode Join</label
							>
							<input
								v-model="rid"
								type="text"
								class="px-3 py-2 text-sm border-2 border-gray-300 dark:border-transparent dark:text-white dark:bg-gray-700 dark:focus:border-indigo-500 focus:border-indigo-500 rounded-md"
								placeholder="Masukan kode join"
							/>
						</div>
						<button
							type="submit"
							class="px-3 border-2 border-indigo-500 py-2 text-sm bg-indigo-500 rounded-md text-white block w-full"
						>
							<pulse-loader
								:loading="is_joining"
								color="#ffffff"
								size="5px"
							></pulse-loader>
							<span v-if="!is_joining">Gabung dan Mulai</span>
						</button>
					</form>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
	props: ["show"],
	components: {
		PulseLoader,
	},
	data() {
		return {
			name: "",
			toast: {},
		};
	},

	watch: {
		show(val) {
			if (val == true) {
				this.rid = null;
				this.name = "";
			}
		},
	},

	computed: {
		is_joining: {
			get() {
				return this.$store.state.join.is_joining;
			},
			set(val) {
				this.$store.commit("join/SET_IS_JOINING", val);
			},
		},
		ip() {
			return this.$store.state.join.ip;
		},
		rid: {
			get() {
				return this.$store.state.join.rid;
			},
			set(val) {
				this.$store.commit("join/SET_RID", val);
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
		closeModal() {
			this.$emit("modalClicked");
		},
		async searchRoom() {
			if (!this.is_joining) {
				try {
					if (!this.name) {
						this.toast = {
							text: "Mohon masukan nama terlebih dahulu",
							color: "bg-red-400",
						};
					} else {
						this.is_joining = true;
						await this.$store.dispatch("join/searchRoom", this.rid);
						let res = await this.$store.dispatch(
							"join/checkIfUserHasDone",
							this.rid
						);
						if (!res.is_empty) {
							this.toast = {
								text:
									"Maaf Anda sudah mengerjakan silahkan coba lagi nanti",
								color: "bg-red-400",
							};
						} else {
							let challanger = {
								room_rid: this.rid,
								name: this.name,
								scores: 0,
							};
							await this.$store.dispatch(
								"join/storeData",
								challanger
							);
							await this.$store.dispatch(
								"join/getQuestions",
								this.rid
							);

							this.toast = {
								text: "Kelas Tersedia, selamat mengerjakan !!",
								color: "bg-green-400",
							};
							setTimeout(() => {
								this.closeModal();
								this.score = 0;
								this.$store.commit(
									"SET_PLAYER_NAME",
									this.name,
									{
										root: true,
									}
								);
								this.$router.replace(`/questions/${1}`);
								this.$store.commit("SET_PAGE", 1, {
									root: true,
								});
								this.$store.commit("SET_IS_STARTED", true, {
									root: true,
								});
							}, 2000);
						}
						this.is_joining = false;
						setTimeout(() => {
							this.toast = {};
						}, 3000);
					}
				} catch (err) {
					this.is_joining = false;
					this.toast = {
						text: "Pastikan Kode Join yang Anda masukan benar",
						color: "bg-red-400",
					};
					setTimeout(() => {
						this.toast = {};
					}, 3000);
				}
			}
		},
	},
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
.fade-enter-to,
.fade-leave {
	opacity: 1;
}
.up-enter-active,
.up-leave-active {
	transition: transform 0.5s;
}
.up-enter,
.up-leave-to {
	transform: translateY(100%);
}
.up-enter-to,
.up-leave {
	transform: translateY(0);
}
</style>