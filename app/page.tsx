"use client"

import { useState } from "react"
import GalleryFrame from "../components/GalleryFrame"
import { ppEditorialNewUltralightItalic } from "./fonts"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Ticket, Menu, X, ChevronDown, ChevronUp } from "lucide-react"
import ArtistBar from "@/components/ArtistBar"
import InfoSection from "@/components/InfoSection"
import { useMobile } from "@/hooks/use-mobile"

export default function Home() {
  const [headerSize] = useState(1.2)
  const [textSize] = useState(0.8)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedFooterSection, setExpandedFooterSection] = useState<string | null>(null)
  const { isMobile } = useMobile()

  const toggleFooterSection = (section: string) => {
    if (expandedFooterSection === section) {
      setExpandedFooterSection(null)
    } else {
      setExpandedFooterSection(section)
    }
  }

  const artists = [
    "SONIC REVOLUTION",
    "THE MIDNIGHT ECHO",
    "ELECTRIC PULSE",
    "CRIMSON TIDE",
    "NEON DREAMS",
    "VELVET THUNDER",
    "CRYSTAL SKIES",
    "LUNAR PHASE",
    "ASTRAL PROJECTION",
    "COSMIC DRIFT",
    "EMERALD ECHO",
    "WOODLAND WHISPERS",
    "MYSTIC ROOTS",
    "ANCIENT RHYTHMS",
    "WILD HARMONY",
  ]
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header and Navigation */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-purple-900/30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className={`${ppEditorialNewUltralightItalic.className} text-3xl font-light italic text-white`}>
              LOST&SOUND
            </h1>
            <span className="text-xs uppercase tracking-widest text-purple-300/70 mt-2">Festival 2025</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#lineup" className="text-white hover:text-purple-400 transition-colors">
              Lineup
            </Link>
            <Link href="#schedule" className="text-white hover:text-purple-400 transition-colors">
              Schedule
            </Link>
            <Link href="#venue" className="text-white hover:text-purple-400 transition-colors">
              Venue
            </Link>
            <Link href="#gallery" className="text-white hover:text-purple-400 transition-colors">
              Gallery
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button className="bg-purple-600 hover:bg-purple-500 text-white hidden sm:flex">
              <Ticket className="mr-2 h-4 w-4" />
              Get Tickets
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Sub-bar */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-md z-40 transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ top: "64px", height: "calc(100vh - 64px)" }}
      >
        <div className="container mx-auto px-4 py-8">
          <nav className="flex flex-col space-y-6">
            <Link
              href="#lineup"
              className="text-white hover:text-purple-400 transition-colors text-2xl font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Lineup
            </Link>
            <Link
              href="#schedule"
              className="text-white hover:text-purple-400 transition-colors text-2xl font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Schedule
            </Link>
            <Link
              href="#venue"
              className="text-white hover:text-purple-400 transition-colors text-2xl font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Venue
            </Link>
            <Link
              href="#gallery"
              className="text-white hover:text-purple-400 transition-colors text-2xl font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Button
              className="bg-purple-600 hover:bg-purple-500 text-white w-full sm:hidden mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Ticket className="mr-2 h-4 w-4" />
              Get Tickets
            </Button>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10"></div>
        <video
          className="absolute inset-0 w-full h-full object-cover video-focus"
          autoPlay
          loop
          muted
          playsInline
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GeneratedFileMay112025-8_31PM-ezgif.com-reverse-video-b6POMzdd3vuZHVxg6ZKDsoV5peD0iT.mp4"
        ></video>
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-20 relative z-20">
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-none mb-6">
            <span className="hidden sm:inline">Festival.Tanzen.Feier</span>
            <span className="sm:hidden flex flex-col">
              <span>Festival</span>
              <span>Tanzen</span>
              <span>Feier</span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl">
            Experience three days of incredible live performances from the most exciting artists
          </p>
        </div>
      </section>

      {/* Artist Marquee */}
      <div className="bg-neon-green py-3 border-y border-neon-green/30">
        <ArtistBar items={artists} />
      </div>

      {/* Festival Highlights */}
      <section id="gallery" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2
            className={`${ppEditorialNewUltralightItalic.className} text-5xl md:text-6xl font-light italic text-white tracking-tighter mb-12 text-center`}
          >
            Festival Highlights
          </h2>
          <div className="w-full h-[90vh]">
            <GalleryFrame />
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <InfoSection />

      {/* Optimized Footer */}
      <footer className="bg-black py-8 sm:py-10 md:py-12 border-t border-purple-900/30">
        <div className="container mx-auto px-4">
          <div className="md:hidden">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className={`${ppEditorialNewUltralightItalic.className} text-2xl text-white`}>LOST&SOUND</h3>
                <p className="text-xs text-purple-200/70">Festival since 2020</p>
              </div>
              <div className="flex gap-3">
                <Link href="#" className="text-purple-200/70 hover:text-purple-400 transition-colors p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Link>
                <Link href="#" className="text-purple-200/70 hover:text-purple-400 transition-colors p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-purple-200/70 hover:text-purple-400 transition-colors p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="border-t border-purple-900/30 py-3">
              <button
                onClick={() => toggleFooterSection("links")}
                className="w-full flex justify-between items-center py-2"
                aria-expanded={expandedFooterSection === "links"}
              >
                <h4 className="text-purple-400 font-semibold text-sm">Quick Links</h4>
                {expandedFooterSection === "links" ? (
                  <ChevronUp className="h-4 w-4 text-purple-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-purple-400" />
                )}
              </button>
              {expandedFooterSection === "links" && (
                <div className="pt-2 pb-1 grid grid-cols-2 gap-x-2 gap-y-3">
                  <Link href="#" className="text-purple-200/70 hover:text-purple-400 transition-colors text-sm">
                    Lineup
                  </Link>
                  <Link href="#" className="text-purple-200/70 hover:text-purple-400 transition-colors text-sm">
                    Schedule
                  </Link>
                  <Link href="#" className="text-purple-200/70 hover:text-purple-400 transition-colors text-sm">
                    Tickets
                  </Link>
                  <Link href="#" className="text-purple-200/70 hover:text-purple-400 transition-colors text-sm">
                    FAQs
                  </Link>
                </div>
              )}
            </div>

            {/* Contact Section */}
            <div className="border-t border-purple-900/30 py-3">
              <button
                onClick={() => toggleFooterSection("contact")}
                className="w-full flex justify-between items-center py-2"
                aria-expanded={expandedFooterSection === "contact"}
              >
                <h4 className="text-purple-400 font-semibold text-sm">Contact</h4>
                {expandedFooterSection === "contact" ? (
                  <ChevronUp className="h-4 w-4 text-purple-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-purple-400" />
                )}
              </button>
              {expandedFooterSection === "contact" && (
                <div className="pt-2 pb-1 space-y-2">
                  <p className="text-purple-200/70 text-sm">info@lostsound.com</p>
                  <p className="text-purple-200/70 text-sm">+31 1234123456</p>
                  <p className="text-purple-200/70 text-sm">Brodowin, DE</p>
                </div>
              )}
            </div>

            {/* Follow Us Section */}
            <div className="mt-4 pt-4 border-t border-purple-900/30 text-center text-purple-200/50">
              <p className="text-xs">© 2025 LOST & SOUND Festival. All rights reserved.</p>
            </div>
          </div>

          {/* Desktop Footer */}
          <div className="hidden md:block">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className={`${ppEditorialNewUltralightItalic.className} text-2xl text-white mb-4`}>LOST&SOUND</h3>
                <p className="text-purple-200/70">The ultimate music festival experience since 2020.</p>
              </div>
              <div>
                <h4 className="text-purple-400 font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-purple-200/70 hover:text-purple-400 transition-colors">
                      Lineup
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-purple-200/70 hover:text-purple-400 transition-colors">
                      Schedule
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-purple-200/70 hover:text-purple-400 transition-colors">
                      Tickets
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-purple-200/70 hover:text-purple-400 transition-colors">
                      FAQs
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-purple-400 font-semibold mb-4">Contact</h4>
                <ul className="space-y-2">
                  <li className="text-purple-200/70">info@lostsound.com</li>
                  <li className="text-purple-200/70">+31 1234123456</li>
                  <li className="text-purple-200/70">Brodowin, DE</li>
                </ul>
              </div>
              <div>
                <h4 className="text-purple-400 font-semibold mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <Link href="#" className="text-purple-200/70 hover:text-purple-400 transition-colors">
                    Instagram
                  </Link>
                  <Link href="#" className="text-purple-200/70 hover:text-purple-400 transition-colors">
                    Twitter
                  </Link>
                  <Link href="#" className="text-purple-200/70 hover:text-purple-400 transition-colors">
                    Facebook
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-purple-900/30 text-center text-purple-200/50">
              <p>© 2025 LOST & SOUND Festival. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
