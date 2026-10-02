import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import ServicesCTA from "@/components/Services/ServicesCTA";
import ServicesGrid from "@/components/Services/ServicesGrid";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/services");

export default function ServicesPage() {
	return <div className="portfolio-shell"><Navbar /><main><ServicesGrid /><ServicesCTA /></main><Footer /></div>;
}
