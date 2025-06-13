import { Product } from '@/types/payload-types'

// Enhanced product interface that utilizes all the new Payload CMS fields
export interface EnhancedProduct {
  id: number
  slug: string
  name: string
  description?: string
  price: number
  currency: 'usd' | 'eur'
  
  // Core categorization
  category: 'shirt' | 'hoodie' | 'pants' | 'accessories'
  targetAudience: 'women' | 'men' | 'unisex'
  
  // Visual and sizing
  images: string[]
  colors?: { name: string; value: string }[]
  availableSizes?: string[]
  
  // Detailed information
  details?: string[]
  madeIn?: string[]
  careInstructions?: string[]
  sizeAndFit?: 'regular' | 'baggy' | 'slim' | 'oversized' | 'custom'
  customSizeAndFit?: string
  shippingInfo?: string
  
  // Special flags
  isLimitedEdition?: boolean
  isFeatured?: boolean
  stock?: number
  
  // Stripe integration (unchanged)
  stripePriceID?: string
  stripeID?: string
  
  // Legacy support for existing cart system
  limitedEdition: boolean // Maps to isLimitedEdition
}

// Filter types for the store
export interface ProductFilters {
  category?: 'shirt' | 'hoodie' | 'pants' | 'accessories' | 'all'
  targetAudience?: 'women' | 'men' | 'unisex' | 'all'
  colors?: string[]
  sizes?: string[]
  priceRange?: [number, number]
  isLimitedEdition?: boolean
  isFeatured?: boolean
  search?: string
}

// Color mapping for hex values to readable names
export const COLOR_MAP: Record<string, string> = {
  '#000000': 'Black',
  '#808080': 'Gray',
  '#00008B': 'Navy',
  '#FFFFFF': 'White',
  '#FF0000': 'Red',
  '#008000': 'Green',
  '#0000FF': 'Blue',
  '#FFFF00': 'Yellow',
  '#800080': 'Purple',
  '#FFA500': 'Orange',
}

// Size order for consistent display
export const SIZE_ORDER = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'one-size']

// Category display names
export const CATEGORY_NAMES: Record<string, string> = {
  shirt: 'Shirts',
  hoodie: 'Hoodies',
  pants: 'Pants',
  accessories: 'Accessories',
}

// Target audience display names
export const TARGET_AUDIENCE_NAMES: Record<string, string> = {
  women: 'Women',
  men: 'Men',
  unisex: 'Unisex',
}
