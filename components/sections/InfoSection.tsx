import { getNewsArticles, getFaqItems, getInstagramPostsFromPayload, PopulatedInstagramPost } from "@/lib/payloadAPI"; // Import PopulatedInstagramPost
import type { NewsArticle, FaqItem } from "@/types/payload-types";
import { InfoSectionTabs } from "./InfoSectionTabs";

export default async function InfoSection() {
  const newsItemsData: NewsArticle[] = await getNewsArticles(4);
  const faqItemsData: FaqItem[] = await getFaqItems(5);
  const instagramPostsData: PopulatedInstagramPost[] = await getInstagramPostsFromPayload(5);

  return (
    <InfoSectionTabs
      initialNewsItems={newsItemsData}
      initialFaqItems={faqItemsData}
      initialInstagramPosts={instagramPostsData} // This now matches the expected prop type
    />
  );
}