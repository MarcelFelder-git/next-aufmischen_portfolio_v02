'use client';

import { useEffect, useState, useRef } from 'react';
import SongCard from '@/src/components/SongCard';
import { client } from '@/src/sanity/client';
import type { Song } from '@/src/types/song';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function WorkSection() {
	const [songs, setSongs] = useState<Song[]>([]);
	const [bgColor, setBgColor] = useState('rgb(255,255,255)');
	const [textOpacity, setTextOpacity] = useState(0.3);
	const [activeIndex, setActiveIndex] = useState(0);
	const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);

	const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
	const textRef = useRef<HTMLDivElement>(null);

	// Hilfsfunktion: rgb() -> rgba() mit Alpha
	const rgbToRgba = (rgb: string, alpha: number) => {
		const match = rgb.match(/\d+/g);
		if (!match) return rgb;
		return `rgba(${match[0]}, ${match[1]}, ${match[2]}, ${alpha})`;
	};

	useEffect(() => {
		async function fetchSongs() {
			const data: Song[] = await client.fetch(
				`*[_type == "song"] | order(title asc){
          _id, title, artist, roles, cover, audio{asset->{url}}
        }`,
			);
			setSongs(data);
		}
		fetchSongs();
	}, []);

	// Funktion um Überlappung zu prüfen
	const checkOverlap = () => {
		const textEl = textRef.current;
		const slideEl = slideRefs.current[activeIndex];
		if (!textEl || !slideEl) return 0.3;

		const rect1 = textEl.getBoundingClientRect();
		const rect2 = slideEl.getBoundingClientRect();

		const overlap =
			rect1.right > rect2.left &&
			rect1.left < rect2.right &&
			rect1.bottom > rect2.top &&
			rect1.top < rect2.bottom;

		return overlap ? 0.6 : 0.2;
	};

	// Animation Loop für dynamische Transparenz
	useEffect(() => {
		let animationFrame: number;

		const animate = () => {
			setTextOpacity(checkOverlap());
			animationFrame = requestAnimationFrame(animate);
		};

		animate();

		return () => cancelAnimationFrame(animationFrame);
	}, [activeIndex]);

	return (
		<section
			id="work"
			className="work-section"
			style={{
				background: `linear-gradient(
					135deg,
					${rgbToRgba(bgColor, 0.4)} 0%,    
					${rgbToRgba(bgColor, 0.6)} 20%,      
					${rgbToRgba(bgColor, 0.9)} 50%,      
					${rgbToRgba(bgColor, 0.6)} 80%,      
					${rgbToRgba(bgColor, 0.4)} 100%    
				)`,
				transition: 'background 0.5s ease',
			}}
		>
			<div
				className="work-heading-background"
				ref={textRef}
				style={{ opacity: textOpacity }}
			>
				<h2>Work</h2>
			</div>

			<Swiper
				slidesPerView={1}
				centeredSlides={true}
				navigation={true}
				modules={[Navigation]}
				loop={true}
				speed={700}
				className="mySwiper"
				onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // <- realIndex hier!
			>
				{songs.map((song, index) => (
					<SwiperSlide
						key={song._id}
						// style={{ width: '320px' }}
						ref={(el) => (slideRefs.current[index] = el)}
					>
						<SongCard
							song={song}
							onColorExtracted={(color) => {
								if (index === activeIndex) setBgColor(color);
							}}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}
