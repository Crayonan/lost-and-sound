'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useT } from '@/hooks/useT'
import { Ticket, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NAV_LINKS } from '@/config/navLinks'
import { useParams } from 'next/navigation'
import { LocaleSwitcher } from '@/components/common/LocaleSwitcher'

const HEADER_HEIGHT_PX = 200

export default function HeaderClient() {
  const t = useT()
  const { locale } = useParams()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const localizedLinks = NAV_LINKS.map(link => ({
    ...link,
    url: `/${locale}/${link.slug}`,
  }))

  return (
    <>
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <div className="bg-black/90 backdrop-blur-md border border-purple-900/30 rounded-full px-6 py-3 flex justify-between items-center shadow-lg shadow-purple-900/20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <h1 className="text-sm sm:text-lg font-light italic text-white whitespace-nowrap">
              LOST&SOUND
            </h1>
            <span className="hidden sm:block text-[0.5rem] sm:text-xs uppercase tracking-widest text-purple-300/70 whitespace-nowrap">
              {t.header.tagline}
            </span>
          </Link>

          {/* Right side with locale switcher and hamburger */}
          <div className="flex items-center gap-3">
            <LocaleSwitcher />

            <button
              onClick={() => setMobileMenuOpen(o => !o)}
              className="relative z-50 text-white p-2 rounded-full hover:bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-40"
          style={{
            paddingTop: `${HEADER_HEIGHT_PX + 16}px`, // Account for header height + top margin
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="container mx-auto px-4 py-8 h-full overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <nav className="flex flex-col items-center space-y-8 text-center">
              {localizedLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.url}
                  className="text-white hover:text-purple-400 transition-colors text-2xl font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <Button asChild className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-full mt-8">
                <Link
                  href="https://tickets.infield.live/event/lost-and-sound-2025-nrzehh"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Ticket className="mr-2 h-5 w-5" />
                  {t.header.getTickets}
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}