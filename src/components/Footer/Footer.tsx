import Image from "next/image";
import Link from "next/link";

import { socialLinks } from "@/data/site";
import SocialIcon from "@/components/SocialIcon";

export default function Footer() {
	return <footer className="site-footer"><div className="container footer-grid">
		<div className="footer-branding"><Link className="footer-brand" href="/"><Image className="footer-logo" src="/images/profile/logo.png" alt="MR logo" width={39} height={39} /></Link><div className="footer-brand-copy"><strong>Maaz Ur Rehman</strong><span>Full Stack Developer | IT Instructor</span></div></div>
		<div className="social-links">{socialLinks.map((social) => <a href={social.href} key={social.label} target="_blank" rel="noopener noreferrer" aria-label={social.label}><span className="social-icon"><SocialIcon name={social.icon} /></span></a>)}</div>
	</div><div className="container footer-bottom"><span>© 2026 Maaz Ur Rehman. All rights reserved.</span><span>Made with intention.</span></div></footer>;
}
