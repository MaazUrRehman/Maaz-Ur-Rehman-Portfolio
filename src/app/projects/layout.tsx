import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/projects");

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
