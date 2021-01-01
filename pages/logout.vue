<template>
	<div></div>
</template>

<script>
export default {
	asyncData({ store, redirect }) {
		if (!store.state.auth.loggedIn) redirect("/");
	},
};
</script>