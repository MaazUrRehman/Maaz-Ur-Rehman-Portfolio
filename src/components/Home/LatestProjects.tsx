import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/Projects/ProjectCard";

export default function LatestProjects() {
	const featuredProjects = projects.filter((project) => project.featured);

	return <section className="projects-section"><div className="container"><div className="section-heading"><div><span className="section-kicker">Selected work</span><h2>My Featured Projects</h2></div><Link className="button button-ghost latest-projects-link" href="/projects">View Projects</Link></div><div className="project-grid">{featuredProjects.map((project) => <ProjectCard project={project} key={project.id} />)}</div></div></section>;
}
