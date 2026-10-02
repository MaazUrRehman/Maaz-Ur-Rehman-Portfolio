import type { Metadata } from "next";
import { siteUrl, siteVerification } from "@/lib/seo";
import "./globals.css";
import "./page-styles.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  verification: siteVerification,
  icons: { icon: "/images/profile/logo.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full antialiased"
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
