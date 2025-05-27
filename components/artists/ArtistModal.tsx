'use client'

import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { Artist as PayloadArtist, Media as PayloadMedia } from '@/types/payload-types' // Adjust path as needed
import { FaInstagram, FaTwitter, FaSpotify, FaSoundcloud, FaFacebook } from 'react-icons/fa'
import { JSX } from 'react'

function extractTextFromLexical(lexicalBio?: PayloadArtist['bio']): string {
  if (!lexicalBio || !lexicalBio.root || !lexicalBio.root.children) {
    return 'No biography available.'
  }
  let textContent = ''
  function traverse(nodes: any[]) {
    for (const node of nodes) {
      if (node.type === 'text' && node.text) {
        textContent += node.text + ' '
      }
      if (node.type === 'paragraph' || node.type === 'heading') {
        if (node.children && Array.isArray(node.children)) {
          traverse(node.children)
        }
        textContent += '\n'
      } else if (node.children && Array.isArray(node.children)) {
        traverse(node.children)
      }
    }
  }
  traverse(lexicalBio.root.children)
  return textContent.trim().replace(/\n\s*\n/g, '\n') || 'No biography available.'
}

// Helper to format day
const formatDisplayDay = (day?: 'friday' | 'saturday' | 'sunday' | null): string => {
  if (!day) return 'TBA'
  return day.charAt(0).toUpperCase() + day.slice(1)
}

// Helper to format time
const formatDisplayTime = (startTime?: string | null, endTime?: string | null): string => {
  if (startTime && endTime) return `${startTime} - ${endTime}`
  if (startTime) return `From ${startTime}`
  if (endTime) return `Until ${endTime}`
  return 'TBA'
}

// Helper to format location
const formatDisplayLocation = (
  location?: 'main-stage' | 'outside-stage' | 'tent-area' | null
): string => {
  if (!location) return 'TBA'
  switch (location) {
    case 'main-stage':
      return 'Main Stage'
    case 'outside-stage':
      return 'Outside Stage'
    case 'tent-area':
      return 'Tent Area'
    default:
      const locStr = location as string
      return locStr.charAt(0).toUpperCase() + locStr.slice(1)
  }
}

const SocialIcons: Record<string, JSX.Element> = {
  instagram: <FaInstagram className="w-7 h-7 text-sky-950 hover:text-sky-700" />,
  twitter: <FaTwitter className="w-7 h-7 text-sky-950 hover:text-sky-700" />,
  spotify: <FaSpotify className="w-7 h-7 text-sky-950 hover:text-sky-700" />,
  soundcloud: <FaSoundcloud className="w-7 h-7 text-sky-950 hover:text-sky-700" />,
  facebook: <FaFacebook className="w-7 h-7 text-sky-950 hover:text-sky-700" />,
}

const PAYLOAD_PUBLIC_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

interface ArtistModalProps {
  artist: PayloadArtist | null
  isOpen: boolean
  onClose: () => void
}

export default function ArtistModal({ artist, isOpen, onClose }: ArtistModalProps) {
  if (!artist) {
    return null
  }

  let imageUrl = '/placeholder.svg'
  if (artist.image && typeof artist.image === 'object' && 'url' in artist.image) {
    const media = artist.image as PayloadMedia
    if (media.url) {
      imageUrl = media.url.startsWith('/') ? `${PAYLOAD_PUBLIC_URL}${media.url}` : media.url
    }
  }

  const biographyText = extractTextFromLexical(artist.bio)
  const performanceDay = formatDisplayDay(artist.day)
  const performanceTime = formatDisplayTime(artist.time, artist.endTime)
  const stageLocation = formatDisplayLocation(artist.location)

  return (
    <Dialog open={isOpen} onOpenChange={openValue => !openValue && onClose()}>
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
                priority={isOpen}
              />
              <div className="absolute inset-0 p-4 flex flex-col justify-between">
                <div className="flex flex-col items-start space-y-2">
                  <div className="bg-purple-600 text-white px-4 py-2 text-xs md:text-sm font-bold shadow-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                      <span>{performanceDay}</span>
                      {performanceTime !== 'TBA' && <span className="hidden sm:inline">|</span>}
                      {performanceTime !== 'TBA' && <span>{performanceTime}</span>}
                      {stageLocation !== 'TBA' && <span className="hidden sm:inline">|</span>}
                      {stageLocation !== 'TBA' && (
                        <span className="font-extrabold">{stageLocation}</span>
                      )}
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
                <div className="bg-purple-600 text-white px-4 py-2 font-bold text-lg inline-block">
                  About
                </div>
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
                    {artist.socialLinks.map(link => {
                      const Icon = SocialIcons[link.platform]
                      if (!link.url) return null
                      return (
                        <a
                          key={link.id || link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={` text-white p-3 hover:opacity-80 transition-opacity cursor-pointer rounded-md`}
                          aria-label={`Follow ${artist.name} on ${link.platform}`}
                        >
                          {Icon || <span className="capitalize text-xs">{link.platform}</span>}
                        </a>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
