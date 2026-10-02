import Link from "next/link";
import DownloadCV from "@/components/pdf/DownloadCV";

export default function AboutCTA() {
	return <section className="page-cta"><div className="container cta-inner"><div><span className="section-kicker">Let&apos;s work together</span><h2>Let&apos;s Build Something Great Together</h2><p>I&apos;m always interested in meaningful projects, collaborations, and new opportunities.</p></div><div className="cta-actions"><Link className="button" href="/contact">Contact Me</Link><DownloadCV className="button button-ghost">Download CV</DownloadCV></div></div></section>;
}
