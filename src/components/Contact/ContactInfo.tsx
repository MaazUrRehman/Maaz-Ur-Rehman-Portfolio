import { contactDetails } from "@/data/site";

const details = [
	{ label: "Email", value: contactDetails.email, icon: "@" },
	{ label: "Phone", value: contactDetails.phone, icon: "⌕" },
	{ label: "Location", value: contactDetails.location, icon: "⌖" },
];

export default function ContactInfo() {
	return <div className="contact-info"><span className="section-kicker">Get in touch</span><h2>Let&apos;s make something useful.</h2><p>Whether you have a project in mind or want to talk through an idea, I&apos;d be glad to hear from you.</p><div className="contact-detail-list">{details.map((detail) => <div className="contact-detail" key={detail.label}><span className="contact-icon">{detail.icon}</span><div><span>{detail.label}</span><strong>{detail.value}</strong></div></div>)}</div><p className="placeholder-note">Contact details above are placeholders and can be replaced with your real information.</p></div>;
}
