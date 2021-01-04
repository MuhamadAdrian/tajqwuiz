<template>
	<div class="rekap">
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
					Daftar Nilai
				</h2>
			</div>
		</header>
		<div class="container mx-auto px-5 pt-24">
			<table class="border table-auto w-full">
				<thead>
					<tr
						class="h-12 bg-indigo-500 border border-indigo-500 text-white"
					>
						<th class="text-sm w-1/2">Nama</th>
						<th class="text-sm w-1/2">Skor</th>
					</tr>
				</thead>
				<tbody class="text-sm">
					<tr
						class="text-center h-10 border"
						v-for="challanger in challangers"
						:key="challanger.id"
					>
						<td>{{ challanger.name }}</td>
						<td>{{ challanger.scores }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	async asyncData({ $axios, store, params, redirect }) {
		try {
			let res = await $axios.$get(`/api/challanger/${params.rid}`);

			const challangers = res.data.challangers;

			return {
				challangers,
			};
		} catch (err) {
			console.log(err);
		}
	},
};
</script>