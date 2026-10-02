"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Project } from "@/types";

function Chevron({ direction }: { direction: "previous" | "next" }) {
	return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d={direction === "previous" ? "m14.5 5-7 7 7 7" : "m9.5 5 7 7-7 7"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
	const [imageIndex, setImageIndex] = useState(0);
	const image = project.images[imageIndex];

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
			if (event.key === "ArrowLeft") setImageIndex((index) => (index - 1 + project.images.length) % project.images.length);
			if (event.key === "ArrowRight") setImageIndex((index) => (index + 1) % project.images.length);
		};
		document.body.style.overflow = "hidden";
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.body.style.overflow = "";
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [onClose, project.images.length]);

	return <div className="project-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title"><button type="button" className="modal-close" onClick={onClose} aria-label="Close project details">&times;</button>
		<div className="modal-gallery"><Image src={image} alt={`${project.title} screenshot ${imageIndex + 1}`} width={1200} height={675} priority className="modal-main-image" /><button type="button" className="carousel-button carousel-previous" onClick={() => setImageIndex((index) => (index - 1 + project.images.length) % project.images.length)} aria-label="Previous image"><Chevron direction="previous" /></button><button type="button" className="carousel-button carousel-next" onClick={() => setImageIndex((index) => (index + 1) % project.images.length)} aria-label="Next image"><Chevron direction="next" /></button><span className="image-counter">{imageIndex + 1} / {project.images.length}</span></div>
		<div className="modal-thumbnails" aria-label="Project screenshots">{project.images.map((thumbnail, index) => <button type="button" className={index === imageIndex ? "modal-thumbnail active" : "modal-thumbnail"} key={thumbnail} onClick={() => setImageIndex(index)} aria-label={`Show screenshot ${index + 1}`}><Image src={thumbnail} alt="" width={120} height={68} /></button>)}</div>
		<div className="modal-content"><div className="modal-header"><div><span className="section-kicker">{project.category}</span><h2 id="project-modal-title">{project.title}</h2><p className="modal-type">{project.projectType}</p></div></div><p className="modal-description">{project.description}</p><div className="modal-detail-grid"><div><h3>Key Features</h3><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div><div><h3>Technologies</h3><div className="technology-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div></div>{project.liveUrl ? <a className="button modal-live-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">View Live Project <span aria-hidden="true">↗</span></a> : null}</div>
	</section></div>;
}
