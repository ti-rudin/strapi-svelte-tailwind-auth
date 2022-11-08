<script>
	import { goto } from '$app/navigation';
</script>

<div class="my-4">
	<h1 class="text-center text-3xl font-bold">Отчет отправлен!</h1>
</div>

<div class="my-4">
	<h1 class="text-center text-3xl font-bold">
		<button
			class="group mt-10 relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow"
			on:click={() => goto('/')}
		>
			<div
				class="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"
			/>
			<span class="relative text-black group-hover:text-white">На главную</span></button
		>
	</h1>
</div>
