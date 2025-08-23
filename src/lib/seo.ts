import { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export interface StructuredDataConfig {
  type: "Organization" | "WebSite" | "Article" | "Service";
  data: Record<string, unknown>;
}

// Base SEO configuration
const BASE_SEO = {
  siteName: "A&V Squires Plant Co Limited",
  siteUrl: "https://avsquires.co.uk",
  defaultImage: "/images/logo-yellow-digger.png",
  defaultDescription: "Professional civil engineering and plant hire services in Nottinghamshire. Over 50 years of experience in construction, earthmoving, and specialized transport.",
  defaultKeywords: "civil engineering, plant hire, construction, Nottinghamshire, earthmoving, transport, A&V Squires",
};

export function generateSEO(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords,
    image,
    url,
    type = "website",
    publishedTime,
    modifiedTime,
    author,
    section,
    tags,
  } = config;

  const fullTitle = `${title} | ${BASE_SEO.siteName}`;
  const fullUrl = url ? `${BASE_SEO.siteUrl}${url}` : BASE_SEO.siteUrl;
  const fullImage = image ? `${BASE_SEO.siteUrl}${image}` : `${BASE_SEO.siteUrl}${BASE_SEO.defaultImage}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords || BASE_SEO.defaultKeywords,
    authors: [{ name: author || BASE_SEO.siteName }],
    creator: BASE_SEO.siteName,
    publisher: BASE_SEO.siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(BASE_SEO.siteUrl),
    alternates: {
      canonical: url || "/",
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: BASE_SEO.siteName,
      locale: "en_GB",
      type,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      ...(section && { section }),
      ...(tags && { tags }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [fullImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };

  return metadata;
}

export function generateStructuredData(config: StructuredDataConfig): string {
  const { type, data } = config;

  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
  };

  const structuredData = {
    ...baseData,
    ...data,
  };

  return JSON.stringify(structuredData);
}

// Predefined structured data for the business
export function getOrganizationStructuredData() {
  return generateStructuredData({
    type: "Organization",
    data: {
      name: "A&V Squires Plant Co Limited",
      url: BASE_SEO.siteUrl,
      logo: `${BASE_SEO.siteUrl}/images/logo-yellow-digger.png`,
      description: BASE_SEO.defaultDescription,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Vivienne House, Racecourse Road",
        addressLocality: "Southwell",
        addressRegion: "Nottinghamshire",
        postalCode: "NG25 0TX",
        addressCountry: "GB",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+44-1636-812227",
        contactType: "customer service",
        email: "info@avsquires.co.uk",
      },
      sameAs: [
        "https://www.facebook.com/p/A-V-Squires-Plant-Co-Limited-100063551614762/",
      ],
      foundingDate: "1974",
      numberOfEmployees: "75+",
      areaServed: "United Kingdom",
      serviceArea: {
        "@type": "Country",
        name: "United Kingdom",
      },
    },
  });
}

export function getWebsiteStructuredData() {
  return generateStructuredData({
    type: "WebSite",
    data: {
      name: BASE_SEO.siteName,
      url: BASE_SEO.siteUrl,
      description: BASE_SEO.defaultDescription,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_SEO.siteUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  });
}

export function getServiceStructuredData(serviceName: string, serviceDescription: string) {
  return generateStructuredData({
    type: "Service",
    data: {
      name: serviceName,
      description: serviceDescription,
      provider: {
        "@type": "Organization",
        name: BASE_SEO.siteName,
      },
      areaServed: {
        "@type": "Country",
        name: "United Kingdom",
      },
      serviceType: "Civil Engineering and Plant Hire",
    },
  });
}

// Utility function to combine multiple structured data
export function combineStructuredData(...dataStrings: string[]): string {
  return dataStrings.join("\n");
}
