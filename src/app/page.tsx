import Footer from "@/components/Footer/Footer";
import HomeCTA from "@/components/Home/HomeCTA";
import HomeHero from "@/components/Home/HomeHero";
import HomeStats from "@/components/Home/HomeStats";
import LatestProjects from "@/components/Home/LatestProjects";
import Navbar from "@/components/Navbar/Navbar";
import { pageMetadata, portfolioSchema } from "@/lib/seo";

export const metadata = pageMetadata("/");

export default function Home() {
  return <div className="portfolio-shell"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema).replace(/</g, "\\u003c") }} /><Navbar /><main><HomeHero /><HomeStats /><LatestProjects /><HomeCTA /></main><Footer /></div>;
}
