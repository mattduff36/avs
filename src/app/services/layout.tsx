import { generateSEO } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateSEO({
  title: "Our Services",
  description: "Comprehensive civil engineering and plant hire services including earthmoving, transport, road sweeping, grab hire, and specialized construction solutions. Professional services across Nottinghamshire and the UK.",
  keywords: "civil engineering services, plant hire, earthmoving, transport services, road sweeping, grab hire, construction solutions, Nottinghamshire",
  url: "/services",
  type: "website",
});

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
