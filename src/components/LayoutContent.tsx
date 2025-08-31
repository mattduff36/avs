"use client";

import { usePathname } from "next/navigation";
import { useIntro } from "./IntroScreen";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutContentProps {
  children: React.ReactNode;
}

export function LayoutContent({ children }: LayoutContentProps) {
  const { isIntroComplete } = useIntro();
  const pathname = usePathname();

  // Don't render main content until intro is complete
  if (!isIntroComplete) {
    return null;
  }

  // Check if we're on an admin page (excluding login)
  const isAdminPage = pathname?.startsWith('/admin') && pathname !== '/admin/login';

  return (
    <>
      {!isAdminPage && <Header />}
      <main className={isAdminPage ? "min-h-screen" : "min-h-screen pt-24"}>
        {children}
      </main>
      {!isAdminPage && <Footer />}
    </>
  );
}
