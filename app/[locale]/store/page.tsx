import type { Metadata } from 'next'
import ProductList from '@/components/store/ProductView'
import { getProducts } from '@/lib/payloadAPI'
import { transformProductsToTShirts } from '@/lib/store/productTransform'

export const metadata: Metadata = {
    title: 'T-Shirt Collection',
    description: 'Discover our premium t-shirt selection',
}

export default async function StorePage({ params }: { params: { locale: string } }) {
    const { locale } = params

    // Fetch products from PayloadCMS
    const products = await getProducts()
    const tshirts = transformProductsToTShirts(products)

    return (
        <div className="min-h-screen bg-background">
            <div className="border-b">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-center mb-2">T-Shirt Collection</h1>
                    <p className="text-muted-foreground text-center">
                        Discover our premium t-shirt selection
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <ProductList locale={locale} products={tshirts} />
            </div>

            <div className="border-t mt-16">
                <div className="container mx-auto px-4 py-8">
                    <p className="text-center text-muted-foreground">Showing {tshirts.length} products</p>
                </div>
            </div>
        </div>
    )
}
