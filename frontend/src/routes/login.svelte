<script lang="ts">
	import type { User } from '$lib/types';
	import { goto } from '$app/navigation';
	import user from '$lib/user';

	let email = '';
	let password = '';

	async function login() {
		const res = await fetch('http://ds.rudin.ru:1337/api/auth/local', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({ identifier: email, password })
		});
		if (res.ok) {
			const data: { user: User; jwt: string } = await res.json();
			localStorage.setItem('token', data.jwt);
			if (data) {
				$user = data.user;
				goto('/');
			}
		} else {
			const data: { message: { messages: { message: string }[] }[] } = await res.json();
			if (data?.message?.[0]?.messages?.[0]?.message) {
				alert(data.message[0].messages[0].message);
			}
		}
	}
</script>

<form on:submit|preventDefault={login} class="container mx-auto my-4">
	<h1 class="text-center text-2xl font-bold">Авторизация</h1>

	<div class="my-1">
		<label for="email">Логин</label>
		<input type="email" placeholder="Введите логин" bind:value={email} />
	</div>
	<div class="my-1">
		<label for="password">Пароль</label>
		<input type="password" placeholder="Введите пароль" bind:value={password} />
	</div>
	<div class="my-3">
		<button
			class="group mt-10 relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow"
			type="submit"
		>
			<div
				class="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"
			/>
			<span class="relative text-black group-hover:text-white">Войти</span></button
		>
	</div>
</form>

<style lang="postcss">
	.my-1 {
		margin-left: 1rem;
		margin-right: 1rem;
	}
	.my-3 {
		margin-left: 1rem;
		margin-right: 1rem;
	}
	label {
		@apply font-bold block mb-1;
	}

	input {
		@apply bg-white w-full border border-gray-500 rounded outline-none py-2 px-4;
	}

	.submit {
		@apply bg-blue-500 text-white border-transparent rounded px-4 py-2;
	}
</style>
