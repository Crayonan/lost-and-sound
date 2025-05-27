'use client'
import { motion } from 'framer-motion'
import React from 'react'

interface ArtistBarProps {
  items: string[]
}

export function ArtistBar({ items }: ArtistBarProps) {
  const marqueeVariants = {
    animate: {
      x: [0, -1000],
      transition: {
        x: {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'loop',
          duration: 20,
          ease: 'linear',
        },
      },
    },
  }

  const allItems = items.length > 0 ? [...items, ...items] : []

  if (items.length === 0) {
    return null
  }

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div className="inline-block" variants={marqueeVariants} animate="animate">
        {allItems.map((item, index) => (
          <React.Fragment key={index}>
            <span className="inline-block mx-2 xs:mx-3 sm:mx-6 text-black xs:text-sm sm:text-base font-bold">
              {item}
            </span>
            {index !== allItems.length - 1 && (
              <span className="inline-block text-black mx-1 sm:mx-2 align-middle relative top-[-2px]">
                •
              </span>
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}
