// components/MobileNav.client.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ticket, Menu, X } from "lucide-react";
import type { Header } from "@/payload-types"; // Assuming payload-types.ts is in src

interface MobileNavProps {
  navItems: Header['navItems'];
}

export function MobileNav({ navItems }: MobileNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-white p-2"
        aria-label="Toggle mobile menu"
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-md z-30 transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ top: "73px", height: "calc(100vh - 73px)" }} // Adjust top if header height changes
        onClick={() => setMobileMenuOpen(false)} // Close on overlay click
      >
        <div className="container mx-auto px-4 py-8" onClick={(e) => e.stopPropagation()}>
          <nav className="flex flex-col space-y-6">
            {navItems?.map((item, index) => (
              <Link
                key={index}
                href={item.link.url || '#'}
                className="text-white hover:text-purple-400 transition-colors text-2xl font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.link.label}
              </Link>
            ))}
            <Button
              className="bg-purple-600 hover:bg-purple-500 text-white w-full sm:hidden mt-4"
              onClick={() => setMobileMenuOpen(false)} // Also close menu on ticket click
            >
              <Ticket className="mr-2 h-4 w-4" />
              Get Tickets
            </Button>
          </nav>
        </div>
      </div>
    </>
  );
}