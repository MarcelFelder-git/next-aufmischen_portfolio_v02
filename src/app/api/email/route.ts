import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

interface EmailRequestBody {
	email: string;
	name: string;
	message: string;
}

export async function POST(request: NextRequest) {
	const body = (await request.json()) as EmailRequestBody;
	const { email, name, message } = body;

	const transport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.MY_EMAIL,
			pass: process.env.MY_PASSWORD,
		},
	});

	const mailOptions: Mail.Options = {
		from: process.env.MY_EMAIL,
		to: process.env.MY_EMAIL,
		subject: `Message from ${name} (${email})`,
		text: message,
	};

	const sendMailPromise = () =>
		new Promise<string>((resolve, reject) => {
			transport.sendMail(mailOptions, function (err) {
				if (!err) {
					resolve('Email sent');
				} else {
					reject(err.message);
				}
			});
		});

	try {
		await sendMailPromise();
		return NextResponse.json({ message: 'Email sent' });
	} catch (err: unknown) {
		let errorMessage = 'Unknown error';
		if (err instanceof Error) errorMessage = err.message;

		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
