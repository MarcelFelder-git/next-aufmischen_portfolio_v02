'use client';

import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';

interface FullpageWrapperProps {
	children: React.ReactNode[];
}

export default function FullpageWrapper({ children }: FullpageWrapperProps) {
	return (
		<ReactFullpage
			licenseKey={''} // oder 'null' wenn free mode
			scrollingSpeed={700}
			navigation={true}
			anchors={['hero', 'work', 'about', 'events', 'contact']}
			credits={{ enabled: false }}
			render={() => {
				return (
					<ReactFullpage.Wrapper>
						{children.map((child, i) => (
							<div className="section" key={i}>
								{child}
							</div>
						))}
					</ReactFullpage.Wrapper>
				);
			}}
		/>
	);
}
