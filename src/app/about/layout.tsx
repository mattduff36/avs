import { generateSEO } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateSEO({
  title: "About Us",
  description: "Learn about A&V Squires Plant Co Limited - over 50 years of experience in civil engineering and plant hire. Discover our history, expertise, and commitment to delivering high-quality construction services.",
  keywords: "about A&V Squires, company history, civil engineering expertise, plant hire experience, construction company Nottinghamshire",
  url: "/about",
  type: "website",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
