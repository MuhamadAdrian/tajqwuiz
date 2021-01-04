<template>
	<div class="pb-4">
		<header
			class="fixed bg-white dark:bg-gray-800 bg-opacity-95 left-0 top-0 w-full flex items-center justify-between p-5 shadow"
		>
			<div class="left flex items-center">
				<button @click="$router.back()" class="dark:text-white mr-2">
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
				<h2 class="font-semibold text-sm dark:text-white">
					Kelas Saya
				</h2>
			</div>
		</header>
		<div class="container mx-auto px-4 pt-24">
			<h6 class="text-xs text-gray-400 mb-2">Dimiliki</h6>
			<div
				v-for="room in rooms"
				:key="room.rid"
				class="rounded-md bg-white dark:bg-gray-700 cursor-pointer shadow"
			>
				<div class="flex items-center justify-between">
					<div
						@click="$router.push(`/room/${slug}/${room.rid}`)"
						class="content relative z-0 w-full p-4 dark:active:bg-gray-800 active:bg-gray-100"
					>
						<p
							class="text-xs font-semibold text-gray-600 dark:text-gray-200"
						>
							#{{ room.rid }}
						</p>
						<h3 class="font-semibold text-sm mb-1 dark:text-white">
							{{ room.title }}
						</h3>
						<p class="text-xs text-gray-400">
							{{ room.description }}
						</p>
					</div>
					<div
						class="action relative py-4"
						@click="deleteRoom(room.rid)"
					>
						<button class="p-4 text-red-400">
							<svg
								class="fill-current"
								xmlns="http://www.w3.org/2000/svg"
								height="24"
								viewBox="0 0 24 24"
								width="24"
							>
								<path d="M0 0h24v24H0z" fill="none" />
								<path
									d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
								/>
							</svg>
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
	async asyncData({ $axios, store, params, redirect, error }) {
		try {
			const slug = params.name;
			if (slug == "undefined") redirect("/");
			let res = await $axios.$get(`/api/room/${slug}`);
			let rooms = res.data.room;
			return {
				rooms,
				slug,
			};
		} catch (err) {
			console.log(err);
		}
	},

	methods: {
		async deleteRoom(rid) {
			try {
				await this.$axios.$delete(`/api/room/delete/${rid}`);
				this.$nuxt.refresh();
			} catch (err) {
				console.log(err);
			}
		},
	},
};
</script>
