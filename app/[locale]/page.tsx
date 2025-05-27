import en from '@/locales/en.json'
import de from '@/locales/de.json'
import { getPageBySlug, getArtists, getGalleryImages } from '@/lib/payloadAPI'
import { ArtistBar } from '@/components/sections/ArtistBar.client'
import GalleryFrame from '@/components/gallery/GalleryFrame.client'
import InfoSection from '@/components/sections/InfoSection'
import Countdown from '@/components/sections/Countdown'
import { ppEditorialNewUltralightItalic } from '../fonts'
import type { Page as PageType, Media as PayloadMediaType, Artist } from '@/types/payload-types'
import Image from 'next/image'

const allLocales = { en, de }

const PAYLOAD_PUBLIC_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = await params
  const t = allLocales[locale as 'en' | 'de']

  const pageData: PageType | null = await getPageBySlug('home')
  const artistsData: Artist[] = await getArtists()
  const galleryMediaItems: PayloadMediaType[] = await getGalleryImages()

  if (!pageData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>{t?.home?.welcomeMessage || 'Welcome to our site.'}</p>
      </div>
    )
  }

  const { hero } = pageData
  const artistNames = artistsData.map(artist => artist.name)

  const galleryFrames = galleryMediaItems.map((mediaItem, idx) => {
    const imageUrl = mediaItem.url?.startsWith('/')
      ? `${PAYLOAD_PUBLIC_URL}${mediaItem.url}`
      : mediaItem.url || '/placeholder.svg'

    const descriptiveLabel =
      mediaItem.alt?.trim() ||
      (mediaItem.filename
        ? `View image: ${mediaItem.filename}`
        : `Gallery image ${mediaItem.id || idx + 1}`)

    return {
      id: mediaItem.id || String(idx + 1),
      image: imageUrl,
      label: descriptiveLabel,
      defaultPos: {
        x: (idx % 3) * 4,
        y: Math.floor(idx / 3) * 4,
        w: 4,
        h: 4,
      },
      isHovered: false,
    }
  })

  const heroBg = hero?.backgroundImage as PayloadMediaType | undefined
  const heroBgUrl = heroBg?.url
    ? heroBg.url.startsWith('/')
      ? `${PAYLOAD_PUBLIC_URL}${heroBg.url}`
      : heroBg.url
    : undefined
  let heroBgAlt = heroBg?.alt
  if (!heroBgAlt || heroBgAlt.trim() === '') {
    heroBgAlt = 'Hero background image'
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />
        {hero?.type === 'videoBackground' && hero.videoUrl && (
          <video
            className="absolute inset-0 w-full h-full object-cover video-focus"
            autoPlay
            loop
            muted
            playsInline
            src={hero.videoUrl}
          />
        )}
        {hero?.type === 'imageBackground' && heroBgUrl && (
          <Image
            src={heroBgUrl}
            alt={heroBgAlt}
            fill
            className="object-cover video-focus"
            priority
          />
        )}
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-20 relative z-20">
          <h1 className="text-6xl lg:text-6xl font-bold text-white tracking-tight leading-none mb-6">
            <Countdown date={1755820800000} t={t} />
          </h1>
          {hero?.subheading && (
            <p className="text-xl lg:text-2xl text-white/80 max-w-2xl">{hero.subheading}</p>
          )}
        </div>
      </section>

      {/* Artist Marquee */}
      {artistNames.length > 0 && (
        <div className="bg-neon-green py-3 border-y border-neon-green/30">
          <ArtistBar items={artistNames} />
        </div>
      )}

      {/* Festival Highlights */}
      {galleryFrames.length > 0 && (
        <section id="gallery" className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <h2
              className={`${ppEditorialNewUltralightItalic.className} text-5xl lg:text-6xl font-light italic text-white tracking-tighter mb-12 text-center`}
            >
              {t?.home?.festivalHighlights || 'Festival Highlights'}
            </h2>
            <div className="w-full h-[90vh]">
              <GalleryFrame initialFrames={galleryFrames} />
            </div>
          </div>
        </section>
      )}

      <InfoSection />
    </>
  )
}
