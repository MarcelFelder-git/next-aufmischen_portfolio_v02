'use client';

import { useLanguage } from '@/src/contexts/LanguageContext';

export default function PrivacyPage() {
	const { lang } = useLanguage();

	return (
		<main className="privacy-policy-container">
			<h1 className="privacy-policy-header">
				{lang === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy'}
			</h1>

			<p className="text-gray-400 leading-relaxed">
				{lang === 'de' ? (
					<>
						Hier kommt später der deutsche Datenschutz-Text rein.
						<br />
						<br />
						Informationen zur Verarbeitung personenbezogener Daten: …
					</>
				) : (
					<>
						English privacy policy text will follow here.
						<br />
						<br />
						Information on the processing of personal data: …
					</>
				)}
			</p>
		</main>
	);
}
