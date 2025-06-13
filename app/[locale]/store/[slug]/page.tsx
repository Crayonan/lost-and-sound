import { notFound } from "next/navigation"
import { use } from "react"
import { getProducts } from "@/lib/payloadAPI"
import { transformProductsToEnhanced } from "@/lib/store/productTransform"
import { ProductGallery } from "@/components/store/ProductGallery"
import EnhancedProductDetails from "@/components/store/EnhancedProductDetails"

interface ProductPageProps {
    params: Promise<{
        slug: string
        locale: string
    }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug, locale } = await params

    // Fetch products from PayloadCMS with locale
    const products = await getProducts(locale)
    const enhancedProducts = transformProductsToEnhanced(products)

    // Find the product by slug
    const product = enhancedProducts.find(p => p.slug === slug)

    if (!product) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 mt-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Product Gallery */}
                    <ProductGallery images={product.images} name={product.name} />

                    {/* Enhanced Product Details */}
                    <EnhancedProductDetails product={product} locale={locale} />
                </div>
            </div>
        </div>
    )
}

// Generate static params for all products
export async function generateStaticParams() {
    // Generate params for both locales
    const locales = ['en', 'de']
    const allParams = []

    for (const locale of locales) {
        const products = await getProducts(locale)
        const enhancedProducts = transformProductsToEnhanced(products)
        
        const localeParams = enhancedProducts.map((product) => ({
            slug: product.slug,
            locale: locale,
        }))
        
        allParams.push(...localeParams)
    }

    return allParams
}