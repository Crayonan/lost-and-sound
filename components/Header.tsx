// components/Header.tsx
import Link from "next/link";
import { Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getHeaderData } from "@/lib/payloadAPI";
import { Header as HeaderType, Media as PayloadMediaType } from "@/payload-types";
import Image from "next/image";
import { MobileNav } from "./MobileNav.client";

export async function Header() {
  const headerData: HeaderType | null = await getHeaderData();

  if (!headerData) {
    return (
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-purple-900/30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="font-pp-editorial text-3xl font-light italic text-white">LOST&SOUND</h1>
            <span className="text-xs uppercase tracking-widest text-purple-300/70 mt-2">Festival 2025</span>
          </div>
          <p>Loading header...</p>
        </div>
      </header>
    );
  }

  const logo = headerData.logo as PayloadMediaType | undefined;

  return (
    <>
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-purple-900/30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            {logo?.url ? (
              <Image src={logo.url} alt={logo.alt || "Lost and Sound Logo"} width={100} height={29} className="h-auto" priority />
            ) : (
               <h1 className="font-pp-editorial text-3xl font-light italic text-white">
                LOST&SOUND
              </h1>
            )}
            <span className="text-xs uppercase tracking-widest text-purple-300/70 mt-2">Festival 2025</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {headerData.navItems?.map((item, index) => (
              <Link
                key={item.id || index}
                href={item.link.url || '#'}
                className="text-white hover:text-purple-400 transition-colors"
              >
                {item.link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Button asChild className="bg-purple-600 hover:bg-purple-500 text-white hidden sm:flex">
              <Link href="/tickets"> {/* Assuming a tickets page */}
                <Ticket className="mr-2 h-4 w-4" />
                Get Tickets
              </Link>
            </Button>
            <MobileNav navItems={headerData.navItems || []} />
          </div>
        </div>
      </header>
    </>
  );
}