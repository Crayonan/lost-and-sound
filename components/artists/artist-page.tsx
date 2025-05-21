"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import ArtistCard, { type ArtistCardProps } from "./artist-card"

export type FilterType = "A-Z" | "VR" | "ZA" | "ZO"

export interface ArtistPageProps {
  artists: ArtistCardProps[]
  title?: string
}

export default function ArtistPage({ artists, title = "LINE-UP" }: ArtistPageProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("A-Z")
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Auto-play the video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error)
      })
    }
  }, [])

  // Filter artists based on the active filter
  const filteredArtists = () => {
    switch (activeFilter) {
      case "A-Z":
        return [...artists].sort((a, b) => a.name.localeCompare(b.name))
      case "ZA":
        return [...artists].sort((a, b) => b.name.localeCompare(a.name))
      case "VR":
        return artists.filter((artist) => artist.day.toUpperCase() === "VRIJDAG")
      case "ZO":
        return artists.filter((artist) => artist.day.toUpperCase() === "ZONDAG")
      default:
        return artists
    }
  }

  // Function to determine the position class based on index and screen size
  const getPositionClass = (index: number) => {
    // For all screen sizes, we'll use custom classes that will be defined in CSS
    return `artist-card-${index % 4}`
  }

  return (
    <main className="min-h-screen relative  bg-black">
      {/* Video Header */}
      <div className="w-full h-[50vh] md:h-[70vh] overflow-hidden relative">
        <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Navigation */}

      </div>

      <section className="line-up-page__content">
        <div className="act-collection">
          <h1 className="mt-64 text-center text-white text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider mb-12">
            {title}
          </h1>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-32">
            <Button
              variant={activeFilter === "A-Z" ? "secondary" : "outline"}
              className={`${activeFilter === "A-Z" ? "bg-purple-400 hover:bg-purple-500" : "bg-white hover:bg-gray-100"} text-black font-bold px-8`}
              onClick={() => setActiveFilter("A-Z")}
            >
              A-Z
            </Button>
            <Button
              variant={activeFilter === "VR" ? "secondary" : "outline"}
              className={`${activeFilter === "VR" ? "bg-purple-400 hover:bg-purple-500" : "bg-white hover:bg-gray-100"} text-black font-bold px-8`}
              onClick={() => setActiveFilter("VR")}
            >
              VR
            </Button>
            <Button
              variant={activeFilter === "ZA" ? "secondary" : "outline"}
              className={`${activeFilter === "ZA" ? "bg-purple-400 hover:bg-purple-500" : "bg-white hover:bg-gray-100"} text-black font-bold px-8`}
              onClick={() => setActiveFilter("ZA")}
            >
              ZA
            </Button>
            <Button
              variant={activeFilter === "ZO" ? "secondary" : "outline"}
              className={`${activeFilter === "ZO" ? "bg-yellow-400 hover:bg-yellow-500" : "bg-white hover:bg-gray-100"} text-black font-bold px-8`}
              onClick={() => setActiveFilter("ZO")}
            >
              ZO
            </Button>
          </div>

          {/* Artist list with the exact structure from the HTML */}
          <ol className="act-list">
            {filteredArtists().map((artist) => (
              <li key={artist.name} className="act-list__item">
                <ArtistCard {...artist} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CSS from the provided file with adjustments to the staggered layout */}
      <style jsx global>{`
        *,:after,:before{background-repeat:no-repeat;}
        :after,:before{text-decoration:inherit;vertical-align:inherit;}
        :where(audio,canvas,iframe,img,svg,video){vertical-align:middle;}
        *,:after,:before{box-sizing:border-box;}
        div,section{margin:0;padding:0;}
        :where(a[class]){color:inherit;text-decoration:none;}
        figure{margin:0;padding:0;}
        img{block-size:auto;inline-size:100%;}
        .title-6{font-family:var(--font-secondary);line-height:1;text-transform:uppercase;}
        @media (min-width:28.125rem) and (max-width:53.0625rem){
          .title-6{margin-block:calc(1.5rem + 2vw);}
        }
        @media (min-width:53.125rem){
          .title-6{margin-block:3.2rem;}
        }
        @media (max-width:28.0625rem){
          .title-6{margin-block:2.4rem;}
        }
        @media (min-width:23.4375rem) and (max-width:119.9375rem){
          .title-6{font-size:calc(1.80583rem + .5178vw);}
        }
        @media (min-width:120rem){
          .title-6{font-size:2.8rem;}
        }
        @media (max-width:23.375rem){
          .title-6{font-size:2rem;}
        }
        :where(ol[class]:not(.list)){list-style:none;margin:0;padding:0;}
        .act-list{display:flex;flex-wrap:wrap;}
        .act-list__item{inline-size:100%;position:relative;}
        .act-list__item a{aspect-ratio:1;background-color:var(--color-primary);display:block;}
        
        /* Modified staggered layout to position lower cards at the middle of higher cards */
        @media (min-width:435px) and (max-width:724.98px){
          .act-list{margin-block-start:3.6rem;} /* Reduced from 7.2rem */
          .act-list>:nth-child(n){flex-basis:50%;}
          .act-list>:nth-child(odd){margin-block-start:-3.6rem;} /* Reduced from -7.2rem */
        }
        @media (min-width:725px) and (max-width:1014.98px){
          .act-list{margin-block-start:5.2rem;} /* Reduced from 10.4rem */
          .act-list>:nth-child(n){flex-basis:33.33%;}
          .act-list>:nth-child(3n),.act-list>:nth-child(3n-2){margin-block-start:-5.2rem;} /* Reduced from -10.4rem */
        }
        @media (min-width:1015px){
          .act-list{margin-block-start:7rem;} /* Reduced from 14rem */
          .act-list>:nth-child(n){flex-basis:25%;}
          .act-list>:nth-child(4n-1),.act-list>:nth-child(4n-3){margin-block-start:-7rem;} /* Reduced from -14rem */
        }
        
        .act-collection{margin-inline:auto;max-inline-size:var(--max-content-full-width);}
        .act-performance__location{display:block;}
        .act{display:block;overflow:hidden;position:relative;text-decoration:none;}
        .act:after,.act:before{background-repeat:no-repeat;background-size:contain;block-size:35%;content:"";inline-size:35%;pointer-events:none;position:absolute;transition:transform .3s ease-in-out;z-index:1;}
        .act:before{background-image:url(/images/artist-border-left-2.png);inset-block-start:0;inset-inline-start:0;transform:translate(-100%,-100%);}
        .act:after{background-image:url(/images/artist-border-right-2.png);background-size:cover;inset-block-end:0;inset-inline-end:0;transform:translate(100%,100%);}
        .act:hover:before{transform:translate(0,0);}
        .act:hover:after{transform:translate(0,0);}
        .act__image{display:block;position:relative;}
        .act__image:before{background:linear-gradient(180deg,#0000 50%,#0009);content:"";inset:0;pointer-events:none;position:absolute;}
        .act__content{inset-block-end:0;inset-inline:0;padding-block-end:2.4rem;padding-inline:1.6rem;position:absolute;text-align:center;}
        .act__content-title{margin:0;word-break:break-word;color:white;}
        .act__content-days{display:block;font-weight:700;letter-spacing:.1em;line-height:1;text-transform:uppercase;color:white;}
        @media (min-width:28.125rem) and (max-width:53.0625rem){
          .act__content-days{margin-block-start:calc(.125rem + 1.5vw);}
        }
        @media (min-width:53.125rem){
          .act__content-days{margin-block-start:1.4rem;}
        }
        @media (max-width:28.0625rem){
          .act__content-days{margin-block-start:.8rem;}
        }
        @media (min-width:28.125rem) and (max-width:53.0625rem){
          .act__content-days{font-size:calc(.95rem + 1vw);}
        }
        @media (min-width:53.125rem){
          .act__content-days{font-size:1.8rem;}
        }
        @media (max-width:28.0625rem){
          .act__content-days{font-size:1.4rem;}
        }
        .act__content-meta{display:block;color:white;}
        @media (min-width:28.125rem) and (max-width:53.0625rem){
          .act__content-meta{margin-block-start:calc(.125rem + 1.5vw);}
        }
        @media (min-width:53.125rem){
          .act__content-meta{margin-block-start:1.4rem;}
        }
        @media (max-width:28.0625rem){
          .act__content-meta{margin-block-start:.8rem;}
        }
        .line-up-page__content{position:relative;}
        @media (min-width:23.4375rem) and (max-width:119.9375rem){
          .line-up-page__content{margin-block-start:calc(-17.41748rem - 14.88673vw);}
        }
        @media (min-width:120rem){
          .line-up-page__content{margin-block-start:-46rem;}
        }
        @media (max-width:23.375rem){
          .line-up-page__content{margin-block-start:-23rem;}
        }
        @media (min-width:320px) and (max-width:667px){
          ::-webkit-scrollbar{display:none;}
        }
      `}</style>
    </main>
  )
}
