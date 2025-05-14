// app/page.tsx
import {
  getPageBySlug, // Ensure this is used
  getArtists,
  getGalleryImages,
} from "@/lib/payloadAPI";
import { ArtistBar } from "@/components/sections/ArtistBar.client";
import GalleryFrame from "@/components/gallery/GalleryFrame.client";
import InfoSection from "@/components/sections/InfoSection";
import { ppEditorialNewUltralightItalic } from "./fonts";
// Import types directly from your generated types file
import type { Page as PageType, Media as PayloadMediaType, Artist, GalleryImage } from "@/types/payload-types";
import Image from "next/image";

// Ensure the getHomePage function is defined in payloadAPI.ts or remove this function if unused.
// For this example, we are using getPageBySlug("home") instead.
// async function getHomePage(locale?: string): Promise<PageType | null> {
// return getPageBySlug("home", locale);
// }


export default async function HomePage() {
  const pageData = await getPageBySlug("home"); // Corrected: Use getPageBySlug
  const artistsData = await getArtists();
  const galleryImagesData = await getGalleryImages();

  if (!pageData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Welcome to Lost & Sound! Content is being prepared.</p>
      </div>
    );
  }

  const { hero } = pageData;
  const artistNames = artistsData.map(artist => artist.name);

  const galleryFrames = galleryImagesData.map((item, index) => {
    // Type assertion to ensure `item.image` is treated as PayloadMediaType
    const image = item.image as PayloadMediaType;
    return {
      id: item.id || String(index + 1),
      image: image?.url || "/placeholder.svg", // Accessing URL from the Media type
      label: item.label,
      defaultPos: { x: (index % 3) * 4, y: Math.floor(index / 3) * 4, w: 4, h: 4 },
      mediaSize: 1,
      borderThickness: 0,
      borderSize: 80,
      isHovered: false,
    };
  });

  const heroBackgroundImage = hero?.backgroundImage as PayloadMediaType | undefined;
  const heroBackgroundImageUrl = heroBackgroundImage?.url;
  const heroBackgroundImageAlt = heroBackgroundImage?.alt;

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10"></div>
        {hero?.type === 'videoBackground' && hero.videoUrl && (
          <video
            className="absolute inset-0 w-full h-full object-cover video-focus"
            autoPlay
            loop
            muted
            playsInline
            src={hero.videoUrl}
          ></video>
        )}
        {hero?.type === 'imageBackground' && heroBackgroundImageUrl && (
           <Image
            src={heroBackgroundImageUrl}
            alt={heroBackgroundImageAlt || 'Hero background image'}
            fill
            className="object-cover video-focus"
            priority
          />
        )}
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-20 relative z-20">
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-none mb-6">
                <span className="hidden lg:inline">Festival.Tanzen.Feier</span>
                <span className="lg:hidden flex flex-col">
                  <span>Festival</span>
                  <span>Tanzen</span>
                  <span>Feier</span>
                </span>
          </h1>
          {hero?.subheading && (
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl">
              {hero.subheading}
            </p>
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
              className={`${ppEditorialNewUltralightItalic.className} text-5xl md:text-6xl font-light italic text-white tracking-tighter mb-12 text-center`}
            >
              Festival Highlights
            </h2>
            <div className="w-full h-[90vh]">
              <GalleryFrame initialFrames={galleryFrames} />
            </div>
          </div>
        </section>
      )}

      <InfoSection />
    </>
  );
}