import { generateSEO } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateSEO({
  title: "Our Projects",
  description: "Showcase of successful civil engineering projects including major infrastructure developments, car park installations, and specialized construction works. View our portfolio of completed projects across the UK.",
  keywords: "civil engineering projects, infrastructure projects, construction portfolio, completed projects, car park installations, specialized construction works",
  url: "/projects",
  type: "website",
});

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
