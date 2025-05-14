// components/FooterClientInteractions.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Footer as FooterType } from "@/payload-types"; // Assuming payload-types.ts is in src
import { ppEditorialNewUltralightItalic } from "@/app/fonts";

interface FooterClientProps {
  footerData: FooterType;
}

export function FooterClientInteractions({ footerData }: FooterClientProps) {
  const [expandedFooterSection, setExpandedFooterSection] = useState<string | null>(null);

  const toggleFooterSection = (section: string) => {
    setExpandedFooterSection(prev => (prev === section ? null : section));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className={`${ppEditorialNewUltralightItalic.className} text-2xl text-white`}>LOST&SOUND</h3>
          <p className="text-xs text-purple-200/70">Festival since 2020</p>
        </div>
        <div className="flex gap-3">
           {footerData.socialMediaLinks?.map(link => (
            <Link key={link.platform} href={link.url || '#'} target="_blank" rel="noopener noreferrer" className="text-purple-200/70 hover:text-purple-400 transition-colors p-2">
              {link.platform === 'instagram' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>}
              {link.platform === 'twitter' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>}
              {link.platform === 'facebook' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>}
            </Link>
          ))}
        </div>
      </div>

      {footerData.quickLinks && footerData.quickLinks.length > 0 && (
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
              {footerData.quickLinks.map((item, i) => (
                <Link key={i} href={item.link.url || '#'} className="text-purple-200/70 hover:text-purple-400 transition-colors text-sm">
                  {item.link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {footerData.contactInfo && (
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
            <div className="pt-2 pb-1 space-y-2 text-purple-200/70 text-sm">
               {/* For RichText, you'd need a proper serializer. This is a placeholder. */}
              {/* Consider a simple text display or a minimal RichText renderer client component */}
              {JSON.stringify(footerData.contactInfo)}
            </div>
          )}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-purple-900/30 text-center text-purple-200/50">
        <p className="text-xs">{footerData.copyrightText}</p>
      </div>
    </>
  );
}