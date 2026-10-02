import type { Project } from "@/types";
import ProjectCard from "@/components/Projects/ProjectCard";

type ProjectGridProps = { projects: Project[] };

export default function ProjectGrid({ projects }: ProjectGridProps) {
	if (projects.length === 0) return <p className="empty-projects">No projects in this category yet.</p>;

	return <div className="project-grid full-project-grid">{projects.map((project) => <ProjectCard project={project} key={project.id} />)}</div>;
}
