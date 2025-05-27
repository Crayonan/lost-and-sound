// src/components/artists/artist-modal.tsx (or your preferred path)
"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Artist as PayloadArtist, Media as PayloadMedia } from "@/types/payload-types"; // Adjust path as needed
import { JSX } from "react";

// Helper to extract text from Lexical bio (basic implementation)
function extractTextFromLexical(lexicalBio?: PayloadArtist['bio']): string {
  if (!lexicalBio || !lexicalBio.root || !lexicalBio.root.children) {
    return "No biography available.";
  }
  let textContent = "";
  function traverse(nodes: any[]) {
    for (const node of nodes) {
      if (node.type === 'text' && node.text) {
        textContent += node.text + " ";
      }
      // For paragraph and heading nodes, add a line break after processing children.
      if (node.type === 'paragraph' || node.type === 'heading') {
        if (node.children && Array.isArray(node.children)) {
          traverse(node.children);
        }
        textContent += "\n"; // Add a line break after paragraph or heading content
      } else if (node.children && Array.isArray(node.children)) {
        traverse(node.children);
      }
    }
  }
  traverse(lexicalBio.root.children);
  return textContent.trim().replace(/\n\s*\n/g, '\n') || "No biography available."; // Replace multiple newlines
}


// Helper to format day
const formatDisplayDay = (day?: 'friday' | 'saturday' | 'sunday' | null): string => {
  if (!day) return "TBA";
  return day.charAt(0).toUpperCase() + day.slice(1); // Friday, Saturday, Sunday
};

// Helper to format time
const formatDisplayTime = (startTime?: string | null, endTime?: string | null): string => {
  if (startTime && endTime) return `${startTime} - ${endTime}`;
  if (startTime) return `From ${startTime}`;
  if (endTime) return `Until ${endTime}`;
  return "TBA";
};

// Helper to format location
const formatDisplayLocation = (location?: 'main-stage' | 'outside-stage' | 'tent-area' | null): string => {
  if (!location) return "TBA";
  switch (location) {
    case 'main-stage': return 'Main Stage';
    case 'outside-stage': return 'Outside Stage';
    case 'tent-area': return 'Tent Area';
    default:
      const locStr = location as string;
      return locStr.charAt(0).toUpperCase() + locStr.slice(1);
  }
};

// Social Icons (simplified example, ideally use an icon library or full SVGs)
const SocialIcons: Record<string, JSX.Element> = {
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
  ),
  spotify: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  ),
  soundcloud: ( // Assuming you might have Soundcloud
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 10.5v3c0 2.077-1.343 3.81-3.167 4.276A4.502 4.502 0 010 13.5C0 10.923 1.91 9.073 4.333 9.073c.638 0 1.248.14 1.79.392.126-.99.592-1.897 1.291-2.646C8.08 6.01 8.888 5.5 10 5.5c1.481 0 2.97.686 3.979 1.776.317.345.602.718.849 1.118C17.179 7.292 19.667 6 22.5 6 23.328 6 24 6.672 24 7.5c0 .36-.133.7-.359.975-.67.795-1.522 1.692-2.438 2.434C20.015 12.24 19 13.617 19 15v1c0 1.105-.895 2-2 2h-1c-1.105 0-2-.895-2-2v-4c0-2.209-1.791-4-4-4S6 8.791 6 11v-.5H7zM3 13.5c0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.742-.6-1.355-1.5-1.5-.848-.135-1.5.446-1.5 1.5zm8.5-2c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5S10 13.828 10 13s.672-1.5 1.5-1.5zm6 3.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5S16 17.328 16 16.5s.672-1.5 1.5-1.5z" />
    </svg>
  ),
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.89v-2.78h2.89v-2.09c0-2.888 1.709-4.478 4.359-4.478 1.244 0 2.528.222 2.528.222v2.339h-1.192c-1.425 0-1.875.888-1.875 1.791v1.726h2.65l-.423 2.78h-2.227v6.988C18.343 21.128 22 16.991 22 12z"/>
    </svg>
  ),
  // Add other platforms as needed
};

const SocialBackgrounds: Record<string, string> = {
  instagram: "bg-pink-500 hover:bg-pink-600",
  twitter: "bg-blue-500 hover:bg-blue-600",
  spotify: "bg-green-500 hover:bg-green-600",
  soundcloud: "bg-orange-500 hover:bg-orange-600",
  facebook: "bg-blue-700 hover:bg-blue-800",
  // Default for other platforms
  default: "bg-gray-500 hover:bg-gray-600",
};

const PAYLOAD_PUBLIC_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3000";

interface ArtistModalProps {
  artist: PayloadArtist | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ArtistModal({ artist, isOpen, onClose }: ArtistModalProps) {
  if (!artist) {
    return null;
  }

  let imageUrl = "/placeholder.svg";
  if (artist.image && typeof artist.image === 'object' && 'url' in artist.image) {
    const media = artist.image as PayloadMedia;
    if (media.url) {
      imageUrl = media.url.startsWith('/') ? `${PAYLOAD_PUBLIC_URL}${media.url}` : media.url;
    }
  }

  const biographyText = extractTextFromLexical(artist.bio);
  const performanceDay = formatDisplayDay(artist.day);
  const performanceTime = formatDisplayTime(artist.time, artist.endTime);
  const stageLocation = formatDisplayLocation(artist.location);

  return (
    <Dialog open={isOpen} onOpenChange={(openValue) => !openValue && onClose()}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto p-0 sm:rounded-lg">
        <div className="relative">
          <DialogHeader className="sr-only">
            <DialogTitle>{artist.name} - Artist Profile</DialogTitle>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Left side - Artist image */}
            <div className="relative aspect-square md:aspect-auto md:min-h-[400px] lg:min-h-[500px] bg-gradient-to-br from-gray-100 to-gray-200">
              <Image
                src={imageUrl}
                alt={`${artist.name} profile photo`}
                fill
                className="object-cover"
                priority={isOpen} // Load priority if modal is open
              />
              <div className="absolute inset-0 p-4 flex flex-col justify-between">
                <div className="flex flex-col items-start space-y-2">
                  <div className="bg-purple-600 text-white px-4 py-2 text-xs md:text-sm font-bold shadow-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                      <span>{performanceDay}</span>
                      {performanceTime !== "TBA" && <span className="hidden sm:inline">|</span>}
                      {performanceTime !== "TBA" && <span>{performanceTime}</span>}
                      {stageLocation !== "TBA" && <span className="hidden sm:inline">|</span>}
                      {stageLocation !== "TBA" && <span className="font-extrabold">{stageLocation}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <div className="bg-red-500 text-white px-6 py-3 text-3xl md:text-4xl font-black transform -skew-x-2 shadow-lg">
                    {artist.name}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Biography and social links */}
            <div className="p-6 md:p-8 flex flex-col space-y-6 bg-white">
              <div className="space-y-4">
                <div className="bg-purple-600 text-white px-4 py-2 font-bold text-lg inline-block">About</div>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
                  {biographyText}
                </p>
              </div>

              {artist.socialLinks && artist.socialLinks.length > 0 && (
                <div className="space-y-4">
                  <div className="bg-red-500 text-white px-4 py-2 font-bold text-lg inline-block">
                    Follow {artist.name}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {artist.socialLinks.map((link) => {
                      const Icon = SocialIcons[link.platform];
                      const bgColor = SocialBackgrounds[link.platform] || SocialBackgrounds.default;
                      if (!link.url) return null;
                      return (
                        <a
                          key={link.id || link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${bgColor} text-white p-3 hover:opacity-80 transition-opacity cursor-pointer rounded-md`}
                          aria-label={`Follow ${artist.name} on ${link.platform}`}
                        >
                          {Icon || <span className="capitalize text-xs">{link.platform}</span>}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}