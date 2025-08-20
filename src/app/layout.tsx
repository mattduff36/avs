import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "A&V Squires Plant Company LTD - Civil Engineering & Plant Hire | East Midlands",
  description: "Leading civil engineering, plant hire, and contract earthmoving company in the East Midlands. 50+ years of experience providing high-quality construction services nationwide.",
  keywords: "A&V Squires, civil engineering, plant hire, earthmoving, construction, East Midlands, transport, haulage, HIAB hire",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}



