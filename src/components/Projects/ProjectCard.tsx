"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/types";
import ProjectModal from "@/components/Projects/ProjectModal";

export default function ProjectCard({ project }: { project: Project }) {
	const [isOpen, setIsOpen] = useState(false);
	return <><button type="button" className="project-card project-card-button" onClick={() => setIsOpen(true)} aria-label={`View details for ${project.title}`}><div className={`project-art ${project.accent}`}><Image src={project.image ?? project.images[0]} alt={`${project.title} project preview`} width={640} height={360} /><span className="art-caption">{project.projectType}</span></div><div className="project-content"><span className="project-category">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><span className="text-link">View project</span></div></button>{isOpen ? <ProjectModal project={project} onClose={() => setIsOpen(false)} /> : null}</>;
}
