// components/GalleryFrame.client.tsx
"use client"; // Add this

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FrameItem } from "./FrameItem"; // Assuming FrameItem is also client-side
import { useMobile } from "@/hooks/use-mobile";

interface FrameData { // Define a type for the frame items
  id: number | string;
  image: string;
  defaultPos: { x: number; y: number; w: number; h: number };
  mediaSize: number;
  borderThickness: number;
  borderSize: number;
  isHovered: boolean; // This will be managed internally now
  label: string;
}

interface GalleryFrameProps {
  initialFrames: FrameData[];
}

export default function GalleryFrame({ initialFrames }: GalleryFrameProps) {
  const [frames, setFrames] = useState<FrameData[]>(initialFrames.map(f => ({...f, isHovered: false})));
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);
  const [hoverSize] = useState(6);
  const [gapSize] = useState(8);
  const { isMobile } = useMobile();

  const showFrames = isMobile; // Frames are always "expanded" on mobile in this context

  useEffect(() => {
    if (isMobile && hoveredCell !== null) {
      setHoveredCell(null); // Disable hover effect logic on mobile
    }
  }, [isMobile, hoveredCell]);

  useEffect(() => {
    // Update internal frames if initialFrames prop changes
    setFrames(initialFrames.map(f => ({...f, isHovered: false})));
  }, [initialFrames]);

  const getRowSizes = () => {
    if (hoveredCell === null || isMobile) {
      return "1fr 1fr 1fr";
    }
    const { row } = hoveredCell;
    const nonHoveredSize = (12 - hoverSize) / 2;
    return [0, 1, 2].map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ");
  };

  const getColSizes = () => {
    if (hoveredCell === null || isMobile) {
      return "1fr 1fr 1fr";
    }
    const { col } = hoveredCell;
    const nonHoveredSize = (12 - hoverSize) / 2;
    return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ");
  };

  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : y === 4 ? "center" : "bottom";
    const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right";
    return `${vertical} ${horizontal}`;
  };

  const handleMouseEnter = (rowIndex: number, colIndex: number) => {
    if (!isMobile) {
      setHoveredCell({ row: rowIndex, col: colIndex });
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setHoveredCell(null);
    }
  };

  if (!frames || frames.length === 0) {
    return <div className="flex items-center justify-center h-full"><p>No gallery images to display.</p></div>;
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
          const rowIndex = Math.floor(frame.defaultPos.y / 4);
          const colIndex = Math.floor(frame.defaultPos.x / 4);
          const transformOrigin = getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y);
          const isCurrentlyHovered = !isMobile && hoveredCell?.row === rowIndex && hoveredCell?.col === colIndex;

          const MotionDivOrDiv = isMobile ? 'div' : motion.div;

          return (
            <MotionDivOrDiv
              key={frame.id}
              className="relative"
              style={{
                transformOrigin,
                transition: isMobile ? "none" : "transform 0.4s ease",
              }}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              onMouseLeave={handleMouseLeave}
            >
              <FrameItem
                image={frame.image}
                width="100%"
                height="100%"
                className="absolute inset-0"
                mediaSize={frame.mediaSize} // This prop seems unused in FrameItem, remove if not needed
                // onMediaSizeChange={() => {}} // Placeholder, remove if not needed
                showControls={false} // Assuming no controls needed for gallery items
                label={frame.label}
                showFrame={showFrames}
                isHovered={isCurrentlyHovered || isMobile} // Always show label on mobile if isHovered logic is for desktop
                isMobile={isMobile}
              />
            </MotionDivOrDiv>
          );
        })}
      </div>
    </div>
  );
}