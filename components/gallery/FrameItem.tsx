// FrameItem.tsx
"use client";
import Image from "next/image";
import { useState } from "react"; // Removed useEffect as it wasn't used
import { cn } from "@/lib/utils";

interface FrameItemProps {
  image: string;
  width: number | string;
  height: number | string;
  className?: string;
  // mediaSize: number; // This prop was in your original but not used in this component's JSX
  // showControls: boolean; // Same as above
  label: string; // This is intended to be the alt text from Media.alt
  // showFrame: boolean; // Same as above
  isHovered: boolean;
  isMobile?: boolean;
}

export function FrameItem({
  image,
  width,
  height,
  className = "",
  label, // This is PayloadMedia.alt (or its fallback from server mapping)
  isHovered,
  isMobile = false,
}: FrameItemProps) {
  const [showLabelState, setShowLabelState] = useState(false);
  
  // Determine if the label overlay should be visible
  const shouldShowLabelOverlay = isMobile || isHovered || showLabelState;

  // Ensure the alt prop for the Image component is never an empty string.
  // The `label` prop already contains the descriptive text (PayloadMedia.alt or a fallback).
  // If `label` could still somehow be empty here despite server-side checks, provide a final generic fallback.
  const imageAltText = (label && label.trim() !== "") ? label : "Gallery image view";

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
      <div className="relative w-full h-full overflow-hidden rounded-lg group"> {/* Added group for potential future use */}
        <Image
          src={image || "/placeholder.svg"}
          alt={imageAltText} // Use the ensured non-empty alt text
          fill
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" // Example hover effect
          priority={true} // Consider if all gallery images truly need priority loading. Maybe only first few.
        />
        {shouldShowLabelOverlay && (
          <div className={cn(
            "absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10", // Adjusted gradient
            "transition-opacity duration-300",
            // Show opacity based on hover/mobile, not showLabelState directly if it causes flicker
            isHovered || isMobile ? "opacity-100" : "opacity-0"
          )}>
            {/* Display the original label (which is Media.alt) as the visible caption */}
            <div className="text-white font-bold text-center text-xs sm:text-sm md:text-base break-words">
              {label}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}