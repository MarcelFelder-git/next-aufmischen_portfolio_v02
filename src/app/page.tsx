import type { Metadata } from 'next';
import HeroSection from '../components/sections/HeroSection';
import WorkSection from '../components/sections/WorkSection';
import AboutSection from '../components/sections/AboutSection';
import EventsSection from '../components/sections/EventsSection';
import ContactSection from '../components/sections/ContactSection';
import { client } from '@/src/sanity/client';
import AnimatedSection from '../components/AnimatedSection';

export const metadata: Metadata = {
	title: 'Aufmischen – Producing • Mixing • Mastering',
};

export default async function Home() {
	const aboutData = await client.fetch(
		`*[_type=="about"][0]{bio_de, bio_en, image}`,
	);

	return (
		<main className="snap-container">
			<section className="snap-section">
				<AnimatedSection>
					<HeroSection />
					{/* <div id="hero-end-marker"></div> */}
				</AnimatedSection>
			</section>

			<section className="snap-section">
				<AnimatedSection>
					<WorkSection />
				</AnimatedSection>
			</section>

			<section className="snap-section">
				<AnimatedSection>
					<AboutSection
						bio_de={aboutData.bio_de}
						bio_en={aboutData.bio_en}
						image={aboutData.image}
					/>
				</AnimatedSection>
			</section>

			<section className="snap-section">
				<AnimatedSection>
					<EventsSection />
				</AnimatedSection>
			</section>

			<section className="snap-section">
				<AnimatedSection>
					<ContactSection />
				</AnimatedSection>
			</section>
		</main>
	);
}
