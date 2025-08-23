"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { ImageSkeleton } from "./image-skeleton";
import { AlertTriangle } from "lucide-react";

interface ImageWithErrorHandlingProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  showSkeleton?: boolean;
  errorMessage?: string;
}

export function ImageWithErrorHandling({
  src,
  alt,
  fallbackSrc = "/images/placeholder-image.jpg",
  showSkeleton = true,
  errorMessage = "Image failed to load",
  className,
  ...props
}: ImageWithErrorHandlingProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-slate-100 rounded-lg ${className}`}>
        <div className="text-center p-4">
          <AlertTriangle className="h-8 w-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-500">{errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {showSkeleton && isLoading && (
        <ImageSkeleton className="absolute inset-0 z-10" />
      )}
      <Image
        {...props}
        src={currentSrc}
        alt={alt}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
