<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/pikets');
		const response = await res.json();
		console.log(response);
		return { props: { pikets: response.data } };
	};
</script>

<script lang="ts">
	import Counter from '$lib/Counter.svelte';
	import { onMount } from 'svelte';
	import user from '$lib/user';
	import ships from '$lib/store';

	export let pikets: any;

	import { dataset_dev } from 'svelte/internal';
	let d = new Date();

	//let date = d.getFullYear()  + "-" + (d.getMonth()+1) + "-" + d.getDate();
	let date = d.toLocaleDateString();

	let driver;

	onMount(() => {
		if (!localStorage.getItem('token')) {
			goto('/login');
		} else {
			driver = $user.id;
		}
	});

	async function createShip() {
		if (!localStorage.getItem('token')) {
			goto('/login');
			return;
		}

		console.log($ships);
		let sships = $ships;

		for (const ship in $ships) {
			if (Object.prototype.hasOwnProperty.call($ships, ship)) {
				const kolvo = $ships[ship];
				console.log(ship, kolvo);

				const res = await fetch('http://ds.rudin.ru:1337/api/ships', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
						Authorization: 'Bearer ' + localStorage.getItem('token')
					},
					body: JSON.stringify({ data: { piket: ship, driver, count: kolvo } })
				});
				if (!res.ok) {
					const data: { message: { messages: { message: string }[] }[] } = await res.json();
					if (data?.message?.[0]?.messages?.[0]?.message) {
						alert(data.message[0].messages[0].message);
					}
				}
			}
		}
		goto('/ok');
	}
</script>

<div class="relative py-16 bg-gradient-to-br from-sky-50 to-gray-200">
	<div class="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
		<div class="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
			<div class="rounded-xl bg-white shadow-xl">
				<div class="p-6 sm:p-16">
					<!-- 
						<div class="space-y-4">
							
							<h2 class="mb-8 text-2xl text-cyan-900 font-bold">Landing Page Heading<br>
							Heading Content</h2>
						</div>
						-->
					<div class="my-4">
						<h1 class="text-center text-3xl font-bold">Отчет о поездках</h1>
					</div>
					<div class="container mx-auto mt-4">
						<p class="text-center text-xl">
							Водитель: <span class="font-bold">{$user.username}</span>
						</p>
					</div>
					<div class="mt-16 grid space-y-4">
						{#each pikets as piket}
							<div
								class=" text-center hover:bg-gray-200 cursor-pointer px-6 py-2 border-b border-gray-500"
							>
								<h4 class="font-bold">{piket.attributes.name}</h4>
								<div class="container mx-auto"><Counter countid={piket.id} /></div>
							</div>
						{/each}

						<div class="knob">
							<h1 class="text-center text-3xl font-bold">
								<button
									class="group mt-10 relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow"
									on:click|preventDefault={createShip}
								>
									<div
										class="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"
									/>
									<span class="relative text-black group-hover:text-white">Отправить</span></button
								>
							</h1>
						</div>
					</div>

					<div class="mt-32 space-y-4 text-gray-600 text-center sm:-mb-8">
						<p class="text-xs">Развитие, 2022.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
</style>
