'use client';

import { FaMoon, FaSun } from 'react-icons/fa';
import { useToggle } from '../lib/hooks/useToggle';

export default function ThemeToggle() {
	const [isLight, toggleTheme] = useToggle(false); // Dark Mode default

	const handleClick = () => {
		toggleTheme();

		// Achtung: isLight ist hier noch der alte Wert, deshalb invertieren
		const nextTheme = isLight ? 'dark' : 'light';
		console.log('Switching theme:', nextTheme);

		document.documentElement.setAttribute('data-color-theme', nextTheme);
		console.log(
			'data-color-theme is now:',
			document.documentElement.getAttribute('data-color-theme'),
		);
		console.log('isLight state:', isLight);
	};

	return (
		<button
			onClick={handleClick}
			aria-label="Toggle Theme"
			className="theme-toggle"
		>
			{isLight ? <FaMoon /> : <FaSun />}
		</button>
	);
}
