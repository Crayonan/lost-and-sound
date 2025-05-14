// components/ArtistBar.client.tsx
"use client" // Add this
import { motion } from "framer-motion"
import React from "react"

interface ArtistBarProps {
  items: string[]
}

export function ArtistBar({ items }: ArtistBarProps) { // Changed to named export for consistency
  const marqueeVariants = {
    animate: {
      x: [0, -1000], // Adjust based on content width for smoother loop
      transition: {
        x: {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          duration: 20, // Adjust duration as needed
          ease: "linear",
        },
      },
    },
  }

  // Duplicate the items to create a seamless loop effect
  const allItems = items.length > 0 ? [...items, ...items] : [];


  if (items.length === 0) {
    return null; // Don't render if no items
  }

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div className="inline-block" variants={marqueeVariants} animate="animate">
        {allItems.map((item, index) => (
          <React.Fragment key={index}>
            <span className="inline-block mx-2 xs:mx-3 sm:mx-6 text-black text-xs xs:text-sm sm:text-base font-bold">
              {item}
            </span>
            {index !== allItems.length - 1 && (
              <span className="inline-block text-black mx-1 sm:mx-2 align-middle relative top-[-2px]">•</span>
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}