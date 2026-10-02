import DownloadCV from "@/components/pdf/DownloadCV";

export default function ResumeCTA() {
	return <section className="resume-cta"><div><span className="section-kicker">A closer look</span><h2>Download My Resume</h2><p>Get a detailed overview of my experience, skills, and education.</p></div><DownloadCV className="button">Download CV <span aria-hidden="true">↓</span></DownloadCV></section>;
}
