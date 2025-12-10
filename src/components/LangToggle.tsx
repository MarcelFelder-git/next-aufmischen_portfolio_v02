'use client';

import { useLanguage } from '@/src/contexts/LanguageContext';
import { useEffect } from 'react';

export default function LangToggle() {
	const { lang, setLang } = useLanguage();

	// Debug: log whenever lang changes
	useEffect(() => {
		console.log('Current language:', lang);
	}, [lang]);

	return (
		<div className="lang-toggle">
			<button
				className={lang === 'de' ? 'active' : ''}
				onClick={() => {
					console.log('Switching to DE');
					setLang('de');
				}}
				aria-label="Switch to German"
			>
				DE
			</button>
			<span className="separator">|</span>
			<button
				className={lang === 'en' ? 'active' : ''}
				onClick={() => {
					console.log('Switching to EN');
					setLang('en');
				}}
				aria-label="Switch to English"
			>
				EN
			</button>
		</div>
	);
}
