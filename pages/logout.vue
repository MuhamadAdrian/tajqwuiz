<template>
	<div></div>
</template>

<script>
export default {
	async asyncData({ $auth, redirect }) {
		if ($auth.loggedIn) {
			await $auth.logout();
		} else {
			redirect("/");
		}
	},
};
</script>