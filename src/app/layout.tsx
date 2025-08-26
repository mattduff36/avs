import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { IntroScreen, IntroProvider } from "@/components/IntroScreen";
import { LayoutContent } from "@/components/LayoutContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "A&V Squires Plant Co Limited - Civil Engineering & Plant Hire",
  description: "Professional civil engineering and plant hire services in Nottinghamshire. Over 50 years of experience in construction, earthmoving, and specialized transport.",
  keywords: "civil engineering, plant hire, construction, Nottinghamshire, earthmoving, transport",
  authors: [{ name: "A&V Squires Plant Co Limited" }],
  creator: "A&V Squires Plant Co Limited",
  publisher: "A&V Squires Plant Co Limited",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://avsquires.co.uk"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "A&V Squires Plant Co Limited - Civil Engineering & Plant Hire",
    description: "Professional civil engineering and plant hire services in Nottinghamshire. Over 50 years of experience in construction, earthmoving, and specialized transport.",
    url: "https://avsquires.co.uk",
    siteName: "A&V Squires Plant Co Limited",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A&V Squires Plant Co Limited - Civil Engineering & Plant Hire",
    description: "Professional civil engineering and plant hire services in Nottinghamshire. Over 50 years of experience in construction, earthmoving, and specialized transport.",
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
  icons: {
    icon: [
      { url: "/images/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/images/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/images/favicon/safari-pinned-tab.svg", color: "#F1D64A" },
    ],
  },
  manifest: "/images/favicon/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F1D64A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={inter.className}>
        <ErrorBoundary>
          <IntroProvider>
            <LayoutContent>{children}</LayoutContent>
            <Analytics />
            <IntroScreen />
          </IntroProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}



