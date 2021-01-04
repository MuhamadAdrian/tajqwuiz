<template>
	<div class="bg-gray-50 dark:bg-gray-900 bg-opacity-40 h-screen">
		<header
			class="flex fixed top-0 w-full items-center justify-between p-5"
		>
			<div class="left logo dark:text-gray-200">
				#{{ number }}
				<span class="text-sm text-gray-400"
					>/ {{ question_length }}</span
				>
			</div>
			<div class="right border-r-2 border-indigo-500 pr-2">
				<p class="text-xs text-gray-400">play as {{ player_name }}</p>
				<p class="text-xs text-gray-400 text-right">
					<span class="font-semibold">Score : {{ score }}</span>
				</p>
			</div>
		</header>
		<div
			class="main flex h-3/4 items-center justify-center container mx-auto px-4"
		>
			<div class="content mb-20">
				<h1
					v-if="question.lafadz"
					class="text-5xl font-lafadz text-center dark:text-gray-200 mb-3"
					v-html="question.lafadz"
				></h1>
				<p class="text-gray-400 text-sm text-center">
					{{ question.text }}
				</p>
			</div>
		</div>
		<transition name="slide-up">
			<div v-show="answer_is_show" class="fixed bottom-0 w-full p-4">
				<div class="time flex justify-end mb-3">
					<p
						v-if="countdown != 11"
						:class="[countdown_style]"
						class="text-right dark:text-white text-sm py-2 px-3 rounded-3xl flex items-center"
					>
						<span>
							<svg
								:class="[time_rotate]"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 0 24 24"
								width="24"
								class="fill-current w-4 h-4 mr-3 origin-center transition-transform duration-75"
							>
								<path d="M0 0h24v24H0z" fill="none" />
								<path
									d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
								/>
								<path
									d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"
								/></svg
						></span>
						{{ countdown }} s
					</p>
				</div>
				<button
					class="relative transform-gpu mb-3 w-full h-14 scale-on-click z-0"
					v-for="answer in answers"
					:key="answer.id"
				>
					<input
						ref="radio"
						:id="answer.id"
						type="radio"
						:value="answer"
						v-model="choice"
						class="appearance-none absolute w-full h-full top-0 left-0 bg-white dark:bg-gray-800 shadow-light rounded-xl checked:bg-gray-100 z-10"
					/>
					<div
						@click="checked(answer.id)"
						:id="answer.id"
						ref="label"
						class="content absolute flex items-center w-full h-full top-0 left-0 px-5 z-10"
					>
						<p class="font-bold text-lg">{{ answer.selector }}</p>
						<p class="text-sm w-full text-center">
							{{ answer.text }}
						</p>
					</div>
				</button>
			</div>
		</transition>
		<Toast
			class="fixed top-0 mt-3"
			style="bottom: unset"
			:color="toast.toast_color"
			:text="toast.message"
		>
			<button v-if="number != question_length" @click="nextQuestion">
				Next
			</button>
			<button v-else @click="finishQuestion">Finish</button>
		</Toast>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { Howl, Howler } from "howler";
export default {
	name: "Question",
	middleware: "question",
	transition: {
		name: "slide",
	},
	head: {
		title: "Pertanyaan",
	},
	async asyncData({ store, params, error }) {
		let number = params.id;
		const question = store.state.questions[params.id - 1];
		await store.dispatch("getAnswers", question.id);
		const answers = store.state.answer;
		return {
			number,
			question,
			answers,
		};
	},

	data() {
		return {
			choice: null,
			audios: [
				{
					file: require("@/assets/answer1.mp3"),
				},
				{
					file: require("@/assets/answer2.mp3"),
				},
				{
					file: require("@/assets/answer3.mp3"),
				},
				{
					file: require("@/assets/answer4.mp3"),
				},
			],
			answer_is_show: false,
			countdown_style: "",
			countdown_box_style: "",
			time_rotate: "",
			show_right_answer: false,
			disabled_choice: false,
			toast: {
				toast_color: "",
				message: "",
			},
		};
	},

	computed: {
		question_length() {
			return this.$store.state.questions.length;
		},
		rid() {
			return this.$store.state.join.rid;
		},
		...mapState(["countdown", "player_name", "score"]),
	},

	watch: {
		async countdown(time) {
			let audio = new Audio(require("@/assets/clock.mp3"));
			audio.play();
			if (time <= 3) {
				this.countdown_style = "dark:text-red-500 text-red-500 text-lg";
				if (time == 3) {
					this.time_rotate = "transform rotate-45";
				}
				if (time == 2) {
					this.time_rotate = "transform rotate-90";
				}
				if (time == 1) {
					this.time_rotate = "transform rotate-180";
				}
			}
			if (time == null) {
				let nextPage = parseInt(this.number) + 1;
				this.$store.commit("SET_PAGE", nextPage);
				if (this.choice == null) {
					this.toast.toast_color =
						"dark:bg-gray-700 bg-gray-100 dark:text-gray-200 text-gray-600";
					this.toast.message = "Yah Ga keburu, coba lagi yuk !";
				} else {
					this.checkAnswerIsCorrect();
				}
				await this.showCorrectAnswer();
				this.disabled_choice = true;
			}
		},
	},

	methods: {
		checkAnswerIsCorrect() {
			let is_true = false;
			let source = null;
			if (this.choice) {
				if (this.choice.is_correct) {
					source = require("@/assets/correct.mp3");
					let audio = new Audio(source);
					audio.play();
					is_true = true;
					this.showToast(is_true);
					this.$store.commit("SET_SCORE", this.score + 10);
					if (this.rid) {
						let payload = {
							scorePlus: 10,
							rid: this.rid,
						};
						this.$store.dispatch("join/updateScore", payload);
					}
				} else {
					source = require("@/assets/wrong.mp3");
					let audio = new Audio(source);
					audio.play();
					this.showToast(is_true);
				}
			}
		},
		async showCorrectAnswer() {
			let answer = await this.answers.find(
				(answer) => answer.is_correct == true
			);
			this.checked(answer.id);
		},
		showToast(is_correct) {
			if (is_correct) {
				this.toast.toast_color = "bg-green-400";
				this.toast.message = "Yeay kamu benar !";
			} else {
				this.toast.toast_color = "bg-red-400";
				this.toast.message = "Ups Salah";
			}
		},
		nextQuestion() {
			this.$store.commit("SET_COUNTDOWN", 11);
			let nextPage = parseInt(this.number) + 1;
			if (this.choice.is_correct) {
				console.log("Kamu Benar");
			} else {
				console.log("Ups Salah");
			}
			this.$router.replace("/questions/" + nextPage);
		},
		finishQuestion() {
			if (this.rid) {
				this.$store.commit("join/RESET_RID");
			}
			this.$store.commit("RESET_QUESTION");
			this.$store.commit("SET_COUNTDOWN", 11);
			console.log("finish");
			this.$router.replace("/");
		},
		checked(id) {
			if (!this.disabled_choice) {
				let sn = this.$refs.sn;
				let ref_radio = this.$refs.radio;
				let ref_label = this.$refs.label;
				let radio = ref_radio.find((re) => re.id == id);
				radio.click();
				if (radio.checked) {
					let label = ref_label.find((la) => la.id == id);
					let index = ref_label.indexOf(label);
					this.playAudio(index);
					if (index == 0) {
						label.classList.remove("text-red-400");
						ref_label[1].classList.add("text-indigo-400");
						ref_label[2].classList.add("text-yellow-400");
						ref_label[3].classList.add("text-green-400");
					} else if (index == 1) {
						label.classList.remove("text-indigo-400");
						ref_label[0].classList.add("text-red-400");
						ref_label[2].classList.add("text-yellow-400");
						ref_label[3].classList.add("text-green-400");
					} else if (index == 2) {
						label.classList.remove("text-yellow-400");
						ref_label[0].classList.add("text-red-400");
						ref_label[1].classList.add("text-indigo-400");
						ref_label[3].classList.add("text-green-400");
					} else if (index == 3) {
						label.classList.remove("text-green-400");
						ref_label[0].classList.add("text-red-400");
						ref_label[1].classList.add("text-indigo-400");
						ref_label[2].classList.add("text-yellow-400");
					}
					label.classList.add("text-white");
				}
			}
		},
		playAudio(index) {
			let source = this.audios[index].file;
			let audio = new Audio(source);
			audio.play();
		},
		async playCountDown() {
			if (this.countdown != null) {
				this.$store.dispatch("decrementCountdown");
			}
		},
		showAnswer() {
			setTimeout(() => {
				this.answer_is_show = true;
				this.playCountDown();
			}, 3000);
		},

		stylingAnswer() {
			let radio = this.$refs.radio;
			let label = this.$refs.label;
			if (label) {
				label[0].classList.add("text-red-400");
				label[1].classList.add("text-indigo-400");
				label[2].classList.add("text-yellow-400");
				label[3].classList.add("text-green-400");
			}
			if (radio) {
				radio[0].classList.add(
					"checked:bg-red-400",
					"dark:checked:bg-red-400",
					"checked:text-white"
				);
				radio[1].classList.add(
					"checked:bg-indigo-400",
					"dark:checked:bg-indigo-400",
					"checked:text-white"
				);
				radio[2].classList.add(
					"checked:bg-yellow-400",
					"dark:checked:bg-yellow-400",
					"checked:text-white"
				);
				radio[3].classList.add(
					"checked:bg-green-400",
					"dark:checked:bg-green-400",
					"checked:text-white"
				);
			}
		},
	},

	created() {},

	mounted() {
		this.showAnswer();
		this.stylingAnswer();
	},
};
</script>

<style scoped>
</style>