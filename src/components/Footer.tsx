'use client';

import { useLanguage } from '@/src/contexts/LanguageContext';

export default function Footer() {
	const { lang } = useLanguage();

	return (
		<footer className="footer">
			<div className="footer-container">
				<div className="footer-links">
					<a href="/legal_notice">
						{lang === 'de' ? 'Impressum' : 'Legal Notice'}
					</a>
					<a href="/privacy_policy">
						{lang === 'de' ? 'Datenschutz' : 'Privacy Policy'}
					</a>
				</div>
			</div>
		</footer>
	);
}
