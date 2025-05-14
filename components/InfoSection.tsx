// components/InfoSection.tsx
import { getNewsArticles, getFaqItems } from "@/lib/payloadAPI";
import type { NewsArticle, FaqItem, InstagramPost as InstagramPostPayload } from "@/payload-types"; // Use types from payload-types
import { InfoSectionTabs } from "./InfoSectionTabs.client";
// import { mockInstagramPosts, InstagramPost as MockInstagramPost } from "./mockData"; // Remove mock data import
import { getInstagramPostsFromPayload } from "@/lib/payloadAPI"; // Import the new fetch function

export default async function InfoSection() {
  const newsItemsData: NewsArticle[] = await getNewsArticles(4);
  const faqItemsData: FaqItem[] = await getFaqItems(5);

  // Fetch Instagram posts from Payload
  const instagramPostsData: InstagramPostPayload[] = await getInstagramPostsFromPayload(5); // Fetch latest 5

  return (
    <InfoSectionTabs
      initialNewsItems={newsItemsData}
      initialFaqItems={faqItemsData}
      initialInstagramPosts={instagramPostsData} // Pass the fetched data
    />
  );
}