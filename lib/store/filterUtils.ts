import { EnhancedProduct, ProductFilters } from './types'

/**
 * Filter products based on the provided filters
 */
export function filterProducts(products: EnhancedProduct[], filters: ProductFilters): EnhancedProduct[] {
  return products.filter(product => {
    // Category filter
    if (filters.category && filters.category !== 'all' && product.category !== filters.category) {
      return false
    }

    // Target audience filter
    if (filters.targetAudience && filters.targetAudience !== 'all' && product.targetAudience !== filters.targetAudience) {
      return false
    }

    // Color filter
    if (filters.colors && filters.colors.length > 0 && product.colors) {
      const productColorValues = product.colors.map(c => c.value)
      const hasMatchingColor = filters.colors.some(filterColor => 
        productColorValues.includes(filterColor)
      )
      if (!hasMatchingColor) {
        return false
      }
    }

    // Size filter
    if (filters.sizes && filters.sizes.length > 0 && product.availableSizes) {
      const hasMatchingSize = filters.sizes.some(filterSize => 
        product.availableSizes?.includes(filterSize)
      )
      if (!hasMatchingSize) {
        return false
      }
    }

    // Price range filter
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange
      if (product.price < minPrice || product.price > maxPrice) {
        return false
      }
    }

    // Limited edition filter
    if (filters.isLimitedEdition !== undefined && product.isLimitedEdition !== filters.isLimitedEdition) {
      return false
    }

    // Featured filter
    if (filters.isFeatured !== undefined && product.isFeatured !== filters.isFeatured) {
      return false
    }

    // Search filter
    if (filters.search && filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase().trim()
      const searchableText = [
        product.name,
        product.description,
        product.category,
        product.targetAudience,
        ...(product.details || []),
        ...(product.madeIn || []),
      ].join(' ').toLowerCase()
      
      if (!searchableText.includes(searchTerm)) {
        return false
      }
    }

    return true
  })
}

/**
 * Get all unique colors from products
 */
export function getAvailableColors(products: EnhancedProduct[]): { name: string; value: string }[] {
  const colorMap = new Map<string, { name: string; value: string }>()
  
  products.forEach(product => {
    if (product.colors) {
      product.colors.forEach(color => {
        colorMap.set(color.value, color)
      })
    }
  })
  
  return Array.from(colorMap.values()).sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Get all unique sizes from products
 */
export function getAvailableSizes(products: EnhancedProduct[]): string[] {
  const sizeSet = new Set<string>()
  
  products.forEach(product => {
    if (product.availableSizes) {
      product.availableSizes.forEach(size => {
        sizeSet.add(size)
      })
    }
  })
  
  // Sort sizes according to the predefined order
  const sizeOrder = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'one-size']
  return Array.from(sizeSet).sort((a, b) => {
    const aIndex = sizeOrder.indexOf(a.toLowerCase())
    const bIndex = sizeOrder.indexOf(b.toLowerCase())
    
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b)
    if (aIndex === -1) return 1
    if (bIndex === -1) return -1
    
    return aIndex - bIndex
  })
}

/**
 * Get price range from products
 */
export function getPriceRange(products: EnhancedProduct[]): [number, number] {
  if (products.length === 0) return [0, 100]
  
  const prices = products.map(p => p.price)
  return [Math.min(...prices), Math.max(...prices)]
}

/**
 * Get product counts by category
 */
export function getCategoryCounts(products: EnhancedProduct[]): Record<string, number> {
  const counts: Record<string, number> = {
    all: products.length,
    shirt: 0,
    hoodie: 0,
    pants: 0,
    accessories: 0,
  }
  
  products.forEach(product => {
    counts[product.category] = (counts[product.category] || 0) + 1
  })
  
  return counts
}

/**
 * Get product counts by target audience
 */
export function getTargetAudienceCounts(products: EnhancedProduct[]): Record<string, number> {
  const counts: Record<string, number> = {
    all: products.length,
    women: 0,
    men: 0,
    unisex: 0,
  }
  
  products.forEach(product => {
    counts[product.targetAudience] = (counts[product.targetAudience] || 0) + 1
  })
  
  return counts
}

/**
 * Create URL search params from filters
 */
export function filtersToSearchParams(filters: ProductFilters): URLSearchParams {
  const params = new URLSearchParams()
  
  if (filters.category && filters.category !== 'all') {
    params.set('category', filters.category)
  }
  
  if (filters.targetAudience && filters.targetAudience !== 'all') {
    params.set('audience', filters.targetAudience)
  }
  
  if (filters.colors && filters.colors.length > 0) {
    params.set('colors', filters.colors.join(','))
  }
  
  if (filters.sizes && filters.sizes.length > 0) {
    params.set('sizes', filters.sizes.join(','))
  }
  
  if (filters.priceRange) {
    params.set('minPrice', filters.priceRange[0].toString())
    params.set('maxPrice', filters.priceRange[1].toString())
  }
  
  if (filters.isLimitedEdition !== undefined) {
    params.set('limited', filters.isLimitedEdition.toString())
  }
  
  if (filters.isFeatured !== undefined) {
    params.set('featured', filters.isFeatured.toString())
  }
  
  if (filters.search) {
    params.set('search', filters.search)
  }
  
  return params
}

/**
 * Parse URL search params to filters
 */
export function searchParamsToFilters(searchParams: URLSearchParams): ProductFilters {
  const filters: ProductFilters = {}
  
  const category = searchParams.get('category')
  if (category && ['shirt', 'hoodie', 'pants', 'accessories'].includes(category)) {
    filters.category = category as any
  }
  
  const audience = searchParams.get('audience')
  if (audience && ['women', 'men', 'unisex'].includes(audience)) {
    filters.targetAudience = audience as any
  }
  
  const colors = searchParams.get('colors')
  if (colors) {
    filters.colors = colors.split(',').filter(Boolean)
  }
  
  const sizes = searchParams.get('sizes')
  if (sizes) {
    filters.sizes = sizes.split(',').filter(Boolean)
  }
  
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  if (minPrice && maxPrice) {
    filters.priceRange = [parseFloat(minPrice), parseFloat(maxPrice)]
  }
  
  const limited = searchParams.get('limited')
  if (limited !== null) {
    filters.isLimitedEdition = limited === 'true'
  }
  
  const featured = searchParams.get('featured')
  if (featured !== null) {
    filters.isFeatured = featured === 'true'
  }
  
  const search = searchParams.get('search')
  if (search) {
    filters.search = search
  }
  
  return filters
}
