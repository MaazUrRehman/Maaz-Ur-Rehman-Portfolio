"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { portfolioSkills } from "@/data/skills";

function getVisibleCount() {
	if (typeof window === "undefined") return 5;
	if (window.innerWidth <= 500) return 2;
	if (window.innerWidth <= 800) return 4;
	return 5;
}

export default function AboutSkills() {
	const [start, setStart] = useState(0);
	const [visibleCount, setVisibleCount] = useState(5);
	const [slideDistance, setSlideDistance] = useState(0);
	const [cardWidth, setCardWidth] = useState(0);
	const [autoplayReset, setAutoplayReset] = useState(0);
	const viewportRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const directionRef = useRef<"right" | "left">("right");
	const maxStart = Math.max(0, portfolioSkills.length - visibleCount);

	useEffect(() => {
		const handleResize = () => {
			setVisibleCount(getVisibleCount());
			setStart((current) => Math.min(current, Math.max(0, portfolioSkills.length - getVisibleCount())));
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useLayoutEffect(() => {
		const viewport = viewportRef.current;
		const track = trackRef.current;
		if (!viewport || !track) return;

		const measure = () => {
			const gap = Number.parseFloat(window.getComputedStyle(track).columnGap || window.getComputedStyle(track).gap) || 12;
			const nextCardWidth = (viewport.clientWidth - gap * (visibleCount - 1)) / visibleCount;
			setCardWidth(nextCardWidth);
			setSlideDistance(nextCardWidth + gap);
		};

		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(viewport);
		return () => observer.disconnect();
	}, [visibleCount]);

	useEffect(() => {
		const interval = window.setInterval(() => {
			setStart((current) => {
				if (directionRef.current === "right") {
					if (current >= maxStart) {
						directionRef.current = "left";
						return Math.max(0, current - 1);
					}
					return current + 1;
				}

				if (current <= 0) {
					directionRef.current = "right";
					return Math.min(maxStart, current + 1);
				}
				return current - 1;
			});
		}, 2000);

		return () => window.clearInterval(interval);
	}, [autoplayReset, maxStart]);

	const moveManually = (nextIndex: number, nextDirection: "right" | "left") => {
		directionRef.current = nextDirection;
		setStart(Math.max(0, Math.min(maxStart, nextIndex)));
		setAutoplayReset((current) => current + 1);
	};
	const trackStyle = { transform: `translate3d(-${start * slideDistance}px, 0, 0)` } as CSSProperties;

	return <section className="subsection skills-section"><div className="container"><div className="section-heading page-section-heading"><div><span className="section-kicker">Tools I work with</span><h2>Skills &amp; Expertise</h2></div></div><div className="skills-carousel" aria-label="Skills carousel"><button type="button" className="skills-nav" onClick={() => moveManually(start - 1, "left")} disabled={start === 0} aria-label="Previous skills">&#8249;</button><div className="skills-viewport" ref={viewportRef}><div className="skills-track" ref={trackRef} style={trackStyle}>{portfolioSkills.map(([name, logo]) => <div className="skill-card" key={name} style={cardWidth ? { flexBasis: `${cardWidth}px`, width: `${cardWidth}px` } : undefined}><span className="skill-logo" style={{ backgroundImage: `url(${logo})` }} role="img" aria-label={`${name} logo`} /><span>{name}</span></div>)}</div></div><button type="button" className="skills-nav" onClick={() => moveManually(start + 1, "right")} disabled={start >= maxStart} aria-label="Next skills">&#8250;</button></div></div></section>;
}
