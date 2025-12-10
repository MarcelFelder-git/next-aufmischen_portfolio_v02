'use client';

import { useEffect, useState } from 'react';
import { client } from '@/src/sanity/client';
import { groq } from 'next-sanity';
import { useLanguage } from '@/src/contexts/LanguageContext';

type EventItem = {
	date: string;
	city: string;
	venue: string;
	ticketLink?: string;
	note?: string;
};

export default function EventsSection() {
	const [upcoming, setUpcoming] = useState<EventItem[]>([]);
	const [past, setPast] = useState<EventItem[]>([]);
	const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
	const [showAll, setShowAll] = useState(false);

	const { lang } = useLanguage();

	useEffect(() => {
		const query = groq`*[_type == "events"][0]{ eventsList }`;

		client.fetch<{ eventsList: EventItem[] }>(query).then((res) => {
			if (!res?.eventsList) return;

			const today = new Date();

			const upcomingEvents = res.eventsList
				.filter((e) => new Date(e.date) >= today)
				.sort(
					(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
				);

			const pastEvents = res.eventsList
				.filter((e) => new Date(e.date) < today)
				.sort(
					(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
				);

			setUpcoming(upcomingEvents);
			setPast(pastEvents);
		});
	}, []);

	const currentList = activeTab === 'upcoming' ? upcoming : past;
	const listToRender = showAll ? currentList : currentList.slice(0, 6);

	return (
		<section id="events" className="events-section">
			{/* LEFT SIDE (Content + Scroll Window) */}
			<div className="events-left">
				<div className="events-left-inner">
					{/* Tabs */}
					<div className="events-tabs">
						<button
							className={`events-tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
							onClick={() => {
								setActiveTab('upcoming');
								setShowAll(false);
							}}
						>
							{lang === 'de' ? 'Bevorstehend' : 'Upcoming'}
						</button>

						<button
							className={`events-tab-btn ${activeTab === 'past' ? 'active' : ''}`}
							onClick={() => {
								setActiveTab('past');
								setShowAll(false);
							}}
						>
							{lang === 'de' ? 'Vergangene' : 'Past'}
						</button>
					</div>

					{/* SCROLL WINDOW */}
					<div className="events-scroll">
						{listToRender.length === 0 ? (
							<p className="empty">
								{lang === 'de' ? 'Keine Einträge' : 'No events'}
							</p>
						) : (
							<ul className="events-list">
								{listToRender.map((event, i) => (
									<EventCard key={i} event={event} lang={lang} />
								))}
							</ul>
						)}
					</div>

					{/* Show All / Less */}
					{currentList.length > 6 && (
						<button
							className="events-show-btn"
							onClick={() => setShowAll((prev) => !prev)}
						>
							{showAll
								? lang === 'de'
									? 'Weniger anzeigen'
									: 'Show less'
								: lang === 'de'
									? 'Alle anzeigen'
									: 'Show all'}
						</button>
					)}
				</div>
			</div>

			{/* RIGHT SIDE (Sticky Headline) */}
			<div className="events-right">
				<h2 className="events-headline">Events</h2>
			</div>
		</section>
	);
}

/* ----------------------------------------------------- */
/* EVENT CARD */
/* ----------------------------------------------------- */

function EventCard({ event, lang }: { event: EventItem; lang: string }) {
	const date = new Date(event.date);

	return (
		<li className="event-card">
			<div className="timeline-dot" />

			<div className="event-content">
				{/* DATE */}
				<div className="event-date">
					<span>
						{date.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
							day: '2-digit',
						})}
					</span>
					<span className="month">
						{date.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
							month: 'short',
							year: '2-digit',
						})}
					</span>
				</div>

				{/* INFO */}
				<div className="event-info">
					<p className="event-title">
						{event.city} @ {event.venue}
					</p>
					{event.note && <p className="event-note">{event.note}</p>}

					{event.ticketLink && (
						<a
							href={event.ticketLink}
							target="_blank"
							className="event-ticket-btn"
						>
							{lang === 'de' ? 'Tickets' : 'Tickets'}
						</a>
					)}
				</div>
			</div>
		</li>
	);
}
