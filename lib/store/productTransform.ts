import { Product } from '@/types/payload-types'
import { TShirt } from './data'

/**
 * Transform PayloadCMS Product to TShirt interface
 */
export function transformProductToTShirt (product: Product): TShirt {
  // Extract image URLs from the productImage field
  const images: string[] = []

  if (product.productImage && typeof product.productImage === 'object') {
    // Main image
    if (product.productImage.url) {
      images.push(product.productImage.url)
    }

    // Add thumbnail if available
    if (product.productImage.thumbnailURL) {
      images.push(product.productImage.thumbnailURL)
    }

    // Add other sizes if available
    if (product.productImage.sizes) {
      Object.values(product.productImage.sizes).forEach(size => {
        if (size && typeof size === 'object' && 'url' in size && size.url) {
          images.push(size.url)
        }
      })
    }
  }

  // If no images found, add placeholder
  if (images.length === 0) {
    images.push('/placeholder.svg?height=600&width=500')
  }

  // Create slug from name if not available
  const slug =
    product.name
      ?.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '') || `product-${product.id}`

  // Convert price from cents to euros (assuming PayloadCMS stores in cents)
  const price = typeof product.price === 'number' ? product.price / 100 : 0

  return {
    id: typeof product.id === 'string' ? parseInt(product.id) : product.id,
    slug,
    name: product.name || 'Unnamed Product',
    price,
    description: product.description || '',
    color: 'Black', // Default color - you might want to add this field to PayloadCMS
    colors: [{ name: 'Black', value: '#000000' }], // Default colors - you might want to add this field to PayloadCMS
    sizes: ['S', 'M', 'L', 'XL'], // Default sizes - you might want to add this field to PayloadCMS
    images,
    limitedEdition: true, // Default - you might want to add this field to PayloadCMS
    details: product.description || 'Premium quality product.',
    sizeAndFit: 'Regular fit. Please check size guide for measurements.',
    care: 'Machine wash cold. Do not bleach. Tumble dry low. Iron on low heat.',
    shipping: 'Standard delivery in 1-2 business days. Free delivery on all orders above €130.',
    returns: '30 day return policy. Items must be unworn and in original packaging.',
    payment: 'We accept all major credit cards, PayPal, and Apple Pay.',
  }
}

/**
 * Transform multiple PayloadCMS Products to TShirt array
 */
export function transformProductsToTShirts (products: Product[]): TShirt[] {
  return products.map(transformProductToTShirt)
}

/**
 * Create a slug-based lookup function for transformed products
 */
export function createTShirtLookup (products: Product[]) {
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
