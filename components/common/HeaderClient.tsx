'use client'

import Link from 'next/link'
import { useT } from '@/hooks/useT'
import { Ticket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MobileNav } from './MobileNav'
import { NAV_LINKS } from '@/config/navLinks'
import { LocaleSwitcher } from '@/components/common/LocaleSwitcher'
import { useParams } from 'next/navigation'

export default function HeaderClient() {
  const t = useT()
  const { locale } = useParams()

  const localizedLinks = NAV_LINKS.map(link => ({
    ...link,
    url: `/${locale}/${link.slug}`,
  }))

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-purple-900/30">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center h-[73px]">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <h1 className="text-lg sm:text-3xl font-light italic text-white whitespace-nowrap">
            LOST&
            <br></br>
            SOUND
          </h1>
          <span className="text-[0.6rem] sm:text-xs uppercase tracking-widest text-purple-300/70 mt-1 whitespace-nowrap">
            {t.header.tagline}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {localizedLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.url}
              className="text-white hover:text-purple-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-1 items-center">
          <a
            className="hidden lg:flex"
            href="https://tickets.infield.live/event/lost-and-sound-2025-nrzehh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-purple-600 hover:bg-purple-500 text-white">
              <Ticket className="mr-2 h-4 w-4" />
              {t.header.getTickets}
            </Button>
          </a>

          <div className="hidden lg:block">
            <LocaleSwitcher />
          </div>

          <MobileNav />
        </div>
      </div>
    </header>
  )
}
