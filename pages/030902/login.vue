<template>
	<div class="bg-indigo-500 h-screen">
		<div class="container mx-auto px-5 h-screen">
			<div class="flex items-center justify-center h-screen">
				<div class="box">
					<h2
						class="text-white text-center text-2xl font-semibold mb-4"
					>
						Login TajQwuiz
					</h2>
					<div class="box-login p-5 rounded-lg bg-white shadow-light">
						<form @submit.prevent="submitHandler">
							<div class="form-block flex flex-col mb-3">
								<label class="text-xs text-gray-400 mb-1"
									>Email</label
								>
								<input
									v-model="form.email"
									type="email"
									placeholder="Email"
									class="text-sm px-3 py-3 rounded-lg border border-indigo-500 w-72 scale-on-click"
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
									class="text-sm px-3 py-3 rounded-lg border border-indigo-500 w-72 scale-on-click"
								/>
							</div>
							<button
								type="submit"
								class="px-5 text-sm p-3 rounded-lg bg-indigo-500 text-white shadow-light scale-on-click"
							>
								Login
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
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
				await this.$axios.$get("sanctum/csrf-cookie");
				let res = await this.$auth.loginWith("local", {
					data: this.form,
				});
				console.log(res);
			} catch (err) {
				console.log(err);
			}
		},
		async logout() {
			await this.$auth.logout();
		},
	},
};
</script>