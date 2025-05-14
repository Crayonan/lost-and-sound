"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useT } from "@/hooks/useT";
import { ChevronDown, ChevronUp, Instagram, Twitter, Facebook } from "lucide-react";
import { ppEditorialNewUltralightItalic } from "@/app/fonts";
import type { Footer as FooterType } from "@/types/payload-types";
import RichText from "@/components/common/RichText";

interface FooterClientInteractionsProps {
  footerData: FooterType;
}

export function FooterClientInteractions({ footerData }: FooterClientInteractionsProps) {
  const t = useT();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const toggle = (section: string) =>
    setExpandedSection(prev => (prev === section ? null : section));

  useEffect(() => {
    if (!expandedSection) return;
    const timer = setTimeout(() => {
      document
        .querySelectorAll(`.footer-section-${expandedSection} > *`)
        .forEach(el => el.classList.add("footer-content-animate"));
    }, 50);
    return () => clearTimeout(timer);
  }, [expandedSection]);

  const quickLinks = footerData.quickLinks ?? [];
  const socialMediaLinks = footerData.socialMediaLinks ?? [];
  const contactInfo = footerData.contactInfo;

  return (
    <footer className="bg-black py-8 sm:py-10 md:py-12 border-t border-purple-900/30">
      <div className="container mx-auto px-4">
        {/* ========== MOBILE FOOTER ========== */}
        <div className="md:hidden">
          {/* Logo + Social */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className={`${ppEditorialNewUltralightItalic.className} text-2xl text-white`}>
                LOST&SOUND
              </h3>
              <p className="text-xs text-purple-200/70">{t.footer.tagline}</p>
            </div>
            <div className="flex gap-3">
              {socialMediaLinks.map((link, i) => (
                <Link
                  key={link.id ?? i}
                  href={link.url || "#"}
                  className="text-purple-200/70 hover:text-purple-400 transition-colors p-2"
                >
                  {link.platform === "instagram" && <Instagram className="h-5 w-5" />}
                  {link.platform === "twitter" && <Twitter className="h-5 w-5" />}
                  {link.platform === "facebook" && <Facebook className="h-5 w-5" />}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links Accordion */}
          <div className="border-t border-purple-900/30 py-3">
            <button
              onClick={() => toggle("links")}
              className="w-full flex justify-between items-center py-2"
              aria-expanded={expandedSection === "links"}
            >
              <h4 className="text-purple-400 font-semibold text-sm">{t.footer.quickLinksTitle}</h4>
              {expandedSection === "links" ? (
                <ChevronUp className="h-4 w-4 text-purple-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-purple-400" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out footer-section-links ${
                expandedSection === "links"
                  ? "max-h-40 opacity-100 pt-2 pb-1"
                  : "max-h-0 opacity-0 pt-0 pb-0"
              }`}
            >
              {quickLinks.map((item, i) => (
                <Link
                  key={item.id ?? i}
                  href={item.link.url || "#"}
                  className="block text-purple-200/70 hover:text-purple-400 transition-colors text-sm"
                >
                  {item.link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Accordion */}
          <div className="border-t border-purple-900/30 py-3">
            <button
              onClick={() => toggle("contact")}
              className="w-full flex justify-between items-center py-2"
              aria-expanded={expandedSection === "contact"}
            >
              <h4 className="text-purple-400 font-semibold text-sm">{t.footer.contactTitle}</h4>
              {expandedSection === "contact" ? (
                <ChevronUp className="h-4 w-4 text-purple-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-purple-400" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out footer-section-contact ${
                expandedSection === "contact"
                  ? "max-h-40 opacity-100 pt-2 pb-1"
                  : "max-h-0 opacity-0 pt-0 pb-0"
              }`}
            >
              {contactInfo && <RichText content={contactInfo} />}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-4 pt-4 border-t border-purple-900/30 text-center text-purple-200/50">
            <p className="text-xs">{t.footer.copyright}</p>
          </div>
        </div>

        {/* ========== DESKTOP FOOTER ========== */}
        <div className="hidden md:block">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Logo & Tagline */}
              <div>
                <h3 className={`${ppEditorialNewUltralightItalic.className} text-2xl text-white mb-4`}>
                  LOST&SOUND
                </h3>
                <p className="text-purple-200/70">{t.footer.tagline}</p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-purple-400 font-semibold mb-4">{t.footer.quickLinksTitle}</h4>
                <ul className="space-y-2">
                  {quickLinks.map((item, i) => (
                    <li key={item.id ?? i}>
                      <Link
                        href={item.link.url || "#"}
                        className="text-purple-200/70 hover:text-purple-400 transition-colors"
                      >
                        {item.link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-purple-400 font-semibold mb-4">{t.footer.contactTitle}</h4>
                <div className="prose prose-invert">
                  {contactInfo && <RichText content={contactInfo} />}
                </div>
              </div>

              {/* Follow Us */}
              <div>
                <h4 className="text-purple-400 font-semibold mb-4">{t.footer.followUsTitle}</h4>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-4">
                  {socialMediaLinks.map((link, i) => {
                    const Icon =
                      link.platform === "instagram"
                        ? Instagram
                        : link.platform === "twitter"
                        ? Twitter
                        : Facebook;
                    const label = link.platform[0].toUpperCase() + link.platform.slice(1);
                    return (
                      <Link
                        key={link.id ?? i}
                        href={link.url || "#"}
                        className="flex items-center gap-2 text-purple-200/70 hover:text-purple-400 transition-colors"
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-sm">{label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Full-width copyright */}
          <div className="w-full mt-12 pt-8 border-t border-purple-900/30">
            <p className="text-center text-purple-200/50">{t.footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
