import {
	Document,
	Circle,
	Page,
	Path,
	Rect,
	Svg,
	Text,
	View,
} from "@react-pdf/renderer";
import { resumeColors, resumeStyles as styles } from "./resumeStyles";

type IconName = "phone" | "whatsapp" | "email" | "linkedin" | "location" | "summary" | "work" | "education" | "projects" | "certificate";

const contact = [
	["phone", "+92 340 2027908"],
	["whatsapp", "+92 330 2726456"],
	["email", "maazurrehman468@gmail.com"],
	["linkedin", "linkedin.com/in/maaz-ur-rehman-ba0568227"],
	["location", "Block S, North Nazimabad, Karachi."],
] as const;

const skillGroups = [
	["Languages & Frameworks", ["PHP / Laravel", "JavaScript / TypeScript", "Python", "Dart / Flutter", "React / Next.js", "Node.js"]],
	["Frontend", ["HTML5 / CSS3", "Tailwind CSS", "Bootstrap", "jQuery"]],
	["Mobile", ["Flutter", "Firebase", "GetX", "Flame Engine"]],
	["Backend & APIs", ["REST API Design", "MVC Architecture", "Laravel Breeze Auth"]],
	["Databases", ["MySQL", "MongoDB", "SQLite", "Firebase Firestore", "Supabase"]],
	["Tools & Platforms", ["Git / GitHub", "VS Code", "Figma", "Vercel", "cPanel", "Shopify"]],
	["AI / ML", ["Supervised & Unsupervised Learning", "Regression / SVM / KNN / Classification", "TensorFlow / Matplotlib", "Pandas / NumPy / Tkinter"]],
] as const;

const experience = [
    {
        title: "Full Stack Developer",
        company: "SoftTech Development and Creations",
        date: "2025 – Present",
        bullets: [
            "Developed and maintained full-stack web applications using Laravel, React, Next.js, Node.js, and TypeScript across diverse client and internal projects.",
            "Worked with multiple databases and backend services including MySQL, MongoDB, SQLite, Firebase, and Supabase for scalable data management and application integration.",
            "Built and integrated RESTful APIs, authentication systems, third-party services, payment gateways, and real-time application features.",
        ],
    },

    {
        title: "IT Instructor (Part-time)",
        company: "SoftTech Labs and AI, Development Institute",
        date: "June 2026 – Present",
        bullets: [
            "Teach modern web development technologies through structured lessons and real-life examples, helping students understand concepts through practical implementation.",
            "Guide students through hands-on coding projects, responsive interfaces, debugging, and real-world development workflows.",
        ],
    },

    {
        title: "Mobile App Developer",
        company: "Vertex Invo",
        date: "2024 – 2025",
        bullets: [
            "Developed cross-platform mobile applications using Flutter and Dart, focusing on responsive interfaces, reusable components, and smooth user experiences.",
            "Designed and implemented application interfaces and user flows using Figma, translating UI/UX designs into functional Flutter screens.",
        ],
    },
] as const;

const education = [
	["Bachelor of Science in Computer Science", "Virtual University", "2021 – 2025"],
	["Diploma in Software Engineering", "Aptech Computer Education", "2020 – 2023"],
	["Intermediate — Pre-Engineering", "Pakistan Shipowner's Govt College", "2019"],
	["Matriculation — Computer Science", "The City Academy", "2017"],
] as const;

const projects = [
	["AIKRISHTA", "Next.js  •  Node.js  •  Express.js  •  MongoDB", "Matrimonial web application with user profiles, matching, real-time chat, authentication, and secure account management. Designed to support meaningful discovery and smooth communication between users."],
	["Khareedgar", "Flutter  •  Firebase  •  GetX  •  Dart", "Multi-vendor e-commerce app with real-time listings, cart system, and secure checkout. Focused on a responsive shopping experience with organized product and order flows."],
	["QuickSolutionz Inventory", "Laravel  •  React  •  MySQL", "Advanced inventory system with bulk Excel upload, optimized tracking, and Breeze auth. Streamlined stock management and day-to-day operations through a practical dashboard experience."],
	["Flappy Bird Game", "Flutter  •  Dart  •  Flame Engine", "Flappy bird-inspired game with streak management, mini word-guessing feature, smooth animation. Combined interactive gameplay with responsive controls and engaging progression."],
	["Unlock Creatives", "Laravel  •  React  •  MySQL", "Service platform with admin dashboard, client management, and booking system. Connected client requests with organized administrative workflows and service tracking."],
	["SoftTech Development and Creations", "Next.js  •  TypeScript", "Software house portfolio — responsive, modern UI/UX showcasing services and tech stack. Built to present the team's capabilities clearly across desktop and mobile experiences."],
	["HROX Logistics", "Next.js  •  TypeScript", "Logistics management web application for shipment tracking, fleet management, and operations. Supports clearer coordination of shipments, vehicles, and operational activity."],
	["Food Price Analysis in Pakistan (FYP)", "Python  •  Pandas  •  NumPy  •  Matplotlib  •  Seaborn", "Data analysis and visualization of food prices in Pakistan using advanced Python libraries. Performed WFP dataset analysis and predictive modeling for price trends, presenting findings through clear visual insights."],
] as const;

const certifications = [
	["Advance Diploma in Software Engineering", "Aptech Computer Education"],
	["English Language Proficiency Certificate", "Virtual University Of Pakistan"],
	["Data Analyst", "Microsoft Simplilearn"],
	["Data Analyst", "Delloite"],
] as const;

function PdfIcon({ name, color, strokeWidth = 1.5, size = 10 }: { name: IconName; color: string; strokeWidth?: number; size?: number }) {
	const strokeProps = { fill: "none", stroke: color, strokeWidth, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

	return <Svg width={size} height={size} viewBox="0 0 24 24">
		{name === "phone" && <Path {...strokeProps} d="M7 3.5 4.5 5c-.7.4-.8 1.3-.5 2.1 2.1 6.1 6.1 10.1 12.2 12.2.8.3 1.7.1 2.1-.5l1.5-2.5-3.7-2.2-1.8 1.8c-2.4-1.2-4.6-3.4-5.8-5.8l1.8-1.8L8.1 4 7 3.5Z" />}
		{name === "whatsapp" && <><Circle {...strokeProps} cx={12} cy={11} r={8.5} /><Path {...strokeProps} d="M8.7 8.2c.3-.5.7-.5 1-.1l1.1 1.5c.2.3.2.6-.1.9l-.5.5c.6 1.1 1.5 2 2.6 2.6l.5-.5c.3-.3.6-.3.9-.1l1.5 1.1c.4.3.4.7-.1 1-1 .7-2.4.6-3.9-.2-1.4-.8-2.8-2.2-3.6-3.6-.8-1.5-.9-2.9-.2-3.9Z" /></>}
		{name === "email" && <><Rect {...strokeProps} x={3} y={5} width={18} height={14} rx={1} /><Path {...strokeProps} d="m4 7 8 6 8-6" /></>}
		{name === "linkedin" && <><Rect fill={color} x={3} y={3} width={18} height={18} rx={2} /><Circle fill={resumeColors.navy} cx={8} cy={9} r={1.2} /><Path fill="none" stroke={resumeColors.navy} strokeWidth={1.6} strokeLinecap="round" d="M8 11v5M11 16v-3c0-1.3.7-2 1.8-2 1.2 0 1.7.8 1.7 2v3M11 11v5" /></>}
		{name === "location" && <><Path {...strokeProps} d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z" /><Circle {...strokeProps} cx={12} cy={10} r={2.2} /></>}
		{name === "summary" && <><Path {...strokeProps} d="M6 3.5h8l4 4V20H6Z" /><Path {...strokeProps} d="M14 3.5V8h4M9 12h6M9 15h6" /></>}
		{name === "work" && <><Rect {...strokeProps} x={4} y={7} width={16} height={12} rx={1} /><Path {...strokeProps} d="M9 7V5h6v2M4 12h16M10 12v2h4v-2" /></>}
		{name === "education" && <><Path {...strokeProps} d="m3 9 9-5 9 5-9 5-9-5Z" /><Path {...strokeProps} d="M7 12v4c2.8 2 7.2 2 10 0v-4M21 9v6" /></>}
		{name === "projects" && <><Path {...strokeProps} d="m9 7-5 5 5 5M15 7l5 5-5 5M13 4l-2 16" /></>}
		{name === "certificate" && <><Circle {...strokeProps} cx={12} cy={9} r={6} /><Path {...strokeProps} d="m8.5 14-1 7 4.5-2.5 4.5 2.5-1-7M9.5 9l1.5 1.5 3.5-3.5" /></>}
	</Svg>;
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
	return <View style={styles.sidebarSection}><Text style={styles.sidebarHeading}>{title}</Text>{children}</View>;
}

function MainSection({ icon, title, children }: { icon: IconName; title: string; children: React.ReactNode }) {
	return <View style={styles.mainSection}><View style={styles.sectionTitleRow}><View style={styles.sectionIcon}><PdfIcon name={icon} color={resumeColors.deepNavy} strokeWidth={2.6} size={13} /></View><Text style={styles.sectionTitle}>{title}</Text></View>{children}</View>;
}

function ExperienceItem({ title, company, date, bullets }: (typeof experience)[number]) {
	return <View style={styles.job} wrap={false}>
		<View style={styles.jobDot} />
		<View style={styles.jobHeader}><Text style={styles.jobTitle}>{title}</Text><Text style={styles.date}>{date}</Text></View>
		<Text style={styles.company}>{company}</Text>
		{bullets.map((bullet) => <Text key={bullet} style={styles.bullet}>•  {bullet}</Text>)}
	</View>;
}

export default function ResumePDF() {
	return <Document title="Maaz Ur Rehman CV" author="Maaz Ur Rehman">
		<Page size="A4" style={styles.page} wrap={false}>
			<View style={styles.sidebar}>
				<Text style={styles.name}>MAAZ UR REHMAN</Text>
				<Text style={styles.role}>Full Stack Developer</Text>

				<SidebarSection title="Contact">
					{contact.map(([icon, value]) => <View key={value} style={styles.contactRow}><View style={styles.contactMark}><PdfIcon name={icon} color={resumeColors.white} /></View><Text style={styles.contactText}>{value}</Text></View>)}
				</SidebarSection>

				<SidebarSection title="Technical Skills">
					{skillGroups.map(([title, skills]) => <View key={title} style={styles.skillGroup}><Text style={styles.skillGroupTitle}>{title}</Text>{skills.map((skill) => <Text key={skill} style={styles.skill}>•  {skill}</Text>)}</View>)}
				</SidebarSection>

				<SidebarSection title="Languages">
					<Text style={styles.language}>English — Professional</Text>
					<Text style={styles.language}>Urdu — Native</Text>
				</SidebarSection>

				<SidebarSection title="Key Strengths">
					{["Fast Learner & Adaptable", "Team Collaboration", "Creative Problem Solving", "Leadership Abilities", "Strong Communication"].map((strength) => <Text key={strength} style={styles.skill}>•  {strength}</Text>)}
				</SidebarSection>
			</View>

			<View style={styles.main}>
				<MainSection icon="summary" title="Professional Summary">
					<Text style={styles.summary}>Results-driven Full Stack Developer with 2+ years of experience building scalable web and mobile applications using Laravel, React, Next.js, Node.js, Flutter, and modern development practices. Experienced in designing RESTful APIs, third-party API integrations, authentication and authorization systems, payment gateways, real-time chat, and secure application architectures. Skilled in developing AI-powered features including matching and real-time communication. Strong understanding of database design, MVC and structured application patterns, responsive UI/UX, performance optimization, and end-to-end application development.</Text>
				</MainSection>

				<MainSection icon="work" title="Work Experience">
					{experience.map((item) => <ExperienceItem key={item.title} {...item} />)}
				</MainSection>

				<MainSection icon="education" title="Education">
					{education.map(([title, school, date]) => <View key={title} style={styles.job} wrap={false}><View style={styles.jobDot} /><View style={styles.jobHeader}><Text style={styles.jobTitle}>{title}</Text><Text style={styles.date}>{date}</Text></View><Text style={styles.company}>{school}</Text></View>)}
				</MainSection>

				<MainSection icon="projects" title="Key Projects">
					{projects.map(([name, tech, description]) => <View key={name} style={styles.project} wrap={false}><View style={styles.projectDot} /><View style={styles.projectHeader}><Text style={styles.projectName}>{name}</Text><Text style={styles.projectTech}>{tech}</Text></View><Text style={styles.projectDescription}>{description}</Text></View>)}
				</MainSection>

				<MainSection icon="certificate" title="Certifications">
					{certifications.map(([name, issuer]) => <View key={`${name}-${issuer}`} style={styles.certification} wrap={false}><View style={styles.certificationDot} /><Text style={styles.certificationName}>{name}</Text><Text style={styles.certificationIssuer}>{issuer}</Text></View>)}
				</MainSection>

				<View style={styles.footer}><Text>References available upon request</Text><Text>•</Text><Text>DOB: 31 May 2001</Text><Text>•</Text><Text>Karachi, Pakistan</Text></View>
			</View>
		</Page>
	</Document>;
}

export { resumeColors };
