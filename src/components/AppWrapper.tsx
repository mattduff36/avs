"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { IntroAnimation } from "@/components/IntroAnimation";

interface AppWrapperProps {
  children: React.ReactNode;
}

export function AppWrapper({ children }: AppWrapperProps) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Check if intro has been shown before in this session
    const introShown = sessionStorage.getItem("introShown");
    if (introShown) {
      setShowIntro(false);
    }
    console.log("AppWrapper mounted, showIntro:", showIntro);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    // Mark intro as shown for this session
    sessionStorage.setItem("introShown", "true");
  };

  return (
    <>
      {/* Always render the main content first - it loads behind the intro */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header />
        <main className="min-h-screen pt-24">
          {children}
        </main>
        <Footer />
        <Analytics />
      </div>
      
      {/* Intro animation overlays on top and fades out to reveal content */}
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
    </>
  );
}
