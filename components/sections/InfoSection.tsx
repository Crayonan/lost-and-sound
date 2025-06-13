import {
  getNewsArticles,
  getFaqItems,
  getInstagramPostsFromPayload,
  PopulatedInstagramPost,
} from '@/lib/payloadAPI' // Import PopulatedInstagramPost
import type { NewsArticle, FaqItem } from '@/types/payload-types'
import { InfoSectionTabs } from './InfoSectionTabs'

interface InfoSectionProps {
  locale?: string
}

export default async function InfoSection({ locale }: InfoSectionProps) {
  const newsItemsData: NewsArticle[] = await getNewsArticles(4, locale)
  const faqItemsData: FaqItem[] = await getFaqItems(5, locale)
  const instagramPostsData: PopulatedInstagramPost[] = await getInstagramPostsFromPayload(5, locale)

  return (
    <InfoSectionTabs
      initialNewsItems={newsItemsData}
      initialFaqItems={faqItemsData}
      initialInstagramPosts={instagramPostsData} // This now matches the expected prop type
    />
  )
}
