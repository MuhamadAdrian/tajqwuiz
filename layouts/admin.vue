<template>
	<div>
		<NavbarAdmin></NavbarAdmin>
		<Nuxt />
	</div>
</template>

<script>
export default {
	name: "AdminLayout",
	async created() {
		/*if (this.$auth.strategy.token.status().unknown()) {
			await this.$auth.logout();
		}*/
	},
};
</script>