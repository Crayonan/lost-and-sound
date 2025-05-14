"use client";

import Link from "next/link";
import { useT } from "@/hooks/useT";
import { Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./MobileNav";
import type { HeaderNavItemLink } from "@/types/payload-types";

interface HeaderClientProps {
  navItems: { id?: string; link: HeaderNavItemLink }[];
}

export default function HeaderClient({ navItems }: HeaderClientProps) {
  const t = useT();

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-purple-900/30">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center h-[73px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <h1 className="text-2xl sm:text-3xl font-light italic text-white whitespace-nowrap">
            LOST&SOUND
          </h1>
          <span className="text-[0.6rem] sm:text-xs uppercase tracking-widest text-purple-300/70 mt-1 whitespace-nowrap">
            {t.header.tagline}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
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
                className="text-white hover:text-purple-400 transition-colors"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions + mobile */}
        <div className="flex items-center gap-4">
          <Button className="bg-purple-600 hover:bg-purple-500 text-white hidden sm:flex">
            <Ticket className="mr-2 h-4 w-4" />
            {t.header.getTickets}
          </Button>
          <MobileNav navItems={navItems} />
        </div>
      </div>
    </header>
  );
}
