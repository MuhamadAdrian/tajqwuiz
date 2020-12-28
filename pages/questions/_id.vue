<template>
	<div class="bg-gray-50 dark:bg-gray-900 bg-opacity-40 h-screen">
		<header
			class="flex fixed top-0 w-full items-center justify-between p-5"
		>
			<div class="left logo dark:text-gray-200">
				Pertanyaan #{{ number }}
				<span class="text-sm text-gray-400"
					>/ {{ question_length }}</span
				>
			</div>
			<p class="text-xs text-gray-400 border-r-2 border-indigo-500 pr-2">
				play as {{ player_name }}
			</p>
		</header>
		<div
			class="main flex h-3/4 items-center justify-center container mx-auto px-4"
		>
			<div class="content mb-20">
				<h1
					class="text-7xl font-lafadz text-center dark:text-gray-200 mb-3"
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
						class="text-right text-white text-sm py-2 px-3 rounded-3xl flex items-center"
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
	</div>
</template>

<script>
import { mapState } from "vuex";
import { Howl, Howler } from "howler";
export default {
	middleware: "player",
	transition: "slide",
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
		};
	},

	computed: {
		question_length() {
			return this.$store.state.questions.length;
		},
		...mapState(["countdown", "player_name"]),
	},

	watch: {
		countdown(time) {
			if (time <= 3) {
				this.countdown_style = "text-red-500 text-lg";
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
			if (time == 0) {
				this.showCorrectAnswer();
			}
		},
	},

	methods: {
		showCorrectAnswer() {
			let answer = this.answers.find(
				(answer) => answer.is_correct == true
			);
			this.checked(answer.id);
		},
		nextQuestion() {
			let nextPage = parseInt(this.number) + 1;
			if (this.choice.is_correct) {
				console.log("Kamu Benar");
			} else {
				console.log("Ups Salah");
			}
			this.$router.replace("/questions/" + nextPage);
		},
		checked(id) {
			if (this.countdown != null) {
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
		/*choice(is_correct) {
			this.correct = is_correct;
			console.log(this.correct);
		},*/
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

	created() {
		this.showAnswer();
	},

	mounted() {
		this.stylingAnswer();
	},
};
</script>

<style scoped>
</style>