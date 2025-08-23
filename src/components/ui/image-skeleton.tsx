import { cn } from "@/lib/utils";

interface ImageSkeletonProps {
  className?: string;
  aspectRatio?: "square" | "video" | "wide" | "tall";
  animate?: boolean;
}

const aspectRatioClasses = {
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[16/9]",
  tall: "aspect-[3/4]",
};

export function ImageSkeleton({ 
  className, 
  aspectRatio = "square",
  animate = true 
}: ImageSkeletonProps) {
  return (
    <div
      className={cn(
        "bg-slate-200 rounded-lg overflow-hidden",
        aspectRatioClasses[aspectRatio],
        animate && "animate-pulse",
        className
      )}
      role="status"
      aria-label="Loading image"
    >
      <div className="w-full h-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-200" />
      <span className="sr-only">Loading image...</span>
    </div>
  );
}
