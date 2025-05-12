"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [isSmallMobile, setIsSmallMobile] = useState(false)
  const [isMediumMobile, setIsMediumMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set mobile state (< 768px)
      setIsMobile(window.innerWidth < 768)

      // Set small mobile state (< 375px)
      setIsSmallMobile(window.innerWidth < 375)

      // Set medium mobile state (< 425px)
      setIsMediumMobile(window.innerWidth < 425 && window.innerWidth >= 375)

      // Set tablet state (< 1024px and >= 768px)
      setIsTablet(window.innerWidth < 1024 && window.innerWidth >= 768)
    }

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, []) // Empty array ensures effect runs only on mount and unmount

  return { isMobile, isSmallMobile, isMediumMobile, isTablet }
}
