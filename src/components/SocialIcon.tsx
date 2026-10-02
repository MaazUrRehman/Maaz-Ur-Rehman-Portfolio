import type { socialLinks } from "@/data/site";

type SocialIconName = (typeof socialLinks)[number]["icon"];

export default function SocialIcon({ name }: { name: SocialIconName }) {
	if (name === "linkedin") return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M5.1 3.5A2.1 2.1 0 1 1 5 7.7a2.1 2.1 0 0 1 .1-4.2ZM3.3 9h3.6v11.5H3.3V9Zm5.8 0h3.4v1.6h.1c.5-.9 1.7-1.9 3.6-1.9 3.8 0 4.5 2.5 4.5 5.8v6h-3.6v-5.3c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9v5.4H9.1V9Z" /></svg>;
	if (name === "facebook") return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M13.8 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5H17V3.7c-.3 0-1.4-.2-2.6-.2-2.6 0-4.3 1.6-4.3 4.4v2H7.4V13h2.7v8h3.7Z" /></svg>;
	if (name === "instagram") return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" /><circle cx="12" cy="12" r="4.1" /><circle cx="17.5" cy="6.7" r=".8" fill="currentColor" stroke="none" /></svg>;
	return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.3-2.2-.3-4.5-1.1-4.5-4.8 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.5 9.5 0 0 1 5.1 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.7-2.3 4.5-4.5 4.8.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z" /></svg>;
}
