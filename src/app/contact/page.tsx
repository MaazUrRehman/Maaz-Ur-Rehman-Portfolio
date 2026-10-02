import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import ContactForm from "@/components/Contact/ContactForm";
import ContactInfo from "@/components/Contact/ContactInfo";
import ResumeCTA from "@/components/Contact/ResumeCTA";
import SocialLinks from "@/components/Contact/SocialLinks";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/contact");

export default function ContactPage() {
	return <div className="portfolio-shell"><Navbar /><main><section className="inner-hero contact-hero"><div className="container"><span className="section-kicker">Let&apos;s connect</span><h1>Contact <span>Me</span></h1><p className="inner-lede">Have a question, a project idea, or just want to say hi? Feel free to reach out.</p></div></section><section className="contact-area"><div className="container contact-grid"><div><ContactInfo /><SocialLinks /></div><ContactForm /></div></section><div className="container"><ResumeCTA /></div></main><Footer /></div>;
}
