'use client';

import { useLanguage } from '@/src/contexts/LanguageContext';
import { useEffect } from 'react';

interface LangToggleProps {
	onChange?: (selectedLang: 'de' | 'en') => void;
}

export default function LangToggle({ onChange }: LangToggleProps) {
	const { lang, setLang } = useLanguage();

	// Debug: log whenever lang changes
	useEffect(() => {
		console.log('Current language:', lang);
	}, [lang]);

	const handleClick = (selectedLang: 'de' | 'en') => {
		console.log('Switching to', selectedLang.toUpperCase());
		setLang(selectedLang);
		if (onChange) onChange(selectedLang);
	};

	return (
		<div className="lang-toggle">
			<button
				className={lang === 'de' ? 'active' : ''}
				onClick={() => handleClick('de')}
				aria-label="Switch to German"
			>
				DE
			</button>
			<span className="separator">|</span>
			<button
				className={lang === 'en' ? 'active' : ''}
				onClick={() => handleClick('en')}
				aria-label="Switch to English"
			>
				EN
			</button>
		</div>
	);
}
