'use client';

import { useEffect, useRef, useState } from 'react';
import type { Song } from '@/src/types/song';
import { client } from '@/src/sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { Volume2 } from 'lucide-react';

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source).url();

let currentAudioRef: HTMLAudioElement | null = null;

interface Props {
	song: Song;
	onColorExtracted?: (color: string) => void;
}

export default function SongCard({ song, onColorExtracted }: Props) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState(0);
	const [volume, setVolume] = useState(0.5);
	const [volumeOpen, setVolumeOpen] = useState(false);

	const audioRef = useRef<HTMLAudioElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);

	// Farbe extrahieren
	useEffect(() => {
		const img = imgRef.current;
		if (!img || !onColorExtracted) return;

		const handleLoad = () => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			canvas.width = img.naturalWidth;
			canvas.height = img.naturalHeight;
			ctx.drawImage(img, 0, 0);

			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			let r = 0,
				g = 0,
				b = 0,
				count = 0;
			for (let i = 0; i < imageData.data.length; i += 4) {
				r += imageData.data[i];
				g += imageData.data[i + 1];
				b += imageData.data[i + 2];
				count++;
			}
			r = Math.floor(r / count);
			g = Math.floor(g / count);
			b = Math.floor(b / count);

			onColorExtracted(`rgb(${r},${g},${b})`);
		};

		if (img.complete) handleLoad();
		else img.addEventListener('load', handleLoad);
		return () => img.removeEventListener('load', handleLoad);
	}, [onColorExtracted]);

	// Audio-Steuerung
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const updateProgress = () => {
			setProgress((audio.currentTime / audio.duration) * 100);
		};

		audio.addEventListener('timeupdate', updateProgress);
		return () => audio.removeEventListener('timeupdate', updateProgress);
	}, []);

	const handlePlayPause = () => {
		const audio = audioRef.current;
		if (!audio) return;

		if (currentAudioRef && currentAudioRef !== audio) {
			currentAudioRef.pause();
			currentAudioRef.currentTime = 0;
		}

		if (isPlaying) {
			audio.pause();
			setIsPlaying(false);
		} else {
			audio.volume = volume;
			audio.play();
			setIsPlaying(true);
			currentAudioRef = audio;
		}
	};

	const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const audio = audioRef.current;
		if (!audio) return;
		const newTime = (Number(e.target.value) / 100) * audio.duration;
		audio.currentTime = newTime;
		setProgress(Number(e.target.value));
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const audio = audioRef.current;
		if (!audio) return;
		const vol = Number(e.target.value);
		audio.volume = vol;
		setVolume(vol);
	};

	return (
		<div className="song-card">
			<div className="cover">
				{song.cover ? (
					<img
						ref={imgRef}
						src={urlFor(song.cover)!}
						alt={song.title}
						crossOrigin="anonymous"
						className="cover-img"
					/>
				) : (
					<div className="cover-img-placeholder">No Image</div>
				)}
			</div>

			<div className="song-info">
				<h3 className="song-title">{song.title}</h3>
				<p className="song-artist">{song.artist}</p>
				<div className="song-roles">
					{song.roles.map((role) => (
						<span key={role} className="song-role">
							{role}
						</span>
					))}
				</div>
			</div>

			<div className="audio-controls">
				<button onClick={handlePlayPause}>{isPlaying ? '❚❚' : '▶'}</button>
				<input
					type="range"
					min={0}
					max={100}
					value={progress}
					onChange={handleProgressChange}
					className="progress-bar"
				/>
				<div className="volume-wrapper">
					<button
						onClick={() => setVolumeOpen((prev) => !prev)}
						className="volume-button"
					>
						<Volume2 size={24} />
					</button>
					{volumeOpen && (
						<div className="volume-slider-wrapper">
							<input
								type="range"
								min={0}
								max={1}
								step={0.01}
								value={volume}
								onChange={handleVolumeChange}
								className="volume-slider"
							/>
						</div>
					)}
				</div>
			</div>

			{song.audio?.asset?.url && (
				<audio ref={audioRef} src={song.audio.asset.url} />
			)}
		</div>
	);
}
