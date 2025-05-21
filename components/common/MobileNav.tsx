"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useT } from "@/hooks/useT";
import { Ticket, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeaderNavItemLink } from "@/types/payload-types";

interface MobileNavProps {
  navItems?: { id?: string | null; link: HeaderNavItemLink }[];
}

const HEADER_HEIGHT_PX = 73;

export function MobileNav({ navItems = [] }: MobileNavProps) {
  const t = useT();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Hamburger toggle */}
      <button
        onClick={() => setMobileMenuOpen((o) => !o)}
        className="relative z-50 md:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
        aria-label="Toggle mobile menu"
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Slide-down panel: only render when open */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-panel"
          className="fixed inset-x-0 bg-black/80 backdrop-blur-md z-40 md:hidden"
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
              {navItems.map((item, idx) => {
                const link = item.link;
                let href = "#";

                if (link.type === "reference" && link.reference && typeof link.reference === "object") {
                  href = link.reference.slug || href;
                } else if (link.url) {
                  href = link.url;
                }

                return (
                  <Link
                    key={item.id ?? idx}
                    href={href}
                    {...(link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-white hover:text-purple-400 transition-colors text-2xl font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Tickets CTA */}
              <Button asChild className="bg-purple-600 hover:bg-purple-500 text-white w-full mt-8">
                <Link href="https://tickets.infield.live/event/lost-and-sound-2025-nrzehh" onClick={() => setMobileMenuOpen(false)}>
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
