"use client";

import { useState } from "react";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import ProjectFilters from "@/components/Projects/ProjectFilters";
import ProjectGrid from "@/components/Projects/ProjectGrid";
import ProjectsCTA from "@/components/Projects/ProjectsCTA";
import { projects } from "@/data/projects";
import type { ProjectCategory } from "@/types";

export default function ProjectsPage() {
	const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");
	const visibleProjects = selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory);

	return <div className="portfolio-shell"><Navbar /><main><section className="inner-hero projects-hero"><div className="container"><span className="section-kicker">Selected work</span><h1>My <span>Projects</span></h1><p className="inner-lede">Here are some of the projects I&apos;ve worked on across web development, mobile applications, and other software solutions.</p></div></section><section className="projects-area"><div className="container"><h2 className="sr-only">Web and mobile project portfolio</h2><ProjectFilters selected={selectedCategory} onChange={setSelectedCategory} /><ProjectGrid projects={visibleProjects} /></div></section><ProjectsCTA /></main><Footer /></div>;
}
