import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import AboutEducation from "@/components/About/AboutEducation";
import AboutIntro from "@/components/About/AboutIntro";
import AboutJourney from "@/components/About/AboutJourney";
import ProfessionalRoles from "@/components/About/ProfessionalRoles";
import AboutSkills from "@/components/About/AboutSkills";
import AboutExpertise from "@/components/About/AboutExpertise";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/about");

export default function AboutPage() {
	return <div className="portfolio-shell"><Navbar /><main><AboutIntro /><ProfessionalRoles /><AboutJourney /><AboutExpertise /><AboutEducation /></main><Footer /></div>;
}
