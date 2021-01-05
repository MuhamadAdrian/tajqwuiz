<template>
	<div class="h-screen bg-gray-50 dark:bg-gray-900 bg-opacity-40">
		<header class="fixed bottom-0 w-full p-5">
			<div class="flex items-center justify-end">
				<button @click="$router.push('/')" class="dark:text-white">
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
					<span class="text-sm"> Back </span>
				</button>
			</div>
		</header>
		<div class="container mx-auto px-4 h-screen">
			<div class="flex items-center justify-center h-screen">
				<div class="box w-full sm:w-auto">
					<h2
						class="text-center dark:text-gray-200 text-2xl font-semibold mb-8"
					>
						TajQwuiz
					</h2>
					<div class="box-login">
						<form @submit.prevent="submitHandler">
							<div class="form-block flex flex-col mb-3">
								<label class="text-xs text-gray-400 mb-1"
									>Email</label
								>
								<input
									v-model="form.email"
									type="email"
									placeholder="Email"
									class="text-sm px-3 py-3 dark:text-white rounded-lg border-2 dark:bg-gray-800 border-transparent bg-gray-100 focus:bg-white focus:border-indigo-500 w-full sm:w-72 scale-on-click"
								/>
							</div>
							<div class="form-block flex flex-col mb-3">
								<label class="text-xs text-gray-400 mb-1"
									>Password</label
								>
								<input
									v-model="form.password"
									type="password"
									placeholder="Password"
									class="text-sm px-3 py-3 dark:text-white rounded-lg border-2 dark:bg-gray-800 border-transparent bg-gray-100 focus:bg-white focus:border-indigo-500 w-full sm:w-72 scale-on-click"
								/>
							</div>
							<button
								type="submit"
								class="py-3 mt-4 block w-full text-sm rounded-lg bg-indigo-500 text-white shadow-light scale-on-click"
							>
								Login
							</button>
							<p class="text-xs text-gray-400 text-center my-3">
								Or
							</p>
						</form>
						<button
							@click="signInWithGoogle()"
							class="py-3 block w-full text-sm rounded-lg bg-white shadow scale-on-click"
						>
							<div></div>
							<img
								src="google.png"
								class="w-5 h-5 inline-block"
								alt=""
							/>
							Sign In With Google
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	middleware: "auth",
	data() {
		return {
			form: {
				email: "",
				password: "",
			},
		};
	},

	methods: {
		async submitHandler() {
			try {
				let offlineEl = document.querySelector("#offline");
				if (this.$nuxt.isOffline) {
					offlineEl.classList.add("animate-shake");
					setTimeout(() => {
						offlineEl.classList.remove("animate-shake");
					}, 1000);
				} else {
					await this.$axios.$get("sanctum/csrf-cookie");
					let res = await this.$auth.loginWith("local", {
						data: this.form,
					});
					console.log(res);
				}
			} catch (err) {
				console.log(err);
			}
		},
		async logout() {
			await this.$auth.logout();
		},

		async signInWithGoogle() {
			let offlineEl = document.querySelector("#offline");
			if (this.$nuxt.isOffline) {
				offlineEl.classList.add("animate-shake");
				setTimeout(() => {
					offlineEl.classList.remove("animate-shake");
				}, 1000);
			} else {
				await this.$auth.loginWith("google");
			}
		},
	},

	async mounted() {},
};
</script>