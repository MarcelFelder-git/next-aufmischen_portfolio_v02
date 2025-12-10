'use client';

import { useToggle } from '../lib/hooks/useToggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { CgCloseO, CgMenuRound } from 'react-icons/cg';
import LangToggle from './LangToggle';
import ThemeToggle from './ThemeToggle';

type LinkTarget = {
	text: string;
	url: string;
	isPrivate?: boolean;
};

const linkTargets = [
	{ text: 'Work', url: '/#work' },
	{ text: 'About', url: '/#about' },
	{ text: 'Events', url: '/#events' },
	{ text: 'Contact', url: '/#contact' },
] satisfies LinkTarget[];

type Props = {
	isLoggedIn: boolean;
};

export default function MainNavigation({ isLoggedIn }: Props) {
	const [isOpen, toggleMenu, , , closeMenu] = useToggle(false);
	const pathname = usePathname();

	useEffect(() => closeMenu(), [pathname, closeMenu]);

	return (
		<nav className="main-navigation">
			<ThemeToggle />
			<button
				className="main-navigation__button"
				onClick={toggleMenu}
				aria-expanded={isOpen}
				aria-label="Hauptmenü"
				style={{ position: 'relative', zIndex: 10001 }} // sicherstellen, dass Button oben bleibt
			>
				{isOpen ? <CgCloseO /> : <CgMenuRound />}
			</button>
			{isOpen && (
				<ul className="main-navigation__list">
					{getMenuItems(linkTargets, pathname, isLoggedIn, closeMenu)}
					<li className="main-navigation__lang-toggle">
						<LangToggle />
					</li>
				</ul>
			)}
		</nav>
	);
}

function getMenuItems(
	linkTargets: LinkTarget[],
	pathname: string,
	isLoggedIn: boolean,
	closeMenu: () => void,
) {
	return linkTargets
		.filter(({ isPrivate = false }) => !isPrivate || isLoggedIn)
		.map(({ text, url }) => {
			const isCurrentPage = url === pathname;
			const attributes = isCurrentPage
				? ({ 'aria-current': 'page' } as const)
				: {};
			const cssClasses = `main-navigation__link ${
				isCurrentPage ? 'main-navigation__link--current' : ''
			}`;

			return (
				<li key={url}>
					<Link
						className={cssClasses}
						href={url}
						{...attributes}
						onClick={() => closeMenu()} // Menü schließen bei Klick
					>
						{text}
					</Link>
				</li>
			);
		});
}
