"use client";

import { useState, useEffect, createContext, useContext } from "react";
import Image from "next/image";

// Create context to share intro state
const IntroContext = createContext({ isIntroComplete: true });

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  useEffect(() => {
    // Check if intro has been shown this session
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    
    if (hasSeenIntro) {
      // Intro already shown, allow content to load immediately
      setIsIntroComplete(true);
      return;
    }

    // Start loading content after intro completely finishes (after 1.75 seconds)
    // Fade in (500ms) + show (750ms) + fade out (500ms) = 1750ms, then start content loading
    const timer = setTimeout(() => {
      setIsIntroComplete(true);
    }, 1750); // Start loading after intro is completely done

    return () => clearTimeout(timer);
  }, []);

  return (
    <IntroContext.Provider value={{ isIntroComplete }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}

export function IntroScreen() {
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { isIntroComplete } = useIntro();

  useEffect(() => {
    // Check if intro has been shown this session
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    
    if (hasSeenIntro) {
      // Don't show intro at all
      return;
    }

    // Start the intro animation
    setIsAnimating(true);
    
    // Fade in logo after a brief moment
    const fadeInTimer = setTimeout(() => {
      setLogoOpacity(1);
    }, 100);

    // After showing logo, fade it out but keep white overlay
    const logoFadeOutTimer = setTimeout(() => {
      setLogoOpacity(0);
      sessionStorage.setItem("hasSeenIntro", "true");
    }, 1250); // Show logo for 1.15 seconds total

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(logoFadeOutTimer);
    };
  }, []);

  // Remove the intro overlay only after content is loaded
  useEffect(() => {
    if (isIntroComplete && logoOpacity === 0) {
      const finalFadeTimer = setTimeout(() => {
        setIsAnimating(false);
      }, 300); // Small delay to ensure smooth transition
      
      return () => clearTimeout(finalFadeTimer);
    }
  }, [isIntroComplete, logoOpacity]);

  if (!isAnimating) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        opacity: isIntroComplete && logoOpacity === 0 ? 0 : 1,
        transition: 'opacity 500ms ease-in-out',
        pointerEvents: 'auto',
        zIndex: 9999
      }}
    >
      <Image
        src="/images/intro_logo_HQ.png"
        alt="A&V Squires Logo"
        width={300}
        height={300}
        style={{ 
          height: 'auto', 
          objectFit: 'contain',
          display: 'block',
          opacity: logoOpacity,
          transition: 'opacity 500ms ease-in-out'
        }}
        priority
      />
    </div>
  );
}