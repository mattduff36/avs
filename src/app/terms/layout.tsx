import { generateSEO } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateSEO({
  title: "Terms of Service",
  description: "Terms of service for A&V Squires Plant Co Limited. Read our terms and conditions for using our services, website, and conducting business with us.",
  keywords: "terms of service, A&V Squires terms, terms and conditions, service agreement",
  url: "/terms",
  type: "website",
});

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
