// components/mockData.ts
export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  timestamp: string;
  username: string;
}

export const mockInstagramPosts: InstagramPost[] = [
  {
    id: "1",
    imageUrl:
      "https://v0.dev/_next/image?url=https%3A%2F%2Fhebbkx1anhila5yf.public.blob.vercel-storage.com%2F431558538_2210900179259944_1442682086543181854_n.jpg-SN3eKHV5EuGcmiQOcqfelKI1aIe5Hd.jpeg&w=1920&q=75",
    caption: "Unforgettable moments from the main stage! #LOSTSOUND2025 #FestivalVibes",
    likes: 1243,
    timestamp: "2025-08-24T18:30:00Z",
    username: "lostsoundfestival",
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop",
    caption: "The energy was electric last night! Thank you all for making this possible. #LOSTSOUND2025",
    likes: 982,
    timestamp: "2025-08-23T22:15:00Z",
    username: "lostsoundfestival",
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop",
    caption: "Sunset vibes at the Forest Stage. Pure magic! #LOSTSOUND2025 #SunsetSessions",
    likes: 1567,
    timestamp: "2025-08-23T20:45:00Z",
    username: "lostsoundfestival",
  },
];