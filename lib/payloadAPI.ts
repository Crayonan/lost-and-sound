import type {
  Page,
  Artist,
  Media as PayloadMedia,
  Footer as FooterType,
  NewsArticle,
  FaqItem,
  InstagramPost as InstagramPostPayload,
} from '@/types/payload-types'

const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

// --- Generic Fetch Function ---
async function fetchAPI<T> (
  endpointPath: string,
  options: RequestInit = {},
  tags?: string[]
): Promise<T> {
  const url = `${PAYLOAD_API_URL}/api${endpointPath}`
  const mergedOptions: RequestInit & { next?: { tags?: string[] } } = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    cache: 'no-store',
    next: {
      tags: tags,
    },
    ...options,
  }

  if (process.env.NODE_ENV === 'production' && mergedOptions.next?.revalidate !== 0) {
    mergedOptions.next = { ...mergedOptions.next, revalidate: 3600 }
  }

  try {
    const response = await fetch(url, mergedOptions)
    if (!response.ok) {
      let errorBody: any = { message: response.statusText }
      try {
        errorBody = await response.json()
      } catch (e) {
        /* Ignore */
      }
      console.error(`Error fetching ${url}: ${response.status} ${response.statusText}`, errorBody)
      throw new Error(
        `Failed to fetch API: ${endpointPath} - ${errorBody.message || response.statusText}`
      )
    }
    return response.json() as Promise<T>
  } catch (error) {
    console.error(`Payload API fetch error for ${url}:`, error)
    throw error
  }
}

// --- Types for API Responses with Populated Data ---
type PopulatedField<TFieldRelationship> = TFieldRelationship extends
  | (infer IDType | null | undefined)
  | infer PopulatedType
  ? PopulatedType extends object
    ? PopulatedType | null
    : TFieldRelationship
  : TFieldRelationship

interface CollectionResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export type PopulatedInstagramPost = Omit<InstagramPostPayload, 'localImage' | 'localVideo'> & {
  localImage?: PopulatedField<InstagramPostPayload['localImage']>
  localVideo?: PopulatedField<InstagramPostPayload['localVideo']>
}

// --- Global Data Fetchers ---

export async function getFooterData (locale?: string): Promise<FooterType | null> {
  const params = new URLSearchParams({ depth: '2' })
  if (locale) params.append('locale', locale)
  return fetchAPI<FooterType>(`/globals/footer?${params.toString()}`, {}, ['global_footer'])
}

// --- Collection Data Fetchers ---
export async function getArtists (): Promise<Artist[]> {
  const data = await fetchAPI<CollectionResponse<Artist>>(
    `/artists?limit=30&sort=name&depth=1`,
    {},
    ['artists']
  )
  return data.docs || []
}

export async function getGalleryImages (): Promise<PayloadMedia[]> {
  const params = new URLSearchParams({
    limit: '9',
    'where[category][equals]': 'gallery',
    sort: '-createdAt', // Or 'createdAt' for oldest first, or remove for default sort
    depth: '1',
  })

  const data = await fetchAPI<CollectionResponse<PayloadMedia>>(
    `/media?${params.toString()}`,
    {}, // No special options needed here
    ['media_gallery'] // Updated cache tag
  )
  return data.docs || []
}

export async function getNewsArticles (limit: number = 4, locale?: string): Promise<NewsArticle[]> {
  const params = new URLSearchParams({
    limit: limit.toString(),
    sort: '-publishedDate',
    depth: '1',
  })
  if (locale) params.append('locale', locale)
  const data = await fetchAPI<CollectionResponse<NewsArticle>>(
    `/news-articles?${params.toString()}`,
    {},
    ['news-articles']
  )
  return data.docs || []
}

export async function getFaqItems (limit: number = 5, locale?: string): Promise<FaqItem[]> {
  const params = new URLSearchParams({ limit: limit.toString(), sort: 'order', depth: '0' })
  if (locale) params.append('locale', locale)
  const data = await fetchAPI<CollectionResponse<FaqItem>>(`/faq-items?${params.toString()}`, {}, [
    'faq-items',
  ])
  return data.docs || []
}

export async function getPageBySlug (slug: string, locale?: string): Promise<Page | null> {
  const params = new URLSearchParams({ 'where[slug][equals]': slug, limit: '1', depth: '2' })
  if (locale) params.append('locale', locale)
  const data = await fetchAPI<CollectionResponse<Page>>(`/pages?${params.toString()}`, {}, [
    `pages_${slug}`,
  ])
  return data.docs[0] || null
}

export async function getInstagramPostsFromPayload (
  limit: number = 5
): Promise<PopulatedInstagramPost[]> {
  const queryParams = new URLSearchParams({
    sort: '-postDate',
    limit: limit.toString(),
    depth: '1',
  })
  try {
    const data = await fetchAPI<CollectionResponse<PopulatedInstagramPost>>(
      `/instagram-posts?${queryParams.toString()}`,
      {},
      ['instagram-posts']
    )
    return data.docs || []
  } catch (error) {
    console.error('[Frontend Fetch] Error in getInstagramPostsFromPayload:', error)
    return []
  }
}
