"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slideshowImages[currentImageIndex]}
            alt={`Hero slideshow image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            priority={currentImageIndex === 0}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
