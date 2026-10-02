import { socialLinks } from "@/data/site";

export default function SocialLinks() {
	return <div className="contact-socials"><h3>Find me online</h3><div>{socialLinks.map((social) => <a href={social.href} key={social.label} target="_blank" rel="noopener noreferrer"><span>{social.icon}</span><b aria-hidden="true">↗</b></a>)}</div></div>;
}
