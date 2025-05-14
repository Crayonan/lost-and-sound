import Link from "next/link";
import { Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./MobileNav";
import { getHeaderData } from "@/lib/payloadAPI";
import type { Header as HeaderType, HeaderNavItemLink } from "@/types/payload-types";

export default async function Header() {
  // Fetch only nav items from Payload
  const headerData: HeaderType | null = await getHeaderData();
  const navItems = headerData?.navItems ?? [];

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-purple-900/30">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center h-[73px]">
        {/* Static logo/text */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <h1 className="text-2xl sm:text-3xl font-light italic text-white whitespace-nowrap">
            LOST&SOUND
          </h1>
          <span className="text-[0.6rem] sm:text-xs uppercase tracking-widest text-purple-300/70 mt-1 whitespace-nowrap">
            Festival 2025
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, idx) => {
            const link: HeaderNavItemLink = item.link;
            // Determine href: use reference slug for internal links, fallback to url
            let href = "#";
            if (link.type === "reference" && link.reference && typeof link.reference === "object") {
              href = link.reference.slug || href;
            } else if (link.url) {
              href = link.url;
            }
            const openTab = link.newTab;

            return (
              <Link
                key={item.id ?? idx}
                href={href}
                {...(openTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-white hover:text-purple-400 transition-colors"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions and mobile menu */}
        <div className="flex items-center gap-4">
          <Button className="bg-purple-600 hover:bg-purple-500 text-white hidden sm:flex">
            <Ticket className="mr-2 h-4 w-4" />
            Get Tickets
          </Button>
          <MobileNav navItems={navItems} />
        </div>
      </div>
    </header>
  );
}