'use client';

import Image from 'next/image';
import type { SanityImageSource } from '@sanity/image-url';
import { useLanguage } from '@/src/contexts/LanguageContext';

interface AboutSectionProps {
	bio_de: string;
	bio_en: string;
	image?: SanityImageSource;
}

export default function AboutSection({ bio_de, bio_en }: AboutSectionProps) {
	const { lang } = useLanguage();
	const bioText = lang === 'de' ? bio_de : bio_en;

	return (
		<section id="about" className="about-section">
			<div className="about-grid">
				{/* Left – Vertical Header */}
				<div className="about-header">
					<h2>About</h2>
				</div>

				{/* Middle – Image */}
				<div className="about-image-wrapper">
					<Image
						src="/img/aufmischen_test_1.jpg"
						alt="About Image"
						width={450}
						height={450}
						className="about-image"
					/>
				</div>

				{/* Right – Text */}
				<div className="about-text">
					{bioText.split('\n\n').map((p, i) => (
						<p key={i}>{p}</p>
					))}
				</div>
			</div>
		</section>
	);
}
