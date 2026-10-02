import { professionalRoles } from "@/data/skills";

type RoleIcon = "code" | "mobile" | "teaching" | "learning";

function RoleMark({ name }: { name: RoleIcon }) {
	if (name === "code") return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
	if (name === "mobile") return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M10 6h4M11 18h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>;
	if (name === "teaching") return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="m3 9 9-5 9 5-9 5-9-5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M7 12v4c2.8 2 7.2 2 10 0v-4M21 9v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>;
	return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M12 3v5M12 16v5M3 12h5M16 12h5M5.6 5.6l3.5 3.5M14.9 14.9l3.5 3.5M18.4 5.6l-3.5 3.5M9.1 14.9l-3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>;
}

export default function ProfessionalRoles() {
	return <section className="professional-roles"><div className="container"><div className="section-heading roles-heading"><div><span className="section-kicker">Professional identity</span><h2>My Professional Focus</h2></div></div><div className="roles-grid">{professionalRoles.map(([title, description, icon]) => <article className="role-card" key={title}><span className="role-icon"><RoleMark name={icon} /></span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div></div></section>;
}
