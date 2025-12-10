/* Globale Styles, die auf allen Seiten geladen werden. */
import '../css/style.css';
import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import {
	Karla,
	Merriweather,
	Inter,
	Space_Grotesk,
	Dancing_Script,
	Outfit,
} from 'next/font/google';

import Header from '../components/Header';
import Footer from '../components/Footer';

// ⬅️ Wichtig: Den Provider importieren
import { LanguageProvider } from '@/src/contexts/LanguageContext';

export const metadata: Metadata = {
	title: 'Next',
	description: 'Eine Next-Website',
	icons: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
};

export const viewport: Viewport = {
	themeColor: [
		{ color: 'hotpink', media: '(prefers-color-scheme: light)' },
		{ color: 'purple', media: '(prefers-color-scheme: dark)' },
	],
};

const karlaStyles = Karla({
	subsets: ['latin'],
	weight: ['500', '800'],
	style: 'normal',
	display: 'swap',
	variable: '--font-karla',
});

const merriweatherStyles = Merriweather({
	subsets: ['latin'],
	weight: ['300', '400', '700', '900'],
	style: ['italic', 'normal'],
	display: 'swap',
	variable: '--font-merriweather',
});

const interStyles = Inter({
	subsets: ['latin'],
	weight: ['400', '700', '900'],
	style: 'normal',
	display: 'swap',
	variable: '--font-inter',
});

const spaceGroteskStyles = Space_Grotesk({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	style: 'normal',
	display: 'swap',
	variable: '--font-space-grotesk',
});

const dancingScriptStyles = Dancing_Script({
	subsets: ['latin'],
	weight: ['400', '700'],
	style: 'normal',
	display: 'swap',
	variable: '--font-dancing-script',
});

const outfitStyles = Outfit({
	subsets: ['latin'],
	weight: ['400', '700'],
	style: 'normal',
	display: 'swap',
	variable: '--font-outfit',
});

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html
			lang="de" // SSR fallback, LanguageProvider setzt später dynamisch
			className={`
				${karlaStyles.variable}
				${merriweatherStyles.variable}
				${outfitStyles.variable}
				${interStyles.variable}
				${spaceGroteskStyles.variable}
				${dancingScriptStyles.variable}
			`}
		>
			<body>
				{/* ⬅️ Alles was Sprache braucht kommt hier rein */}
				<LanguageProvider>
					<div className="site-wrapper">
						<Header />
						<div className="site-content">{children}</div>
						{/* <Footer /> */}
					</div>
				</LanguageProvider>
			</body>
		</html>
	);
}
