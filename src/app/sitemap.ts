import type { MetadataRoute } from "next";
import { isIndexable, seoPages, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return isIndexable ? Object.keys(seoPages).map((path) => ({ url: new URL(path, siteUrl).href })) : [];
}
