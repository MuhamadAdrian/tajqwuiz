<template>
	<div class="bg-gray-50 dark:bg-gray-900 bg-opacity-40 h-screen">
		<header class="flex items-center justify-between p-5">
			<div class="left logo">Pertanyaan #{{ number }}</div>
			<p class="text-xs text-gray-400">play as {{ player_name }}</p>
		</header>
		<div class="main container mx-auto px-4">
			<div class="content mb-20">
				<h1
					class="text-3xl font-sans font-semibold text-center dark:text-gray-200"
					v-html="question.lafadz"
				></h1>
				<p class="text-gray-400 text-sm text-center">
					{{ question.text }}
				</p>
			</div>
		</div>
		<div class="fixed bottom-0 w-full p-4">
			<button
				class="relative mb-3 w-full h-14 scale-on-click z-0"
				v-for="answer in answers"
				:key="answer.id"
			>
				<input
					ref="radio"
					:id="answer.id"
					type="radio"
					:value="answer"
					v-model="choice"
					class="appearance-none absolute w-full h-full top-0 left-0 bg-white shadow-light rounded-xl checked:bg-gray-100 z-10"
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
		};
	},

	computed: {
		...mapState(["countdown", "player_name"]),
	},

	methods: {
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
	},

	mounted() {
		//this.playCountDown();
		let radio = this.$refs.radio;
		let label = this.$refs.label;
		if (label) {
			label[0].classList.add("text-red-400");
			label[1].classList.add("text-indigo-400");
			label[2].classList.add("text-yellow-400");
			label[3].classList.add("text-green-400");
		}
		if (radio) {
			radio[0].classList.add("checked:bg-red-400", "checked:text-white");
			radio[1].classList.add(
				"checked:bg-indigo-400",
				"checked:text-white"
			);
			radio[2].classList.add(
				"checked:bg-yellow-400",
				"checked:text-white"
			);
			radio[3].classList.add(
				"checked:bg-green-400",
				"checked:text-white"
			);
		}
	},
};
</script>