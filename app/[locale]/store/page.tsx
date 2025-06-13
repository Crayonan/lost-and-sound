'use client'

import { useState, useEffect, useCallback, use } from 'react'
import { getProducts } from '@/lib/payloadAPI'
import { transformProductsToEnhanced } from '@/lib/store/productTransform'
import { EnhancedProduct } from '@/lib/store/types'
import StoreNavigation from '@/components/store/StoreNavigation'
import EnhancedProductGrid from '@/components/store/EnhancedProductGrid'
import Loader from '@/components/ui/loader'

interface StorePageProps {
    params: Promise<{ locale: string }>
}

export default function StorePage({ params }: StorePageProps) {
    const { locale } = use(params)
    const [products, setProducts] = useState<EnhancedProduct[]>([])
    const [filteredProducts, setFilteredProducts] = useState<EnhancedProduct[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Fetch products on component mount
    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true)
                const payloadProducts = await getProducts(locale)
                const enhancedProducts = transformProductsToEnhanced(payloadProducts)
                setProducts(enhancedProducts)
                setFilteredProducts(enhancedProducts)
            } catch (err) {
                console.error('Error fetching products:', err)
                setError('Failed to load products. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [locale])

    // Handle filtered products from navigation - memoized to prevent infinite loops
    const handleFilteredProductsChange = useCallback((filtered: EnhancedProduct[]) => {
        setFilteredProducts(filtered)
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto mb-4">
                        <Loader />
                    </div>
                    <p className="text-muted-foreground">Loading products...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
                    <p className="text-muted-foreground">{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b">
                <div className="container mx-auto px-4 py-10">
                    <h1 className="text-center text-white text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider mb-24 mt-12">
                        Our Store
                    </h1>
                </div>
            </div>

            {/* Navigation and Filters */}
            <StoreNavigation
                products={products}
                onFilteredProductsChange={handleFilteredProductsChange}
                locale={locale}
            />

            {/* Product Grid */}
            <div className="container mx-auto px-4 py-8">
                <EnhancedProductGrid
                    products={filteredProducts}
                    locale={locale}
                />
            </div>

            {/* Footer */}
            <div className="border-t mt-16">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center text-muted-foreground space-y-2">
                        <p>Showing {filteredProducts.length} of {products.length} products</p>
                        {filteredProducts.length !== products.length && (
                            <p className="text-sm">Use filters above to refine your search</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}