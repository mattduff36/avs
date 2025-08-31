import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import MachinesForSaleSection from "@/components/sections/MachinesForSaleSection";
import { generateSEO, getOrganizationStructuredData, getWebsiteStructuredData } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateSEO({
  title: "Home",
  description: "Leading civil engineering and plant hire company in Nottinghamshire. Over 50 years of experience providing professional construction services, earthmoving, and specialized transport solutions across the UK.",
  keywords: "civil engineering Nottinghamshire, plant hire, construction services, earthmoving, transport solutions, A&V Squires",
  url: "/",
  type: "website",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MachinesForSaleSection />
      <ServicesSection />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getOrganizationStructuredData() + "\n" + getWebsiteStructuredData(),
        }}
      />
    </>
  );
}



