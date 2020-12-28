<template>
	<div class="admin">
		<div class="container mx-auto px-5">
			<h1>Admin</h1>
			<button @click="logout">Logout</button>
		</div>
	</div>
</template>

<script>
export default {
	middleware: "admin",

	methods: {
		async logout() {
			await this.$auth.logout();
		},
	},

	mounted() {},
};
</script>