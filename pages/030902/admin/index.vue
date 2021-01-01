<template>
	<div class="admin">
		<div class="container mx-auto px-5 mt-8">
			<h2 class="text-2xl font-semibold mb-3">#Pertanyaan</h2>
			<div class="grid md:grid-cols-4 grid-flow-row space-x-12">
				<div class="col-span-2">
					<div
						v-for="question in questions"
						:key="question.id"
						class="bg-white shadow-md mb-2 p-4 rounded-md"
					>
						<div class="flex items-center">
							<div class="id mr-2">
								<p class="font-semibold">#{{ question.id }}</p>
							</div>
							<div class="text">
								<p class="text-gray-500">{{ question.text }}</p>
							</div>
						</div>
						<p
							class="text-2xl"
							v-if="question.lafadz"
							v-html="question.lafadz"
						></p>
						<button
							@click="seeAnswer(question.id)"
							class="ml-auto block mt-3 text-indigo-500"
						>
							See the answer
						</button>
					</div>
					<div class="flex items-center">
						<button
							:class="[
								prev_page_url ? 'bg-indigo-500' : 'bg-gray-400',
							]"
							class="px-3 text-white py-2 ruonded-md"
							:disabled="!prev_page_url"
							@click="getPrev()"
						>
							Prev
						</button>
						<button
							:class="[
								next_page_url ? 'bg-indigo-500' : 'bg-gray-400',
							]"
							class="px-3 text-white py-2 ruonded-md"
							:disabled="!next_page_url"
							@click="getNext()"
						>
							Next
						</button>
					</div>
				</div>
				<div class="col-span-2">
					<form @submit.prevent="submitHandler">
						<button
							class="text-sm text-white rounded-md shadow-md bg-indigo-500 hover:bg-indigo-600 px-3 py-2 mb-3"
						>
							Tambahkan
						</button>
						<div class="flex flex-col mb-3">
							<label class="text-sm text-gray-400 mb-1"
								>Lafadz</label
							>
							<textarea
								v-model="form.lafadz"
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
								v-model="form.text"
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
								v-model="form.audio_ext"
								type="text"
								class="px-3 py-2 text-sm border-2 border-gray-300 focus:border-indigo-500 bg-white w-full rounded-md"
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
		<Toast
			class="fixed top-0 mt-20"
			:text="toast.message"
			:color="toast.color"
		></Toast>
	</div>
</template>

<script>
export default {
	middleware: "admin",
	layout: "admin",
	data() {
		return {
			current_page: null,
			first_page_url: null,
			next_page_url: null,
			prev_page_url: null,
			to: null,
			from: null,
			questions: [],
			form: {
				lafadz: "",
				text: "",
				audio: null,
				audio_ext: ".mp3",
			},
			toast: {
				message: "",
				color: "",
			},
		};
	},

	methods: {
		seeAnswer(id) {
			this.$router.push("/030902/admin/question/" + id);
		},
		async getNext() {
			let nextPage = parseInt(this.current_page) + 1;
			let res = await this.$axios.$get(
				"/api/questions/all?page=" + nextPage
			);
			this.current_page = res.data.questions.current_page;
			this.first_page_url = res.data.questions.first_page_url;
			this.to = res.data.questions.to;
			this.from = res.data.questions.from;
			this.questions = res.data.questions.data;
			this.next_page_url = res.data.questions.next_page_url;
			this.prev_page_url = res.data.questions.prev_page_url;
		},
		async getPrev() {
			let nextPage = parseInt(this.current_page) - 1;
			let res = await this.$axios.$get(
				"/api/questions/all?page=" + nextPage
			);
			this.current_page = res.data.questions.current_page;
			this.first_page_url = res.data.questions.first_page_url;
			this.to = res.data.questions.to;
			this.from = res.data.questions.from;
			this.questions = res.data.questions.data;
			this.next_page_url = res.data.questions.next_page_url;
			this.prev_page_url = res.data.questions.prev_page_url;
		},

		async load() {
			let res;
			if (this.next_page_url) {
				let nextPage = this.current_page + 1;
				res = await this.$axios.$get(
					"/api/questions/all?page=" + nextPage
				);
			} else {
				res = await this.$axios.$get(
					"/api/questions/all?page=" + this.current_page
				);
			}
			this.current_page = res.data.questions.current_page;
			this.first_page_url = res.data.questions.first_page_url;
			this.to = res.data.questions.to;
			this.from = res.data.questions.from;
			this.questions = res.data.questions.data;
			this.next_page_url = res.data.questions.next_page_url;
			this.prev_page_url = res.data.questions.prev_page_url;
		},

		async submitHandler() {
			try {
				let res = await this.$axios.$post(
					"/api/questions/add",
					this.form
				);
				if (res.data.success) {
					this.form = {};
					this.load();
					this.toast.message = "Success Added";
					this.toast.color = "bg-green-400";
				} else {
					this.toast.message = "Something Went Wrong";
					this.toast.color = "bg-red-400";
				}
				setTimeout(() => {
					this.toast.message = null;
				}, 3000);
			} catch (err) {
				console.log(err);
			}
		},
	},

	async created() {
		this.load();
	},
};
</script>