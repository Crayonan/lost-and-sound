'use client'

import { EnhancedProduct } from '@/lib/store/types'
import EnhancedProductCard from './EnhancedProductCard'

interface EnhancedProductGridProps {
    products: EnhancedProduct[]
    locale: string
}

export default function EnhancedProductGrid({ products, locale }: EnhancedProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground max-w-md">
                    Try adjusting your filters or search terms to find what you're looking for.
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <EnhancedProductCard
                    key={product.id}
                    product={product}
                    locale={locale}
                />
            ))}
        </div>
    )
}
