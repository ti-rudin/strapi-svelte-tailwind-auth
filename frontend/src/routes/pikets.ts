
// src/routes/posts.ts

import type { EndpointOutput } from '@sveltejs/kit';

export async function get(): Promise<EndpointOutput> {
	const res = await fetch('http://ds.rudin.ru:1337/api/pikets?populate=*');
	const data = await res.json();

	return { body: data };
}