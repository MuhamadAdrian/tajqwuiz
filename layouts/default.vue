<template>
	<div class="dark:bg-gray-900 min-h-screen overflow-x-hidden">
		<transition name="slide" mode="out-in">
			<button
				v-if="$nuxt.isOffline"
				id="offline"
				ref="offline"
				class="bg-red-400 p-2 fixed top-0 right-0 z-10 m-2 rounded-md scale-on-click"
			>
				<p class="text-xs text-white text-center">
					Kamu sedang offline
				</p>
			</button>
		</transition>
		<Nuxt />
	</div>
</template>

<script>
export default {
	name: "LayoutNormal",
	created() {
		let html = document.querySelector("html");
		let is_dark = localStorage.getItem("dark");
		if (is_dark) {
			this.$store.commit("SET_DARK", JSON.parse(is_dark));
			html.classList.add("dark");
		} else {
			html.classList.remove("dark");
		}
	},
	async mounted() {
		const workbox = await window.$workbox;
		if (workbox) {
			workbox.addEventListener("installed", (event) => {
				// If we don't do this we'll be displaying the notification after the initial installation, which isn't perferred.
				if (event.isUpdate) {
					store.commit("SET_IS_UPDATED", true);
				}
			});
		}
	},
};
</script>

<style>
html {
	font-family: "Poppins", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
		"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
	font-size: 16px;
	word-spacing: 1px;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	box-sizing: border-box;
}

*,
*::before,
*::after {
	box-sizing: border-box;
	margin: 0;
}

.button--green {
	display: inline-block;
	border-radius: 4px;
	border: 1px solid #3b8070;
	color: #3b8070;
	text-decoration: none;
	padding: 10px 30px;
}

.button--green:hover {
	color: #fff;
	background-color: #3b8070;
}

.button--grey {
	display: inline-block;
	border-radius: 4px;
	border: 1px solid #35495e;
	color: #35495e;
	text-decoration: none;
	padding: 10px 30px;
	margin-left: 15px;
}

.button--grey:hover {
	color: #fff;
	background-color: #35495e;
}
</style>
