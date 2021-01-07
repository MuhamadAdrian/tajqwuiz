<template>
	<div>
		<div class="container mx-auto px-5 mt-10 pb-20">
			<div class="grid grid-cols-2 grid-flow-row space-x-6">
				<div class="col-span-1">
					<div class="question mb-4">
						<h2 class="text-2xl font-semibold mb-2">
							#Question {{ question.id }}
						</h2>
						<p
							class="mb-1 font-serif text-2xl"
							v-html="question.lafadz"
						></p>
						<p class="mb-1">{{ question.text }}</p>
						<p class="text-gray-400 text-xs">
							<span>Created : {{ question.created_at }}</span>
							|
							<span>Updated : {{ question.updated_at }}</span>
						</p>
					</div>
					<button
						v-if="!show_edit_form"
						@click="show_edit_form = !show_edit_form"
						class="text-sm text-white rounded-md shadow-md bg-green-500 hover:bg-green-600 px-3 py-2 mb-3"
					>
						<span>Edit</span>
					</button>
					<button
						v-if="!show_edit_form"
						@click="deleteQuestion(question.id)"
						class="text-sm text-white rounded-md shadow-md bg-red-500 hover:bg-red-600 px-3 py-2 mb-3"
					>
						<span>Delete</span>
					</button>
					<form
						@submit.prevent="updateQuestion()"
						v-if="show_edit_form"
						class="mb-10"
					>
						<button
							type="submit"
							class="text-sm text-white rounded-md shadow-md bg-indigo-500 hover:bg-indigo-600 px-3 py-2 mb-3"
						>
							<pulse-loader
								:loading="is_updating"
								color="#ffffff"
								size="5px"
							></pulse-loader>
							<span v-if="!is_updating">Simpan Perubahan</span>
						</button>
						<button
							@click="show_edit_form = !show_edit_form"
							class="text-sm text-white rounded-md shadow-md bg-red-500 hover:bg-red-600 px-3 py-2 mb-3"
						>
							<span>Tutup</span>
						</button>
						<div class="flex flex-col mb-3">
							<label class="text-sm text-gray-400 mb-1"
								>Lafadz</label
							>
							<textarea
								v-model="question.lafadz"
								rows="10"
								class="px-3 py-2 text-sm border-2 border-gray-300 focus:border-indigo-500 bg-white w-full rounded-md"
							></textarea>
							<p
								class="review text-2xl mt-3 max-w-xs"
								v-html="form.lafadz"
							></p>
						</div>
						<div class="flex flex-col mb-3">
							<label class="text-sm text-gray-400 mb-1"
								>Text</label
							>
							<input
								v-model="question.text"
								type="text"
								class="px-3 py-2 text-sm border-2 border-gray-300 focus:border-indigo-500 bg-white w-full rounded-md"
							/>
						</div>
						<div class="flex flex-col mb-3">
							<label class="text-sm text-gray-400 mb-1"
								>Audio</label
							>
							<input
								type="file"
								class="px-3 py-2 text-sm border-2 border-gray-300 focus:border-indigo-500 bg-white w-full rounded-md"
							/>
						</div>
						<div class="flex flex-col mb-3">
							<label class="text-sm text-gray-400 mb-1"
								>Audio Extension</label
							>
							<input
								v-model="question.audio_ext"
								type="text"
								class="px-3 py-2 text-sm border-2 border-gray-300 focus:border-indigo-500 bg-white w-full rounded-md"
							/>
						</div>
					</form>
					<div class="answers pl-10">
						<h2 class="text-2xl font-semibold mb-2">#Answers</h2>
						<div class="answers-box">
							<div
								v-for="answer in answers"
								:key="answer.id"
								class="flex items-center p-4 rounded-md odd:bg-gray-100"
								:id="answer.id"
							>
								<div class="selector mr-2">
									<input
										:ref="answer.id"
										@change="updateSelectorAnswer"
										type="text"
										class="font-semibold text-2xl w-8 bg-transparent"
										:value="answer.selector"
									/>
								</div>
								<div class="text w-full">
									<input
										:ref="answer.id"
										@change="updateTextAnswer"
										type="text"
										class="w-full text-center bg-transparent"
										:value="answer.text"
									/>
								</div>
								<div class="action">
									<button
										@click="
											updateCorrectAnswer(
												answer.id,
												$refs.input
											)
										"
										:class="[
											answer.is_correct
												? 'border-2 border-green-400'
												: 'border-0',
										]"
										class="w-8 h-8 rounded-full hover:bg-indigo-500 text-gray-600 hover:text-white flex items-center justify-center p-5"
									>
										<span>
											<svg
												class="fill-current mr-0"
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
													d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
												/>
											</svg>
										</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-span-1">
					<form @submit.prevent="addAnswer()">
						<button
							class="text-sm text-white rounded-md shadow-md bg-indigo-500 hover:bg-indigo-600 px-3 py-2 mb-3"
						>
							Tambahkan
						</button>
						<p v-if="message" class="text-xs text-red-500 my-2">
							{{ message }}
						</p>
						<div class="flex flex-col mb-3">
							<label class="text-sm text-gray-400 mb-1"
								>Selector</label
							>
							<input
								v-model="form.selector"
								type="text"
								class="px-3 py-2 text-sm border-2 border-gray-300 focus:border-indigo-500 bg-white w-full rounded-md"
							/>
							<p
								v-if="errors && errors.selector"
								class="text-xs mt-1 text-red-500"
							>
								{{ errors.selector[0] }}
							</p>
							<p class="text-2xl font-semibold">
								{{ form.selector }}
							</p>
						</div>
						<div class="flex flex-col mb-3">
							<label class="text-sm text-gray-400 mb-1"
								>Text</label
							>
							<input
								v-model="form.text"
								type="text"
								class="px-3 py-2 text-sm border-2 border-gray-300 focus:border-indigo-500 bg-white w-full rounded-md"
							/>
							<p
								v-if="errors && errors.text"
								class="text-xs mt-1 text-red-500"
							>
								{{ errors.text[0] }}
							</p>
						</div>
						<div class="flex flex-col mb-3">
							<label class="text-sm text-gray-400 mb-1"
								>Is Correct</label
							>
							<div class="flex items-center">
								<input
									v-model="form.is_correct"
									type="checkbox"
									class="checked:bg-yellow-500 mr-2"
								/>
								<p>Is Correct</p>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<Toast
			style="left: unset"
			w="w-72"
			class="fixed right-0"
			:text="toast.message"
			:color="toast.color"
		></Toast>
	</div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
	layout: "admin",
	middleware: "admin",
	components: {
		PulseLoader,
	},
	async asyncData({ $axios, params }) {
		const id_question = params.id;
		let res = await $axios.$get("/api/questions/" + id_question);
		let { answers, ...question } = res.data.question;
		return {
			answers,
			question,
			id_question,
		};
	},

	data() {
		return {
			form: {
				selector: "",
				text: "",
				is_correct: false,
			},
			message: null,
			errors: {},
			is_updating: false,
			show_edit_form: false,
			toast: {
				message: "",
				color: "",
			},
		};
	},

	watch: {
		errors(val) {
			setTimeout(() => {
				this.errors = {};
			}, 3000);
		},
	},

	methods: {
		async updateTextAnswer(e) {
			const id = e.target.parentElement.parentElement.id;
			let text = e.target.value;
			try {
				await this.$axios.$put(
					`/api/answer/${this.id_question}/${id}/update`,
					{
						text: text,
						selector: null,
					}
				);
				this.$nuxt.refresh;
			} catch (err) {
				console.log(err);
			}
		},
		async updateSelectorAnswer(e) {
			try {
				const id = e.target.parentElement.parentElement.id;
				let selector = e.target.value;
				await this.$axios.$put(
					`/api/answer/${this.id_question}/${id}/update`,
					{
						selector: selector,
						text: null,
					}
				);
				this.$nuxt.refresh;
			} catch (err) {
				console.log(err);
			}
		},
		async deleteQuestion(id) {
			try {
				await this.$axios.$delete(`/api/questions/${id}/delete`);
				this.$router.back();
			} catch (err) {
				console.log(err);
			}
		},
		async updateQuestion() {
			try {
				this.is_updating = true;
				let res = await this.$axios.$put(
					`/api/questions/${this.id_question}/update`,
					this.question
				);
				this.$nuxt.refresh;
				this.show_edit_form = false;
				this.toast = {
					message: "Success, Updated",
					color: "bg-green-400",
				};
				this.is_updating = false;
				setTimeout(() => {
					this.toast = {
						message: "",
						color: "",
					};
				}, 4000);
			} catch (err) {
				console.log(err);
			}
		},
		async updateCorrectAnswer(answer_id) {
			try {
				let res = await this.$axios.$put(
					`/api/questions/${this.id_question}/update-answer/${answer_id}`
				);
				if (res) {
					this.loadAnswer();
				}
			} catch (err) {}
		},
		async loadAnswer() {
			let res = await this.$axios.$get(`/api/answer/${this.id_question}`);
			this.answers = res.answer;
		},
		async addAnswer() {
			try {
				let res = await this.$axios.$post(
					`/api/questions/${this.id_question}/add-answer`,
					this.form
				);
				if (res.data.answer) {
					this.form = {
						selector: "",
						text: "",
						is_correct: false,
					};
					this.answers.push(res.data.answer);
				}
				if (res.data.errors) {
					this.form = {
						selector: "",
						text: "",
						is_correct: false,
					};
					this.message = res.data.errors;
					setTimeout(() => {
						this.message = null;
					}, 3000);
				}
				if (res.status == 422) {
					console.log("test");
				}
			} catch (err) {
				if (err.response.status == 422) {
					if (err.response.data && err.response.data.errors) {
						this.errors = err.response.data.errors;
					}
				}
			}
		},
	},
};
</script>