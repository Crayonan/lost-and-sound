"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useT } from "@/hooks/useT";
import { Ticket, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/config/navLinks";
import { useParams } from "next/navigation";
import { LocaleSwitcher } from "@/components/common/LocaleSwitcher";

const HEADER_HEIGHT_PX = 73;

export function MobileNav() {
  const t = useT();
  const { locale } = useParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const localizedLinks = NAV_LINKS.map(link => ({
    ...link,
    url: `/${locale}/${link.slug}`,
  }));

  return (
    <>
      <div className="flex items-center justify-between w-full px-2 lg:hidden">
        <LocaleSwitcher />
        <button
          onClick={() => setMobileMenuOpen((o) => !o)}
          className="relative z-50 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-menu-panel"
          className="fixed inset-x-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
          style={{
            top: `${HEADER_HEIGHT_PX}px`,
            height: `calc(100vh - ${HEADER_HEIGHT_PX}px)`,
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="container mx-auto px-4 py-8 h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col space-y-6">
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

              <Button asChild className="bg-purple-600 hover:bg-purple-500 text-white w-full mt-8">
                <Link
                  href="https://tickets.infield.live/event/lost-and-sound-2025-nrzehh"
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
  );
}
