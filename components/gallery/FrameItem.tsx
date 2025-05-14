"use client"; 
import Image from "next/image";
import { useState, useEffect } from "react"; 
import { cn } from "@/lib/utils";

interface FrameItemProps {
  image: string;
  width: number | string;
  height: number | string;
  className?: string;
  mediaSize: number;
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
  label,
  isHovered,
  isMobile = false,
}: FrameItemProps) {
  const [showLabelState, setShowLabelState] = useState(false);
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
          fill 
          className="object-cover" 
          priority={true} 
        />
        {shouldShowLabel && (
          <div className={cn(
            "absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-black/80 to-transparent z-10",
            "transition-opacity duration-300",
            isHovered || isMobile ? "opacity-100" : "opacity-0" 
          )}>
            <div className="text-white font-bold text-center text-xs sm:text-sm md:text-base">{label}</div>
          </div>
        )}
      </div>
    </div>
  );
}