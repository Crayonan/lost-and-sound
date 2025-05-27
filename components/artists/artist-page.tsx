"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react"; // Added useCallback
import { Button } from "@/components/ui/button";
import ArtistCard, { type ArtistCardProps } from "./artist-card";
import ArtistModal from "./artist-modal"; // Import the modal
import { getArtists } from "@/lib/payloadAPI";
import type { Artist as PayloadArtist, Media as PayloadMedia } from "@/types/payload-types";
import './artists-page.css';

const PAYLOAD_PUBLIC_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3000";

export type FilterType = "A-Z" | "VR" | "ZA" | "ZO";

export interface ArtistPageProps {
  title?: string;
}

// Helper function moved from ArtistModal as they are also used here for mapping
const formatLocationForDisplay = (location?: ('main-stage' | 'outside-stage' | 'tent-area') | null): string => {
    if (!location) return "TBA";
    switch (location) {
      case 'main-stage': return 'Main Stage';
      case 'outside-stage': return 'Outside Stage';
      case 'tent-area': return 'Tent Area';
      default: 
        const knownLocation = location as string;
        return knownLocation.charAt(0).toUpperCase() + knownLocation.slice(1);
    }
  };
  
const mapPayloadDayToCardDay = (payloadDay?: ('friday' | 'saturday' | 'sunday') | null): string => {
    if (!payloadDay) return "TBA";
    return payloadDay; 
};

export default function ArtistPage({ title = "LINE-UP" }: ArtistPageProps) {
  const [mappedArtists, setMappedArtists] = useState<ArtistCardProps[]>([]);
  const [rawPayloadArtists, setRawPayloadArtists] = useState<PayloadArtist[]>([]); // Store raw data
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>("A-Z");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Modal State
  const [selectedArtist, setSelectedArtist] = useState<PayloadArtist | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((videoError) => {
        console.error("Video autoplay failed:", videoError);
      });
    }
  }, []);

  useEffect(() => {
    const loadArtists = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedPayloadArtists: PayloadArtist[] = await getArtists();
        setRawPayloadArtists(fetchedPayloadArtists); // Store raw data

        const newMappedArtists: ArtistCardProps[] = fetchedPayloadArtists.map((payloadArtist) => {
          let imageUrl = "/placeholder.svg";
          if (payloadArtist.image && typeof payloadArtist.image === 'object' && 'url' in payloadArtist.image) {
            const media = payloadArtist.image as PayloadMedia;
            if (media.url) {
              imageUrl = media.url.startsWith('/') ? `${PAYLOAD_PUBLIC_URL}${media.url}` : media.url;
            }
          }

          let timeString = "TBA";
          if (payloadArtist.time && payloadArtist.endTime) {
            timeString = `${payloadArtist.time} - ${payloadArtist.endTime}`;
          } else if (payloadArtist.time) {
            timeString = payloadArtist.time;
          }
          
          return {
            // Keep only necessary props for ArtistCard
            name: payloadArtist.name,
            image: imageUrl,
            day: mapPayloadDayToCardDay(payloadArtist.day),
            time: timeString,
            venue: formatLocationForDisplay(payloadArtist.location),
            // altTitle is not in PayloadArtist, ArtistCard will use name
          };
        });
        setMappedArtists(newMappedArtists);
      } catch (fetchError) {
        if (fetchError instanceof Error) {
          setError(fetchError.message);
        } else {
          setError("An unknown error occurred while fetching artists.");
        }
        console.error("Error loading artists:", fetchError);
      } finally {
        setLoading(false);
      }
    };

    loadArtists();
  }, []);

  const handleArtistCardClick = useCallback((artistName: string) => {
    const artistToDisplay = rawPayloadArtists.find(pArtist => pArtist.name === artistName);
    if (artistToDisplay) {
      setSelectedArtist(artistToDisplay);
      setIsModalOpen(true);
    }
  }, [rawPayloadArtists]); // Dependency on rawPayloadArtists

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    // Optional: Delay clearing selectedArtist to allow for modal closing animation
    // setTimeout(() => setSelectedArtist(null), 300); 
    setSelectedArtist(null); // Clear immediately if no animation concerns
  }, []);

  const filteredMappedArtists = useMemo(() => { // Renamed to avoid conflict
    let currentArtists = [...mappedArtists];
    switch (activeFilter) {
      case "A-Z":
        return currentArtists.sort((a, b) => a.name.localeCompare(b.name));
      case "ZA":
        return currentArtists.sort((a, b) => b.name.localeCompare(a.name));
      case "VR":
        return currentArtists.filter((artist) => artist.day === "friday");
      case "ZO":
        return currentArtists.filter((artist) => artist.day === "sunday");
      default:
        return currentArtists;
    }
  }, [mappedArtists, activeFilter]);

  const FilterButton = ({ filterType, label }: { filterType: FilterType; label: string }) => (
    <Button
      variant={activeFilter === filterType ? "secondary" : "outline"}
      className={`
        ${activeFilter === filterType 
          ? (filterType === "ZO" ? "bg-yellow-400 hover:bg-yellow-500" : "bg-purple-400 hover:bg-purple-500")
          : "bg-white hover:bg-gray-100"
        } 
        text-black font-bold px-8
      `}
      onClick={() => setActiveFilter(filterType)}
    >
      {label}
    </Button>
  );

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading artists...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-red-500">
        <p>Error loading artists: {error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">Try Again</Button>
      </div>
    );
  }

  return (
    <> {/* Use Fragment to wrap main and modal */}
      <main className="min-h-screen relative bg-black"> 
        <div className="w-full overflow-hidden relative">
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <section className="line-up-page__content pt-12">

          <div className="act-collection">
            <h1 className="text-center text-white text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider mb-12">
              {title}
            </h1>

            <div className="flex justify-center gap-4 mb-32 mx-2">
              <FilterButton filterType="A-Z" label="A-Z" />
              <FilterButton filterType="VR" label="VR" /> 
              <FilterButton filterType="ZA" label="ZA" />
              <FilterButton filterType="ZO" label="ZO" />
            </div>

            {filteredMappedArtists.length > 0 ? (
              <ol className="act-list">
                {filteredMappedArtists.map((artistProps) => ( // artistProps is ArtistCardProps
                  <li key={artistProps.name} className="act-list__item">
                    <ArtistCard 
                      {...artistProps} 
                      onClick={() => handleArtistCardClick(artistProps.name)} 
                    />
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-center text-white text-xl">No artists found for this filter.</p>
            )}
          </div>
        </section>
      </main>

      <ArtistModal 
        artist={selectedArtist} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
}