"use client"
import { useState } from "react"

interface FrameItemProps {
  image: string // Changed from video to image
  width: number | string
  height: number | string
  className?: string
  mediaSize: number
  onMediaSizeChange: (value: number) => void
  showControls: boolean
  label: string
  showFrame: boolean
  isHovered: boolean
  isMobile?: boolean
}

export function FrameItem({
  image,
  width,
  height,
  className = "",
  mediaSize,
  label,
  showFrame,
  isHovered,
  isMobile = false,
}: FrameItemProps) {
  const [showLabel, setShowLabel] = useState(false)

  return (
    <div
      className={`relative ${className}`}
      style={{
        width,
        height,
        transition: isMobile ? "none" : "width 0.3s ease-in-out, height 0.3s ease-in-out",
      }}
      onMouseEnter={() => !isMobile && setShowLabel(true)}
      onMouseLeave={() => !isMobile && setShowLabel(false)}
      onTouchStart={() => !isMobile && setShowLabel(true)}
      onTouchEnd={() => !isMobile && setTimeout(() => setShowLabel(false), 1000)}
    >
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        {/* Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-full h-full overflow-hidden rounded-lg"
            style={{
              transform: isMobile ? "none" : `scale(${mediaSize})`,
              transformOrigin: "center",
              transition: isMobile ? "none" : "transform 0.3s ease-in-out",
            }}
          >
            <img src={image || "/placeholder.svg"} alt={label} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Label - always visible on mobile */}
        {(showLabel || isHovered || isMobile) && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent z-10">
            <div className="text-white font-bold text-center text-sm sm:text-base">{label}</div>
          </div>
        )}
      </div>
    </div>
  )
}
