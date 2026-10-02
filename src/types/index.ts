export type Project = {
	id: string;
	title: string;
	description: string;
	category: string;
	projectType: string;
	featured: boolean;
	image?: string;
	images: string[];
	imageLabel: string;
	accent: string;
	technologies: string[];
	features: string[];
	github?: string;
	liveUrl?: string;
};

export type ProjectCategory = 
 | "All"
  | "Website"
  | "Web Apps"
  | "Mobile App"
  | "Game"
  | "CMS"
  | "Machine Learning & Deep Learning";

export type NavItem = {
	label: string;
	href: string;
};
