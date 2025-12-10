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

	const json: EmailResponse = await res.json();

	if (!res.ok) throw new Error(json.error || 'Failed to send email');

	return json;
}
