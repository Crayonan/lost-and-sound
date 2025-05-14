// components/FrameItem.client.tsx
"use client"; // Add this
import Image from "next/image"; // Use Next.js Image
import { useState, useEffect } from "react"; // Removed unused onMediaSizeChange
import { cn } from "@/lib/utils";

interface FrameItemProps {
  image: string;
  width: number | string;
  height: number | string;
  className?: string;
  mediaSize: number; // This prop seems unused now, consider removing
  // onMediaSizeChange: (value: number) => void; // This prop seems unused now
  showControls: boolean;
  label: string;
  showFrame: boolean;
  isHovered: boolean;
  isMobile?: boolean;
}

export function FrameItem({
  image,
  width,
  height,
  className = "",
  // mediaSize, // This prop seems unused now
  label,
  // showFrame, // This prop seems unused now
  isHovered,
  isMobile = false,
}: FrameItemProps) {
  // Internal state for hover might not be needed if parent (GalleryFrame) controls visibility logic
  const [showLabelState, setShowLabelState] = useState(false);

  // If isMobile is true, or parent indicates it's hovered, show the label.
  const shouldShowLabel = isMobile || isHovered || showLabelState;

  return (
    <div
      className={`relative ${className}`}
      style={{
        width,
        height,
        transition: isMobile ? "none" : "width 0.3s ease-in-out, height 0.3s ease-in-out",
      }}
      onMouseEnter={() => !isMobile && setShowLabelState(true)}
      onMouseLeave={() => !isMobile && setShowLabelState(false)}
    >
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        <Image 
          src={image || "/placeholder.svg"} 
          alt={label} 
          fill // Use fill for responsive images within a sized container
          className="object-cover" 
          priority={true} // Consider making this conditional based on props
        />
        {shouldShowLabel && (
          <div className={cn(
            "absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-black/80 to-transparent z-10",
            "transition-opacity duration-300",
            isHovered || isMobile ? "opacity-100" : "opacity-0" // Control opacity based on hover/mobile
          )}>
            <div className="text-white font-bold text-center text-xs sm:text-sm md:text-base">{label}</div>
          </div>
        )}
      </div>
    </div>
  );
}