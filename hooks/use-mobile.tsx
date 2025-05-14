"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [isSmallMobile, setIsSmallMobile] = useState(false)
  const [isMediumMobile, setIsMediumMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768)
      setIsSmallMobile(window.innerWidth < 375)
      setIsMediumMobile(window.innerWidth < 425 && window.innerWidth >= 375)
      setIsTablet(window.innerWidth < 1024 && window.innerWidth >= 768)
    }

    window.addEventListener("resize", handleResize)

    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, []) 

  return { isMobile, isSmallMobile, isMediumMobile, isTablet }
}
