'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Lang = 'de' | 'en';

interface LanguageContextProps {
	lang: Lang;
	setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextProps | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [lang, setLangState] = useState<Lang>('de');

	// beim Laden Sprache aus LocalStorage holen
	useEffect(() => {
		const stored = localStorage.getItem('lang');
		if (stored === 'de' || stored === 'en') {
			setLangState(stored);
		}
	}, []);

	// in localStorage speichern + html lang setzen
	useEffect(() => {
		document.documentElement.lang = lang;
		localStorage.setItem('lang', lang);
	}, [lang]);

	const setLang = (l: Lang) => setLangState(l);

	return (
		<LanguageContext.Provider value={{ lang, setLang }}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const ctx = useContext(LanguageContext);
	if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
	return ctx;
}
