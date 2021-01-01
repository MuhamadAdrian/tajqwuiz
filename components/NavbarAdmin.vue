<template>
	<div class="bg-indigo-500 shadow-lg text-white">
		<div class="container mx-auto p-4">
			<div class="flex items-center justify-between">
				<h1>Tajqwuiz.com</h1>
				<button
					class="bg-red-50 text-red-600 px-3 py-2 rounded-md hover:bg-red-100 text-sm"
					@click="logout"
				>
					Logout
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "NavbarAdmin",
	layout: "admin",
	methods: {
		async logout() {
			await this.$auth.logout();
		},
	},
};
</script>