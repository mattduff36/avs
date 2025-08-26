"use client";

import { useIntro } from "./IntroScreen";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutContentProps {
  children: React.ReactNode;
}

export function LayoutContent({ children }: LayoutContentProps) {
  const { isIntroComplete } = useIntro();

  // Don't render main content until intro is complete
  if (!isIntroComplete) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24">
        {children}
      </main>
      <Footer />
    </>
  );
}
