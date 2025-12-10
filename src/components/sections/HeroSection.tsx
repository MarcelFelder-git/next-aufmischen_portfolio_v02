'use client';

import React, { useEffect, useState } from 'react';

const words = ['Producing', 'Composing', 'Mixing', 'Mastering'];

const HeroTypoOverlay: React.FC = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [fade, setFade] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setFade(false);
			setTimeout(() => {
				setCurrentIndex((prev) => (prev + 1) % words.length);
				setFade(true);
			}, 500);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	return (
		<section className="hero-overlay-section">
			{/* Animated Gradient Background */}
			<div className="hero-animated-bg"></div>

			{/* Optionales Hintergrundbild */}
			<div className="hero-bg-image"></div>

			{/* Hintergrund-Typo */}
			<div className="hero-background-words">
				{words.map((word, i) => (
					<span
						key={i}
						className={`background-word ${i === currentIndex ? 'active' : ''}`}
					>
						{word}
					</span>
				))}
			</div>

			{/* Mittiger Claim */}
			<div className="hero-content">
				{/* <h1>aufmischen</h1> */}
				<a href="#work" className="hero-cta">
					See My Work
				</a>
			</div>
		</section>
	);
};

export default HeroTypoOverlay;
