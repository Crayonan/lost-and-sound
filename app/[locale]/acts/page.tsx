import ArtistPage from "@/components/artists/artist-page"
import type { ArtistCardProps } from "@/components/artists/artist-card"

// Sample artist data
const artistData: ArtistCardProps[] = [
    { name: "Arijit Singh",           image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Arijit_5th_GiMA_Awards.jpg",           day: "VRIJDAG", time: "18:00 - 19:00", venue: "Main Stage",    altTitle: "Arijit Singh" },
    { name: "Taylor Swift",           image: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Taylor_Swift_at_the_2023_MTV_Video_Music_Awards_%283%29.png",           day: "VRIJDAG", time: "18:00 - 19:00", venue: "The Tent",      altTitle: "Taylor Swift" },
    { name: "Ed Sheeran",             image: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Ed_Sheeran-6886_%28cropped%29.jpg",             day: "VRIJDAG", time: "18:00 - 19:00", venue: "Outside Stage", altTitle: "Ed Sheeran" },
    { name: "Billie Eilish",          image: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Billie_Eilish_performs_%22Birds_of_a_Feather%22_in_Inglewood_%28Dec_2024%29.png",          day: "VRIJDAG", time: "19:00 - 20:00", venue: "Main Stage",    altTitle: "Billie Eilish" },
    { name: "Ariana Grande",          image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Ariana_Grande_promoting_Wicked_%282024%29.jpg",          day: "VRIJDAG", time: "19:00 - 20:00", venue: "The Tent",      altTitle: "Ariana Grande" },
    { name: "Eminem",                 image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Eminem_2021_Color_Corrected.jpg",                  day: "VRIJDAG", time: "20:00 - 21:00", venue: "Main Stage",    altTitle: "Eminem" },
    { name: "Drake",                  image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Drake_at_The_Carter_Effect_2017_%2836818935200%29_%28cropped%29.jpg",                   day: "VRIJDAG", time: "20:00 - 21:00", venue: "The Tent",      altTitle: "Drake" },
    { name: "Bad Bunny",              image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Bad_Bunny_2019_by_Glenn_Francis.jpg/330px-Bad_Bunny_2019_by_Glenn_Francis.jpg",               day: "VRIJDAG", time: "20:00 - 21:00", venue: "Outside Stage", altTitle: "Bad Bunny" },
    { name: "Adele",                  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Adele_2016.jpg/330px-Adele_2016.jpg",                   day: "VRIJDAG", time: "22:00 - 23:00", venue: "The Tent",      altTitle: "Adele" },
    { name: "BTS",                    image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS2MlrH2EYdm2-d7VA1OFqEvx9UzVBES0YfExexj72FFrJ9ZWzXNsk0y-zw8YBnc0L5_pQokvgpG6hE-asdyUO8IA",                     day: "VRIJDAG", time: "21:00 - 22:00", venue: "The Tent",      altTitle: "BTS" },
    { name: "Bruno Mars",             image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/BrunoMars24KMagicWorldTourLive_%28cropped%29.jpg/330px-BrunoMars24KMagicWorldTourLive_%28cropped%29.jpg",              day: "VRIJDAG", time: "21:00 - 22:00", venue: "Outside Stage", altTitle: "Bruno Mars" },
    { name: "Rihanna",                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Rihanna%2C_LOUD_Tour%2C_Belfast_cropped_2.jpg/330px-Rihanna%2C_LOUD_Tour%2C_Belfast_cropped_2.jpg",                 day: "VRIJDAG", time: "22:00 - 23:00", venue: "Main Stage",    altTitle: "Rihanna" },


    // Saturday, August 23 (ZATERDAG)
    { name: "A.R. Rahman",            image: "/images/ar-rahman.png",               day: "ZATERDAG", time: "18:00 - 19:00", venue: "Main Stage",    altTitle: "A.R. Rahman" },
    { name: "Coldplay",               image: "/images/coldplay.png",                day: "ZATERDAG", time: "18:00 - 19:00", venue: "The Tent",      altTitle: "Coldplay" },
    { name: "Imagine Dragons",        image: "/images/imagine-dragons.png",         day: "ZATERDAG", time: "18:00 - 19:00", venue: "Outside Stage", altTitle: "Imagine Dragons" },
    { name: "Karol G",                image: "/images/karol-g.png",                  day: "ZATERDAG", time: "19:00 - 20:00", venue: "Main Stage",    altTitle: "Karol G" },
    { name: "Queen",                  image: "/images/queen.png",                    day: "ZATERDAG", time: "19:00 - 20:00", venue: "The Tent",      altTitle: "Queen" },
    { name: "Blackpink",              image: "/images/blackpink.png",                day: "ZATERDAG", time: "19:00 - 20:00", venue: "Outside Stage", altTitle: "Blackpink" },
    { name: "Selena Gomez",           image: "/images/selena-gomez.png",             day: "ZATERDAG", time: "20:00 - 21:00", venue: "Main Stage",    altTitle: "Selena Gomez" },
    { name: "XXXTentacion",           image: "/images/xxxtentacion.png",             day: "ZATERDAG", time: "20:00 - 21:00", venue: "The Tent",      altTitle: "XXXTentacion" },
    { name: "Pritam",                 image: "/images/pritam.png",                   day: "ZATERDAG", time: "20:00 - 21:00", venue: "Outside Stage", altTitle: "Pritam" },
    { name: "Neha Kakkar",            image: "/images/neha-kakkar.png",              day: "ZATERDAG", time: "21:00 - 22:00", venue: "Main Stage",    altTitle: "Neha Kakkar" },
    { name: "Lana Del Rey",           image: "/images/lana-del-rey.png",             day: "ZATERDAG", time: "21:00 - 22:00", venue: "The Tent",      altTitle: "Lana Del Rey" },
    { name: "Post Malone",            image: "/images/post-malone.png",              day: "ZATERDAG", time: "21:00 - 22:00", venue: "Outside Stage", altTitle: "Post Malone" },
    { name: "Dua Lipa",               image: "/images/dua-lipa.png",                 day: "ZATERDAG", time: "22:00 - 23:00", venue: "Main Stage",    altTitle: "Dua Lipa" },

    // Sunday, August 24 (ZONDAG)
    { name: "Olivia Rodrigo",         image: "/images/olivia-rodrigo.png",           day: "ZONDAG", time: "18:00 - 19:00", venue: "Main Stage",    altTitle: "Olivia Rodrigo" },
    { name: "Shawn Mendes",           image: "/images/shawn-mendes.png",             day: "ZONDAG", time: "18:00 - 19:00", venue: "The Tent",      altTitle: "Shawn Mendes" },
    { name: "Maroon 5",               image: "/images/maroon-5.png",                 day: "ZONDAG", time: "18:00 - 19:00", venue: "Outside Stage", altTitle: "Maroon 5" },
    { name: "Anuel AA",               image: "/images/anuel-aa.png",                 day: "ZONDAG", time: "19:00 - 20:00", venue: "Main Stage",    altTitle: "Anuel AA" },
    { name: "Sidhu Moosewala",        image: "/images/sidhu-moosewala.png",          day: "ZONDAG", time: "19:00 - 20:00", venue: "The Tent",      altTitle: "Sidhu Moosewala" },
    { name: "Kendrick Lamar",         image: "/images/kendrick-lamar.png",           day: "ZONDAG", time: "19:00 - 20:00", venue: "Outside Stage", altTitle: "Kendrick Lamar" },
    { name: "Alan Walker",            image: "/images/alan-walker.png",              day: "ZONDAG", time: "20:00 - 21:00", venue: "Main Stage",    altTitle: "Alan Walker" },
    { name: "Beyoncé",                image: "/images/beyonce.png",                  day: "ZONDAG", time: "20:00 - 21:00", venue: "The Tent",      altTitle: "Beyoncé" },
    { name: "Juice Wrld",             image: "/images/juice-wrld.png",               day: "ZONDAG", time: "20:00 - 21:00", venue: "Outside Stage", altTitle: "Juice Wrld" },
    { name: "One Direction",          image: "/images/one-direction.png",            day: "ZONDAG", time: "21:00 - 22:00", venue: "Main Stage",    altTitle: "One Direction" },
    { name: "Anirudh Ravichander",    image: "/images/anirudh-ravichander.png",      day: "ZONDAG", time: "21:00 - 22:00", venue: "The Tent",      altTitle: "Anirudh Ravichander" },
    { name: "Ozuna",                  image: "/images/ozuna.png",                    day: "ZONDAG", time: "21:00 - 22:00", venue: "Outside Stage", altTitle: "Ozuna" },
    { name: "Travis Scott",           image: "/images/travis-scott.png",             day: "ZONDAG", time: "22:00 - 23:00", venue: "Main Stage",    altTitle: "Travis Scott" },
]

export default function Home() {
    return <ArtistPage artists={artistData} />
}