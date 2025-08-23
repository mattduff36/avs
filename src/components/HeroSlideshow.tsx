"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slideshowImages = [
  "/images/hero-slideshow/1.jpg",
  "/images/hero-slideshow/2.jpg",
  "/images/hero-slideshow/3.jpg",
  "/images/hero-slideshow/4.jpg",
  "/images/hero-slideshow/5.jpg",
  "/images/hero-slideshow/6.jpg",
  "/images/hero-slideshow/7.jpg",
  "/images/hero-slideshow/8.jpg",
  "/images/hero-slideshow/9.jpg",
];

export function HeroSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === slideshowImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {slideshowImages.map((imageSrc, index) => {
        // Alternate tilt direction based on image index
        const tiltDirection = index % 2 === 0 ? 'rotate-1' : '-rotate-1';
        
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={imageSrc}
              alt={`Hero slideshow image ${index + 1}`}
              fill
              className={`object-cover transition-transform duration-[1500ms] ease-in-out ${
                index === currentImageIndex ? tiltDirection : 'rotate-0'
              }`}
              priority={index === 0}
            />
          </div>
        );
      })}
    </div>
  );
}
