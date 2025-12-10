'use client';

import { useLanguage } from '@/src/contexts/LanguageContext';

export default function ImprintPage() {
	const { lang } = useLanguage();

	return (
		<main className="legal-notice-container">
			<h1 className="legal-notice-header">
				{lang === 'de' ? 'Impressum' : 'Imprint'}
			</h1>

			<p className="text-gray-400 leading-relaxed">
				{lang === 'de' ? (
					<>
						Hier kommt später der deutsche Impressums-Text rein.
						<br />
						<br />
						Verantwortlich gemäß § 5 TMG: …
					</>
				) : (
					<>
						English imprint text will go here later.
						<br />
						<br />
						Responsible according to §5 TMG: …
					</>
				)}
			</p>
		</main>
	);
}
