import type { Metadata } from "next";
import { portfolioSkills } from "@/data/skills";
import { socialLinks } from "@/data/site";

const configuredUrl = process.env.SITE_URL?.trim();
const parsedUrl = new URL(configuredUrl || "http://localhost:3000");
if (!/^https?:$/.test(parsedUrl.protocol) || parsedUrl.username || parsedUrl.password || parsedUrl.pathname !== "/" || parsedUrl.search || parsedUrl.hash) {
  throw new Error("SITE_URL must be an HTTP(S) origin without a path, credentials, query, or fragment.");
}
// Never publish a guessed production domain. Documented deployment configuration is required.
export const siteUrl = parsedUrl.origin;
export const hasProductionUrl = Boolean(configuredUrl) && !["localhost", "127.0.0.1", "[::1]"].includes(parsedUrl.hostname);
const indexingSetting = process.env.SEO_INDEXABLE?.trim();
if (indexingSetting && !["true", "false"].includes(indexingSetting)) {
  throw new Error("SEO_INDEXABLE must be true or false when provided.");
}
// A preview must not compete with the canonical production portfolio.
export const isIndexable = hasProductionUrl && indexingSetting !== "false" && process.env.VERCEL_ENV !== "preview";

export const siteVerification: Metadata["verification"] = {
  google: process.env.GOOGLE_SITE_VERIFICATION?.trim() || undefined,
  other: process.env.BING_SITE_VERIFICATION?.trim()
    ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION.trim() }
    : undefined,
};

export const seoPages = {
  "/": { title: "Maaz Ur Rehman | Full Stack Developer in Karachi", description: "Maaz Ur Rehman is a Full Stack Developer in Karachi, Pakistan, building web and mobile applications with Laravel, React, Next.js, Node.js, and Flutter." },
  "/about": { title: "About Maaz Ur Rehman | Developer & IT Instructor", description: "Get to know Maaz Ur Rehman, a Full Stack Developer and IT Instructor in Karachi. Explore his development experience, technical skills, and education." },
  "/projects": { title: "Web & Mobile Projects | Maaz Ur Rehman", description: "Explore Maaz Ur Rehman's portfolio of web applications, mobile apps, and software projects, with project screenshots, features, and technologies." },
  "/services": { title: "Full Stack Development Services in Karachi | Maaz Ur Rehman", description: "Explore Maaz Ur Rehman's full stack web development services in Karachi, Pakistan, using Laravel, React, Next.js, and Node.js, plus IT training and support." },
  "/contact": { title: "Contact Maaz Ur Rehman | Discuss Your Project", description: "Contact Maaz Ur Rehman, a Full Stack Developer in Karachi, Pakistan, to discuss web and mobile development projects, collaborations, or opportunities." },
} as const;

export function pageMetadata(path: keyof typeof seoPages): Metadata {
  const { title, description } = seoPages[path];
  const url = new URL(path, siteUrl).href;
  const image = new URL("/images/profile/portfolio_home_image_dark.png", siteUrl).href;
  return {
    title, description,
    alternates: { canonical: url },
    robots: {
      index: isIndexable, follow: true,
      googleBot: { index: isIndexable, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    openGraph: { title, description, url, type: "website", siteName: "Maaz Ur Rehman", locale: "en_PK", images: [{ url: image, alt: "Maaz Ur Rehman, Full Stack Developer" }] },
    twitter: { card: "summary_large_image", title, description, images: [{ url: image, alt: "Maaz Ur Rehman, Full Stack Developer" }] },
  };
}

export const portfolioSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person", "@id": `${siteUrl}/#person`,
      name: "Maaz Ur Rehman", jobTitle: "Full Stack Developer", url: `${siteUrl}/`,
      image: `${siteUrl}/images/profile/portfolio_home_image_dark.png`,
      address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
      knowsAbout: portfolioSkills.map(([name]) => name),
      sameAs: socialLinks.map(({ href }) => href),
    },
    {
      "@type": "WebSite", "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`, name: "Maaz Ur Rehman", inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "ProfilePage", "@id": `${siteUrl}/#profile`,
      url: `${siteUrl}/`, name: seoPages["/"].title,
      description: seoPages["/"].description,
      mainEntity: { "@id": `${siteUrl}/#person` },
      isPartOf: { "@id": `${siteUrl}/#website` },
    },
  ],
};
