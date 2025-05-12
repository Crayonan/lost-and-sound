"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FrameItem } from "./FrameItem"
import { useMobile } from "@/hooks/use-mobile"

interface Frame {
  id: number
  image: string
  defaultPos: { x: number; y: number; w: number; h: number }
  mediaSize: number
  borderThickness: number
  borderSize: number
  isHovered: boolean
  label: string
}

const initialFrames: Frame[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
    label: "Main Stage",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
    label: "Sunset Stage",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2070&auto=format&fit=crop",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
    label: "Forest Stage",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop",
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
    label: "Crowd Moments",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
    label: "Light Show",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?q=80&w=2069&auto=format&fit=crop",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
    label: "DJ Sets",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2074&auto=format&fit=crop",
    defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
    label: "Camping Area",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=2070&auto=format&fit=crop",
    defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
    label: "Food Village",
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop",
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
    label: "Art Installations",
  },
]

export default function GalleryFrame() {
  const [frames, setFrames] = useState<Frame[]>(initialFrames)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)
  const [hoverSize] = useState(6)
  const [gapSize] = useState(8) // Increased gap size
  const { isMobile } = useMobile()

  // Always show frames is false for desktop, but true for mobile
  const showFrames = isMobile

  // Disable hover effects on mobile
  useEffect(() => {
    if (isMobile && hovered !== null) {
      setHovered(null)
    }
  }, [isMobile])

  const getRowSizes = () => {
    if (hovered === null || isMobile) {
      return "1fr 1fr 1fr"
    }
    const { row } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getColSizes = () => {
    if (hovered === null || isMobile) {
      return "1fr 1fr 1fr"
    }
    const { col } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : y === 4 ? "center" : "bottom"
    const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right"
    return `${vertical} ${horizontal}`
  }

  const updateFrameProperty = (id: number, property: keyof Frame, value: number) => {
    setFrames(frames.map((frame) => (frame.id === id ? { ...frame, [property]: value } : frame)))
  }

  return (
    <div className="space-y-4 w-full h-full">
      <div
        className="relative w-full h-full"
        style={{
          display: "grid",
          gridTemplateRows: getRowSizes(),
          gridTemplateColumns: getColSizes(),
          gap: `${gapSize}px`,
          transition: isMobile ? "none" : "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
        }}
      >
        {frames.map((frame) => {
          const row = Math.floor(frame.defaultPos.y / 4)
          const col = Math.floor(frame.defaultPos.x / 4)
          const transformOrigin = getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y)

          const Component = isMobile ? "div" : motion.div

          return (
            <Component
              key={frame.id}
              className="relative"
              style={{
                transformOrigin,
                transition: isMobile ? "none" : "transform 0.4s ease",
              }}
              onMouseEnter={() => !isMobile && setHovered({ row, col })}
              onMouseLeave={() => !isMobile && setHovered(null)}
              // Disable touch events on mobile since we're showing labels permanently
              onTouchStart={() => {}}
              onTouchEnd={() => {}}
            >
              <FrameItem
                image={frame.image}
                width="100%"
                height="100%"
                className="absolute inset-0"
                mediaSize={frame.mediaSize}
                onMediaSizeChange={(value) => updateFrameProperty(frame.id, "mediaSize", value)}
                showControls={false}
                label={frame.label}
                showFrame={showFrames}
                isHovered={
                  isMobile ||
                  (hovered?.row === Math.floor(frame.defaultPos.y / 4) &&
                    hovered?.col === Math.floor(frame.defaultPos.x / 4))
                }
                isMobile={isMobile}
              />
            </Component>
          )
        })}
      </div>
    </div>
  )
}
