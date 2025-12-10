import { FormData } from '@/src/components/sections/ContactSection';

export async function sendEmail(data: FormData) {
	const apiEndpoint = '/api/email';

	const res = await fetch(apiEndpoint, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' },
	});

	const json = await res.json();
	if (!res.ok) throw new Error(json.error || 'Failed to send email');
	return json;
}
