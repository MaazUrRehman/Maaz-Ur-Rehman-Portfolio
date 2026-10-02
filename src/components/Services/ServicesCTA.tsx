import Link from "next/link";

export default function ServicesCTA() {
	return <section className="page-cta services-cta"><div className="container cta-inner"><div><span className="section-kicker">Start a conversation</span><h2>Have a Project in Mind?</h2><p>Let&apos;s discuss your idea and turn it into reality.</p></div><Link className="button" href="/contact">Contact Me <span aria-hidden="true">↗</span></Link></div></section>;
}
