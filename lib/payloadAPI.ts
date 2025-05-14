// src/lib/payloadAPI.ts
import type {
  Page, // Assuming Page is used by Header/Footer nav items
  Artist,
  GalleryImage,
  Media as PayloadMedia,
  Header as HeaderGlobalPayload, // Renamed to avoid conflict with potential Header component
  Footer as FooterGlobalPayload, // Renamed to avoid conflict with potential Footer component
  NewsArticle,
  FaqItem,
  Category,
  InstagramPost as InstagramPostPayload, // Assuming this is a type for errors from your API
} from '@/payload-types'; // Import from your copied payload-types.ts

const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000';

// --- Generic Fetch Function ---
// This function makes the actual HTTP request to your Payload API
async function fetchAPI<T>(endpointPath: string, options: RequestInit = {}, tags?: string[]): Promise<T> {
  const url = `${PAYLOAD_API_URL}/api${endpointPath}`; // Prepend /api for Payload REST endpoints
  const mergedOptions: RequestInit & { next?: { tags?: string[] } } = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers, // Allow overriding/adding headers
    },
    cache: 'no-store', // Good for development, adjust for production (e.g., { next: { revalidate: 60 } })
    next: {
       tags: tags, // For Next.js cache invalidation by tag
    },
    ...options,
  };

  if (process.env.NODE_ENV === 'production' && mergedOptions.next?.revalidate !== 0) {
    mergedOptions.next = { ...mergedOptions.next, revalidate: 3600 }; // Example: revalidate every hour in prod
  }

  try {
    const response = await fetch(url, mergedOptions);
    if (!response.ok) {
      let errorBody: any = { message: response.statusText };
      try {
        errorBody = await response.json();
      } catch (e) {
        // Ignore if body is not JSON
      }
      console.error(`Error fetching ${url}: ${response.status} ${response.statusText}`, errorBody);
      throw new Error(`Failed to fetch API: ${endpointPath} - ${errorBody.message || response.statusText}`);
    }
    return response.json() as Promise<T>;
  } catch (error) {
    console.error(`Payload API fetch error for ${url}:`, error);
    throw error; // Re-throw to be caught by the calling function or Next.js error boundary
  }
}

// --- Types for Populated Globals (if payload-types.ts doesn't fully type populated relationships) ---
// It's often useful to define these explicitly for clarity in your frontend code.
// Ensure these match the actual structure after depth-based population.

interface PopulatedHeaderNavItemLink extends Omit<HeaderGlobalPayload['navItems'][0]['link'], 'reference'> {
  reference?: Page | null; // Assuming reference is to 'pages' collection
}
interface PopulatedHeaderNavItem extends Omit<HeaderGlobalPayload['navItems'][0], 'link'> {
  link: PopulatedHeaderNavItemLink;
}
export interface PopulatedHeader extends Omit<HeaderGlobalPayload, 'logo' | 'navItems'> {
  logo?: PayloadMedia | null;
  navItems?: PopulatedHeaderNavItem[] | null;
}


interface PopulatedFooterQuickLinkItem extends Omit<FooterGlobalPayload['quickLinks'][0]['link'], 'reference'> {
  reference?: Page | null;
}
interface PopulatedFooterQuickLink extends Omit<FooterGlobalPayload['quickLinks'][0], 'link'> {
  link: PopulatedFooterQuickLinkItem;
}
export interface PopulatedFooter extends Omit<FooterGlobalPayload, 'quickLinks'> {
  quickLinks?: PopulatedFooterQuickLink[] | null;
}

export interface PopulatedInstagramPost extends Omit<InstagramPostPayload, 'localImage' | 'localVideo'> {
  localImage?: PayloadMedia | null;
  localVideo?: PayloadMedia | null;
}

interface InstagramPostsApiResponse {
  docs: PopulatedInstagramPost[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}


// --- Global Data Fetchers ---
export async function getHeaderData(locale?: string): Promise<PopulatedHeader | null> {
  const params = new URLSearchParams();
  if (locale) params.append('locale', locale);
  params.append('depth', '2'); // Ensure depth is sufficient for logo and nav item pages

  try {
    // Globals are fetched directly, not wrapped in a 'docs' array by default REST API
    return await fetchAPI<PopulatedHeader>(`/globals/header?${params.toString()}`, {}, ['global_header']);
  } catch (error) {
    console.error('Failed to fetch header data:', error);
    return null; // Or handle error as appropriate for your app
  }
}

export async function getFooterData(locale?: string): Promise<PopulatedFooter | null> {
  const params = new URLSearchParams();
  if (locale) params.append('locale', locale);
  params.append('depth', '2'); // Ensure depth is sufficient for quickLinks pages

  try {
    return await fetchAPI<PopulatedFooter>(`/globals/footer?${params.toString()}`, {}, ['global_footer']);
  } catch (error) {
    console.error('Failed to fetch footer data:', error);
    return null;
  }
}

// --- Collection Data Fetchers ---
interface CollectionResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  // ... other pagination fields from Payload
}


export async function getArtists(): Promise<Artist[]> {
  const data = await fetchAPI<CollectionResponse<Artist>>(`/artists?limit=30&sort=name&depth=1`, {}, ['artists']);
  return data.docs || [];
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const data = await fetchAPI<CollectionResponse<GalleryImage>>(`/gallery-images?limit=9&sort=order&depth=1`, {}, ['gallery-images']);
  return data.docs || [];
}

export async function getNewsArticles(limit: number = 4, locale?: string): Promise<NewsArticle[]> {
  const params = new URLSearchParams({
    limit: limit.toString(),
    sort: '-publishedDate',
    depth: '1', // For category and coverImage
  });
  if (locale) params.append('locale', locale);
  const data = await fetchAPI<CollectionResponse<NewsArticle>>(`/news-articles?${params.toString()}`, {}, ['news-articles']);
  return data.docs || [];
}

export async function getFaqItems(limit: number = 5, locale?: string): Promise<FaqItem[]> {
  const params = new URLSearchParams({
    limit: limit.toString(),
    sort: 'order',
    depth: '0', // If 'answer' is simple RichText
  });
  if (locale) params.append('locale', locale);
  const data = await fetchAPI<CollectionResponse<FaqItem>>(`/faq-items?${params.toString()}`, {}, ['faq-items']);
  return data.docs || [];
}

export async function getPageBySlug(slug: string, locale?: string): Promise<Page | null> {
  const params = new URLSearchParams({
    'where[slug][equals]': slug,
    limit: '1',
    depth: '2',
  });
  if (locale) params.append('locale', locale);
  const data = await fetchAPI<CollectionResponse<Page>>(`/pages?${params.toString()}`, {}, [`pages_${slug}`]);
  return data.docs[0] || null;
}

export async function getInstagramPostsFromPayload(limit: number = 5): Promise<PopulatedInstagramPost[]> {
  const queryParams = new URLSearchParams({
    sort: '-postDate',
    limit: limit.toString(),
    depth: '1',
  });

  try {
    const data = await fetchAPI<InstagramPostsApiResponse>(`/instagram-posts?${queryParams.toString()}`, {}, ['instagram-posts']);
    // The previous mapping for localImage/localVideo isn't strictly necessary
    // if the API already returns them as null or populated objects correctly.
    // The PopulatedInstagramPost type helps TypeScript understand this.
    return data.docs || [];
  } catch (error) {
    console.error('[Frontend Fetch] Error in getInstagramPostsFromPayload:', error);
    return [];
  }
}