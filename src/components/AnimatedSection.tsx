'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect, ReactNode } from 'react';

export default function AnimatedSection({ children }: { children: ReactNode }) {
	const ref = useRef(null);
	const controls = useAnimation();
	const inView = useInView(ref, { margin: '-20% 0px -20% 0px' });

	useEffect(() => {
		if (inView) controls.start({ opacity: 1, y: 0 });
		else controls.start({ opacity: 0, y: 50 });
	}, [controls, inView]);

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 50 }}
			animate={controls}
			transition={{ duration: 0.6, ease: 'easeOut' }}
			style={{ width: '100%' }}
		>
			{children}
		</motion.div>
	);
}
