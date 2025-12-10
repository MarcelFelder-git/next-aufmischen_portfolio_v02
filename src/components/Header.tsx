'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaInstagram } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import LangToggle from './LangToggle';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const MainNavigation = dynamic(() => import('./MainNavigation'), {
	ssr: false,
});

export default function Header() {
	const [heroLeft, setHeroLeft] = useState(false);
	const [lang, setLang] = useState<'de' | 'en'>('de');
	const [menuOpen, setMenuOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	// Scroll-Effekt für Hero
	useEffect(() => {
		const header = document.querySelector('header');
		const hero = document.querySelector('.hero');

		if (!hero || !header) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				// Wenn die Hero Section NICHT sichtbar ist → Header wird "white mode"
				setHeroLeft(!entry.isIntersecting);
			},
			{
				threshold: 0.1, // 10% Sichtbarkeit reicht aus
			},
		);

		observer.observe(hero);

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const html = document.documentElement;
		if (!html) return;

		if (heroLeft) {
			html.setAttribute('data-hero', 'left');
		} else {
			html.setAttribute('data-hero', 'active');
		}
	}, [heroLeft]);

	// Detect Mobile (<900px)
	useEffect(() => {
		const checkWidth = () => setIsMobile(window.innerWidth < 900);
		checkWidth();
		window.addEventListener('resize', checkWidth);
		return () => window.removeEventListener('resize', checkWidth);
	}, []);

	// HTML-Klasse für Mobile-Overlay setzen
	useEffect(() => {
		const html = document.querySelector('html');
		if (!html) return;

		if (menuOpen && isMobile) {
			html.classList.add('menu-open');
		} else {
			html.classList.remove('menu-open');
		}
	}, [menuOpen, isMobile]);

	return (
		<header
			className={`glass-header ${heroLeft ? 'hero-left' : 'hero-active'}`}
		>
			<div className="header-container">
				<Link href="/#" className="home-link logo-name-container">
					<svg
						version="1.0"
						xmlns="http://www.w3.org/2000/svg"
						width="20%"
						height="20%"
						viewBox="0 0 450.000000 375.000000"
						preserveAspectRatio="xMidYMid meet"
						className="logo"
					>
						<g
							transform="translate(0.000000,374.000000) scale(0.100000,-0.100000)"
							stroke="none"
						>
							<path
								d="M3218 2393 c-9 -10 -39 -61 -68 -113 -29 -52 -58 -102 -66 -110 -7
-9 -30 -52 -50 -95 -20 -43 -51 -102 -69 -130 -44 -69 -121 -205 -167 -295
-21 -41 -70 -129 -108 -194 -39 -66 -70 -121 -70 -123 0 -2 49 -3 109 -3 88 0
111 3 122 16 21 25 135 222 168 289 28 59 124 222 140 238 5 5 43 -56 86 -135
42 -79 81 -147 86 -152 11 -13 27 9 77 104 51 99 103 190 108 190 2 0 15 -21
30 -47 15 -27 33 -55 39 -63 12 -14 125 -229 125 -237 0 -1 -128 -3 -284 -3
l-285 0 -50 -94 c-28 -51 -51 -96 -51 -100 0 -3 230 -6 510 -6 470 0 535 3
501 25 -5 3 -31 45 -57 93 -26 48 -62 110 -80 137 -17 28 -46 80 -63 115 -17
36 -58 110 -91 165 -33 55 -77 134 -97 175 -20 41 -51 98 -68 125 -17 28 -50
86 -74 130 -65 120 -57 115 -181 115 -89 0 -109 -3 -122 -17z m179 -284 c23
-41 42 -84 42 -96 1 -19 -64 -146 -92 -181 -8 -10 -17 -1 -40 40 -16 29 -41
70 -55 92 l-26 38 32 62 c51 97 72 128 85 123 7 -2 31 -37 54 -78z"
							/>
						</g>
					</svg>
					<h1 className="artist-name">aufmischen</h1>
				</Link>

				<div className="nav-toggle">
					<nav className="nav-links">
						<Link href="/#work">Work</Link>
						<Link href="/#about">About</Link>
						<Link href="/#events">Events</Link>
						<Link href="/#contact">Contact</Link>
						<a
							href="https://www.instagram.com/aufmischen/"
							target="_blank"
							rel="noopener noreferrer"
							className="instagram-link"
						>
							<FaInstagram className="instagram-icon" />
						</a>
					</nav>

					<div className="nav-actions">
						<ThemeToggle />
						<LangToggle onChange={(selectedLang) => setLang(selectedLang)} />
					</div>

					{/* Mobile Navigation nur unter 900px */}
					{isMobile && <MainNavigation isLoggedIn={false} />}
				</div>
			</div>
		</header>
	);
}
