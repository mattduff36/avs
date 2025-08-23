import { generateSEO } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateSEO({
  title: "Contact Us",
  description: "Get in touch with A&V Squires for professional civil engineering and plant hire services. Contact our expert team for quotes, project discussions, and specialized construction solutions in Nottinghamshire.",
  keywords: "contact A&V Squires, civil engineering contact, plant hire contact, construction services contact, Nottinghamshire",
  url: "/contact",
  type: "website",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
