import { generateSEO } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = generateSEO({
  title: "Privacy Policy",
  description: "Privacy policy for A&V Squires Plant Co Limited. Learn how we collect, use, and protect your personal information when using our services and website.",
  keywords: "privacy policy, A&V Squires privacy, data protection, personal information",
  url: "/privacy",
  type: "website",
});

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
