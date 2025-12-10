'use client';

import { useState } from 'react';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { sendEmail } from '@/src/utils/send-email';

export type FormData = {
	name: string;
	email: string;
	message: string;
};

const Contact: FC = () => {
	const { register, handleSubmit, reset } = useForm<FormData>();
	const [status, setStatus] = useState<
		'idle' | 'sending' | 'success' | 'error'
	>('idle');
	const [errorMessage, setErrorMessage] = useState<string>('');

	async function onSubmit(data: FormData) {
		setStatus('sending');
		try {
			const response = await sendEmail(data);
			if (response?.message) {
				setStatus('success');
				reset();
			} else {
				throw new Error('Unknown error');
			}
		} catch (err: unknown) {
			setStatus('error');
			if (err instanceof Error) {
				setErrorMessage(err.message);
			} else {
				setErrorMessage('Something went wrong');
			}
		}
	}

	return (
		<section id="contact" className="contact-section">
			{/* LEFT FORM */}
			<div className="contact-left">
				<div className="contact-left-inner">
					{/* <h2 className="contact-heading">Contact</h2> */}
					<form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
						<div className="form-group">
							<label htmlFor="name" className="sr-only">
								Full Name
							</label>
							<input
								id="name"
								type="text"
								placeholder="Name"
								{...register('name', { required: true })}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="email" className="sr-only">
								Email Address
							</label>
							<input
								id="email"
								type="email"
								placeholder="E-Mail"
								{...register('email', { required: true })}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="message" className="sr-only">
								Message
							</label>
							<textarea
								id="message"
								rows={5}
								placeholder="Message"
								{...register('message', { required: true })}
							></textarea>
						</div>

						<div className="relative">
							<button
								type="submit"
								className="contact-button"
								disabled={status === 'sending'}
							>
								{status === 'sending' ? 'Sending…' : 'Send Message'}
							</button>
							{status === 'success' && (
								<p className="status-message success">
									Message sent successfully!
								</p>
							)}
							{status === 'error' && (
								<p className="status-message error">{errorMessage}</p>
							)}
						</div>
					</form>
				</div>
			</div>

			{/* RIGHT ACCENT PANEL */}
			<div className="contact-right">
				<h2 className="contact-right-heading">Contact</h2>
			</div>

			{/* <Footer /> */}
		</section>
	);
};

export default Contact;
