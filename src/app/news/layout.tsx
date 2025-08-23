import { generateSEO } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateSEO({
  title: "News & Updates",
  description: "Stay updated with the latest news, project updates, and company developments from A&V Squires Plant Co Limited. Follow us on Facebook for real-time updates and industry insights.",
  keywords: "A&V Squires news, construction updates, project news, company developments, civil engineering news, Nottinghamshire",
  url: "/news",
  type: "website",
});

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
