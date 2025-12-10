// utils/send-email.ts
import type { FormData } from '@/src/components/sections/ContactSection';

interface EmailResponse {
	message?: string;
	error?: string;
}

export async function sendEmail(data: FormData): Promise<EmailResponse> {
	const apiEndpoint = '/api/email';

	const res = await fetch(apiEndpoint, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' },
	});

	let json: unknown;
	try {
		json = await res.json();
	} catch {
		throw new Error('Invalid JSON response');
	}

	// Type-safe check
	if (
		typeof json === 'object' &&
		json !== null &&
		('message' in json || 'error' in json)
	) {
		return json as EmailResponse;
	} else {
		throw new Error('Unexpected response shape');
	}
}
