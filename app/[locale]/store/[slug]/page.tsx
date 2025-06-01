import { notFound } from "next/navigation"
import { getProducts } from "@/lib/payloadAPI"
import { createTShirtLookup } from "@/lib/store/productTransform"
import { ProductGallery } from "@/components/store/ProductGallery"
import { ProductDetails } from "@/components/store/ProductDetails"

interface ProductPageProps {
    params: {
        slug: string
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    // Fetch products from PayloadCMS
    const products = await getProducts()
    const { getTshirtBySlug } = createTShirtLookup(products)
    const product = getTshirtBySlug(params.slug)

    if (!product) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Product Gallery */}
                    <ProductGallery images={product.images} name={product.name} />

                    {/* Product Details */}
                    <ProductDetails product={product} />
                </div>
            </div>
        </div>
    )
}

// Generate static params for all products
export async function generateStaticParams() {
    const products = await getProducts()
    const { tshirts } = createTShirtLookup(products)

    return tshirts.map((product) => ({
        slug: product.slug,
    }))
}
