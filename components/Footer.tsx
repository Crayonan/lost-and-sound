// components/Footer.tsx
import Link from "next/link";
import { getFooterData } from "@/lib/payloadAPI";
import { ppEditorialNewUltralightItalic } from "@/app/fonts";
import { FooterClientInteractions } from "./FooterClientInteractions"; // For mobile accordions
import { FooterQuickLink  } from "@/payload-types";

export async function Footer() {
  // const locale = 'en'; // Or determine dynamically
  const footerData = await getFooterData();

  if (!footerData) {
    return (
      <footer className="bg-black py-8 sm:py-10 md:py-12 border-t border-purple-900/30">
        <div className="container mx-auto px-4">
          <p>Error loading footer.</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-black py-8 sm:py-10 md:py-12 border-t border-purple-900/30">
      <div className="container mx-auto px-4">
        {/* Mobile Footer will use Client Component for accordion */}
        <div className="md:hidden">
          <FooterClientInteractions footerData={footerData} />
        </div>

        {/* Desktop Footer (can be mostly static based on fetched data) */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className={`${ppEditorialNewUltralightItalic.className} text-2xl text-white mb-4`}>LOST&SOUND</h3>
              <p className="text-purple-200/70 text-sm">The ultimate music festival experience since 2020.</p>
            </div>
            {footerData.quickLinks && footerData.quickLinks.length > 0 && (
              <div>
                <h4 className="text-purple-400 font-semibold mb-4 text-sm">Quick Links</h4>
                <ul className="space-y-2">
                  {footerData.quickLinks.map((link, i) => (
                    <li key={i}>
                      <Link href={link.link.url || '#'} className="text-purple-200/70 hover:text-purple-400 transition-colors text-sm">
                        {link.link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {footerData.contactInfo && (
              <div>
                <h4 className="text-purple-400 font-semibold mb-4 text-sm">Contact</h4>
                <div className="space-y-2 text-purple-200/70 text-sm">
                   {/* Assuming contactInfo is simple text or needs custom rendering for RichText */}
                {typeof footerData.contactInfo === 'string' ? footerData.contactInfo : (
                    <>
                        info@lostandsound.com
                        <br />
                        +49 123 456 7890
                        <br />
                        Developed by Jesse
                    </>
                )}
                </div>
              </div>
            )}
            {footerData.socialMediaLinks && footerData.socialMediaLinks.length > 0 && (
              <div>
                <h4 className="text-purple-400 font-semibold mb-4 text-sm">Follow Us</h4>
                <div className="flex gap-4">
                  {footerData.socialMediaLinks.map(link => (
                    <Link key={link.platform} href={link.url || '#'} target="_blank" rel="noopener noreferrer" className="text-purple-200/70 hover:text-purple-400 transition-colors">
                      {link.platform?.charAt(0).toUpperCase() + link.platform?.slice(1)}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mt-12 pt-8 border-t border-purple-900/30 text-center text-purple-200/50">
            <p className="text-xs">{footerData.copyrightText}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}