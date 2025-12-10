'use client';

import Image from 'next/image';
import { client } from '@/src/sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { useLanguage } from '@/src/contexts/LanguageContext';

const builder = imageUrlBuilder(client);

// Typ direkt ableiten
type SanityImageSource = Parameters<typeof builder.image>[0];

interface AboutSectionProps {
	bio_de: string;
	bio_en: string;
	image?: SanityImageSource;
}

export default function AboutSection({
	bio_de,
	bio_en,
	image,
}: AboutSectionProps) {
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
						src={
							image ? builder.image(image).url() : '/img/aufmischen_test_1.jpg'
						}
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
