import { Product } from '@/types/payload-types'
import { EnhancedProduct, COLOR_MAP, SIZE_ORDER } from './types'
import { TShirt } from './data'

const PAYLOAD_PUBLIC_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

/**
 * Transform PayloadCMS Product to EnhancedProduct interface
 */
export function transformProductToEnhanced(product: Product): EnhancedProduct {
  // Extract image URLs from the productImage array
  const images: string[] = []

  if (product.productImage && Array.isArray(product.productImage)) {
    product.productImage.forEach(imageItem => {
      if (typeof imageItem === 'object' && imageItem !== null && 'url' in imageItem && imageItem.url) {
        // Ensure the URL is properly formatted with the base URL if needed
        const imageUrl = imageItem.url.startsWith('/')
          ? `${PAYLOAD_PUBLIC_URL}${imageItem.url}`
          : imageItem.url
        images.push(imageUrl)
      }
    })
  }

  // If no images found, add placeholder
  if (images.length === 0) {
    images.push('/placeholder.svg?height=600&width=500')
  }

  // Create slug from name if not available
  const slug = product.name
    ?.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '') || `product-${product.id}`

  // Convert price from cents to euros (assuming PayloadCMS stores in cents)
  const price = typeof product.price === 'number' ? product.price / 100 : 0

  // Map PayloadCMS colors to enhanced format
  const colors = product.colors && product.colors.length > 0
    ? product.colors.map(colorValue => ({
        name: COLOR_MAP[colorValue] || 'Unknown',
        value: colorValue
      }))
    : undefined

  // Map available sizes with proper ordering
  const availableSizes = product.availableSizes && product.availableSizes.length > 0
    ? product.availableSizes.sort((a, b) => {
        const aIndex = SIZE_ORDER.indexOf(a.toLowerCase())
        const bIndex = SIZE_ORDER.indexOf(b.toLowerCase())
        if (aIndex === -1 && bIndex === -1) return a.localeCompare(b)
        if (aIndex === -1) return 1
        if (bIndex === -1) return -1
        return aIndex - bIndex
      })
    : undefined

  // Extract details array
  const details = product.details && product.details.length > 0
    ? product.details.map(detail => detail.detail)
    : undefined

  // Extract made in countries
  const madeIn = product.madeIn && product.madeIn.length > 0
    ? product.madeIn.map(country => country.country)
    : undefined

  // Extract care instructions
  const careInstructions = product.careInstructions && product.careInstructions.length > 0
    ? product.careInstructions.map(instruction => instruction.instruction)
    : undefined

  // Handle size and fit information
  const sizeAndFit = product.sizeAndFit || undefined
  const customSizeAndFit = product.customSizeAndFit || undefined

  return {
    id: typeof product.id === 'string' ? parseInt(product.id) : product.id,
    slug,
    name: product.name || 'Unnamed Product',
    description: product.description || undefined,
    price,
    currency: product.currency,
    category: product.category,
    targetAudience: product.targetAudience,
    images,
    colors,
    availableSizes,
    details,
    madeIn,
    careInstructions,
    sizeAndFit,
    customSizeAndFit,
    shippingInfo: product.shippingInfo || undefined,
    isLimitedEdition: product.isLimitedEdition || false,
    isFeatured: product.isFeatured || false,
    stock: product.stock || undefined,
    stripePriceID: product.stripePriceID || undefined,
    stripeID: product.stripeID || undefined,
    // Legacy support for existing cart system
    limitedEdition: product.isLimitedEdition || product['Limited Edition'] || false,
  }
}

/**
 * Transform multiple PayloadCMS Products to EnhancedProduct array
 */
export function transformProductsToEnhanced(products: Product[]): EnhancedProduct[] {
  return products.map(transformProductToEnhanced)
}

/**
 * Legacy function: Transform PayloadCMS Product to TShirt interface for backward compatibility
 */
export function transformProductToTShirt(product: Product): TShirt {
  const enhanced = transformProductToEnhanced(product)
  
  // Convert enhanced product back to TShirt format for legacy compatibility
  const primaryColor = enhanced.colors?.[0]?.name || 'Black'
  const legacySizes = enhanced.availableSizes?.map(size => size.toUpperCase()) || ['S', 'M', 'L', 'XL']
  
  return {
    id: enhanced.id,
    slug: enhanced.slug,
    name: enhanced.name,
    price: enhanced.price,
    description: enhanced.description || '',
    color: primaryColor,
    colors: enhanced.colors || [{ name: 'Black', value: '#000000' }],
    sizes: legacySizes,
    images: enhanced.images,
    limitedEdition: enhanced.limitedEdition,
    details: enhanced.details?.join(' ') || enhanced.description || 'Premium quality product.',
    sizeAndFit: enhanced.customSizeAndFit || 
      (enhanced.sizeAndFit ? `${enhanced.sizeAndFit} fit` : 'Regular fit. Please check size guide for measurements.'),
    care: enhanced.careInstructions?.join(' ') || 'Machine wash cold. Do not bleach. Tumble dry low. Iron on low heat.',
    shipping: enhanced.shippingInfo || 'Standard delivery in 1-2 business days. Free delivery on all orders above €130.',
    returns: '30 day return policy. Items must be unworn and in original packaging.',
    payment: 'We accept all major credit cards, PayPal, and Apple Pay.',
  }
}

/**
 * Transform multiple PayloadCMS Products to TShirt array (legacy)
 */
export function transformProductsToTShirts(products: Product[]): TShirt[] {
  return products.map(transformProductToTShirt)
}

/**
 * Create a slug-based lookup function for enhanced products
 */
export function createEnhancedProductLookup(products: Product[]) {
  const enhancedProducts = transformProductsToEnhanced(products)
  const lookup = new Map<string, EnhancedProduct>()

  enhancedProducts.forEach(product => {
    lookup.set(product.slug, product)
  })

  return {
    products: enhancedProducts,
    getProductBySlug: (slug: string): EnhancedProduct | undefined => lookup.get(slug),
  }
}

/**
 * Create a slug-based lookup function for transformed products (legacy)
 */
export function createTShirtLookup(products: Product[]) {
  const tshirts = transformProductsToTShirts(products)
  const lookup = new Map<string, TShirt>()

  tshirts.forEach(tshirt => {
    lookup.set(tshirt.slug, tshirt)
  })

  return {
    tshirts,
    getTshirtBySlug: (slug: string): TShirt | undefined => lookup.get(slug),
  }
}
