import { generateSEO } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateSEO({
  title: "Our Machines",
  description: "Advanced construction machinery and equipment including Komatsu excavators with intelligent machine control, dual view dumpers, loading shovels, and specialized plant hire equipment. Professional machinery solutions.",
  keywords: "construction machinery, Komatsu excavators, intelligent machine control, dual view dumpers, loading shovels, plant hire equipment, construction equipment",
  url: "/machines",
  type: "website",
});

export default function MachinesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
