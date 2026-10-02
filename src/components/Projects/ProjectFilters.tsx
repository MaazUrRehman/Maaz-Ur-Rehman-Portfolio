"use client";

import type { ProjectCategory } from "@/types";

export const projectCategories: ProjectCategory[] = [
  "All",
  "Website",
  "Web Apps",
  "Mobile App",
  "Game",
  "CMS",
  "Machine Learning & Deep Learning",
];

type ProjectFiltersProps = { selected: ProjectCategory; onChange: (category: ProjectCategory) => void };

export default function ProjectFilters({ selected, onChange }: ProjectFiltersProps) {
	return <div className="project-filters" role="group" aria-label="Filter projects by category">{projectCategories.map((category) => <button type="button" className={selected === category ? "filter-button active" : "filter-button"} aria-pressed={selected === category} onClick={() => onChange(category)} key={category}>{category}</button>)}</div>;
}
