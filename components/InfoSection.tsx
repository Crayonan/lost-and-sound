// components/InfoSection.tsx
import { getNewsArticles, getFaqItems, getInstagramPostsFromPayload, PopulatedInstagramPost } from "@/lib/payloadAPI"; // Import PopulatedInstagramPost
import type { NewsArticle, FaqItem } from "@/payload-types";
import { InfoSectionTabs } from "./InfoSectionTabs.client";

export default async function InfoSection() {
  const newsItemsData: NewsArticle[] = await getNewsArticles(4);
  const faqItemsData: FaqItem[] = await getFaqItems(5);

  // Fetch Instagram posts from Payload, now typed as PopulatedInstagramPost[]
  const instagramPostsData: PopulatedInstagramPost[] = await getInstagramPostsFromPayload(5);

  return (
    <InfoSectionTabs
      initialNewsItems={newsItemsData}
      initialFaqItems={faqItemsData}
      initialInstagramPosts={instagramPostsData} // This now matches the expected prop type
    />
  );
}