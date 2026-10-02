type AboutIconName = "location" | "email" | "experience" | "education" | "certificate";

export default function AboutIcon({ name }: { name: AboutIconName }) {
	if (name === "location") return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.7" /></svg>;
	if (name === "email") return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
	if (name === "experience") return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><rect x="4" y="7" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M9 7V5h6v2M4 12h16M10 12v2h4v-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
	if (name === "education") return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="m3 9 9-5 9 5-9 5-9-5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M7 12v4c2.8 2 7.2 2 10 0v-4M21 9v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>;
	return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.7" /><path d="m8.5 14-1 7 4.5-2.5 4.5 2.5-1-7M9.5 9l1.5 1.5 3.5-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
