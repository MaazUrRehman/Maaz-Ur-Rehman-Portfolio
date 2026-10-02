"use client";

import {
	Code2,
	Server,
	Smartphone,
	Gamepad2,
	Brain,
	Database,
	Cloud,
	GraduationCap,
	Users,
} from "lucide-react";

const expertiseCategories = [
	{
		icon: Code2,
		title: "Front-End Development",
		description:
			"Building modern, responsive and interactive web interfaces with clean and scalable code.",
		skills: [
			"HTML",
			"CSS",
			"JavaScript",
			"React",
			"Next.js",
			"TypeScript",
			"Tailwind CSS",
			"Responsive Design",
			"UI Development",
		],
	},
	{
		icon: Server,
		title: "Back-End Development",
		description:
			"Developing secure APIs, authentication systems and reliable server-side applications.",
		skills: [
			"Node.js",
			"Express.js",
			"Laravel",
			"REST APIs",
			"Authentication",
			"Authorization",
			"API Integration",
		],
	},
	{
		icon: Smartphone,
		title: "Mobile App Development",
		description:
			"Creating functional and user-friendly mobile applications for modern platforms.",
		skills: [
			"Flutter",
			"Dart",
            "Getx",
			"Firebase",
			"REST APIs",
			"Authentication",
			"Responsive UI",
		],
	},
	{
		icon: Gamepad2,
		title: "Game Development",
		description:
			"Exploring interactive experiences, gameplay logic and application-based game development.",
		skills: [
			"Game Logic",
			"Interactive UI",
			"JavaScript",
			"Programming Logic",
			"Problem Solving",
		],
	},
	{
		icon: Brain,
		title: "Machine Learning & Deep Learning",
		description:
			"Working with data-driven solutions, analysis and intelligent application concepts.",
		skills: [
			"Python",
			"Machine Learning",
			"Deep Learning",
			"Data Analysis",
			"Model Concepts",
			"Data Processing",
		],
	},
	{
		icon: Database,
		title: "Database & API Integration",
		description:
			"Designing data-driven applications and connecting systems through reliable APIs.",
		skills: [
			"MongoDB",
			"MySQL",
			"Supabase",
            "Firebase",
            "Postgress",
			"Database Design",
			"REST APIs",
			"Third-Party APIs",
		],
	},
	{
		icon: Cloud,
		title: "Deployment & DevOps",
		description:
			"Deploying and maintaining applications with practical production workflows.",
		skills: [
			"Git",
			"GitHub",
			"Vercel",
			"Linux",
			"Nginx",
			"PM2",
			"VPS Deployment",
		],
	},
	{
		icon: GraduationCap,
		title: "Mentorship & Training",
		description:
			"Helping students and developers understand programming through practical, project-based learning.",
		skills: [
			"IT Training",
			"JavaScript",
			"HTML & CSS",
			"React",
			"Laravel",
			"Project Guidance",
			"Code Reviews",
		],
	},
	{
		icon: Users,
		title: "Leadership & Problem Solving",
		description:
			"Breaking complex problems into practical solutions while collaborating and guiding teams.",
		skills: [
			"Problem Solving",
			"Team Collaboration",
			"Project Planning",
			"Technical Guidance",
			"Communication",
			"Leadership",
		],
	},
];

export default function ExpertiseCategories() {
	return (
		<section className="page-section expertise-section">
			<div className="container">
				<div className="section-heading page-section-heading">
					<div>
						<span className="section-kicker">What I can do</span>
						<h2>Skills &amp; Expertise</h2>
					</div>

					
				</div>

				<div className="expertise-grid">
					{expertiseCategories.map((category, index) => {
						const Icon = category.icon;

						return (
							<article
								className="expertise-card"
								key={category.title}
							>
								<div className="expertise-card-top">
									<div className="expertise-icon">
										<Icon size={24} strokeWidth={1.8} />
									</div>

									<span className="expertise-number">
										{String(index + 1).padStart(2, "0")}
									</span>
								</div>

								<h3>{category.title}</h3>

								<p>{category.description}</p>

								<div className="expertise-skills">
									{category.skills.map((skill) => (
										<span key={skill}>{skill}</span>
									))}
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}