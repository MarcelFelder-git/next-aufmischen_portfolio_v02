import { createClient } from 'next-sanity';

export const client = createClient({
	projectId: 'kv534y0p',
	dataset: 'production',
	apiVersion: '2024-01-01',
	useCdn: false,
});
