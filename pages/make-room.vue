<template>
	<div class="make-room relative">
		<div class="fixed left-0 top-0 w-full shadow">
			<div class="flex items-center py-4 px-4 mx-auto justify-between">
				<div class="left flex items-center">
					<button
						@click="$router.back()"
						class="dark:text-white mr-2"
					>
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
					<h2 class="font-semibold text-sm">Make A Room</h2>
				</div>
				<div class="right">
					<button
						@click="submitForm()"
						class="px-3 py-2 text-sm rounded-md bg-indigo-500 text-white hover:bg-indigo-600 active:bg-indigo-600"
					>
						Create +
					</button>
				</div>
			</div>
		</div>
		<div class="container mx-auto px-4 pt-24 h-screen">
			<div class="flex flex-col mb-3">
				<label class="text-sm text-gray-400">ID Room</label>
				<p>{{ idRoom }}</p>
			</div>
			<div class="flex flex-col mb-3">
				<label class="text-sm text-gray-400 mb-1">Title Room</label>
				<input
					v-model="form.title"
					type="text"
					class="px-3 py-2 text-sm border-2 border-gray-300 focus:border-indigo-500 bg-white w-full rounded-md"
				/>
				<p v-if="errors.title" class="text-xs text-red-500 mt-1">
					{{ errors.title[0] }}
				</p>
			</div>
			<div class="flex flex-col mb-3">
				<label class="text-sm text-gray-400 mb-1">Decription</label>
				<input
					v-model="form.description"
					type="text"
					class="px-3 py-2 text-sm border-2 border-gray-300 focus:border-indigo-500 bg-white w-full rounded-md"
				/>
				<p v-if="errors.description" class="text-xs text-red-500 mt-1">
					{{ errors.description[0] }}
				</p>
			</div>
			<div class="flex flex-col mb-3">
				<label class="text-sm text-gray-400 mb-1">Expired Time</label>
				<input
					v-model="form.expired"
					type="date"
					class="px-3 py-2 text-sm border-2 border-gray-300 focus:border-indigo-500 bg-white w-full rounded-md"
				/>
				<p v-if="errors.expired" class="text-xs text-red-500 mt-1">
					{{ errors.expired[0] }}
				</p>
			</div>
		</div>
		<Toast :color="toast.color" :text="toast.text"></Toast>
	</div>
</template>

<script>
export default {
	middleware: "auth",
	transition: {
		name: "slide",
	},
	async asyncData({ $axios, error }) {
		try {
			let res = await $axios.$get("/api/random-string");
			let idRoom = res.random_string;
			return {
				idRoom,
			};
		} catch (err) {
			console.log(err);
		}
	},

	data() {
		return {
			form: {
				rid: null,
				teacher: this.$auth.user.email,
				name: this.$auth.user.name,
				title: "",
				description: "",
				expired: null,
				sub: this.$auth.user.sub,
				slug: this.$auth.user.name + " " + this.$auth.user.sub,
			},
			toast: {
				color: "",
				text: "",
			},
			errors: [],
		};
	},

	watch: {
		toast(val) {
			setTimeout(() => {
				this.toast = {};
			}, 3000);
		},
	},

	methods: {
		async submitForm() {
			try {
				this.form.rid = this.idRoom;
				let res = await this.$axios.$post("/api/room/make", this.form);
				if (res) {
					this.errors = [];
					this.toast = {
						color: "bg-green-400",
						text: "Success, room has been created",
					};
					this.$router.push(
						`/room/${this.$auth.user.name}/${this.idRoom}`
					);
				}
			} catch (err) {
				if (err.response.status == 422) {
					this.errors = err.response.data.errors;
				}
				this.toast = {
					color: "bg-red-400",
					text: "Something went wrong",
				};
				console.log(err);
			}
		},
	},
};
</script>