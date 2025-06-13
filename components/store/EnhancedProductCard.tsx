'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EnhancedProduct, CATEGORY_NAMES, TARGET_AUDIENCE_NAMES } from '@/lib/store/types'

interface EnhancedProductCardProps {
    product: EnhancedProduct
    locale: string
}

export default function EnhancedProductCard({ product, locale }: EnhancedProductCardProps) {
    return (
        <Link href={`/${locale}/store/${product.slug}`}>
            <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-card">
                <div className="relative">
                    <div className="aspect-square overflow-hidden bg-muted">
                        <Image
                            src={product.images[0] || '/placeholder.svg'}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {product.isLimitedEdition && (
                            <Badge
                                variant="secondary"
                                className="bg-red-500 text-white text-xs font-medium"
                            >
                                LIMITED
                            </Badge>
                        )}
                        {product.isFeatured && (
                            <Badge
                                variant="secondary"
                                className="bg-yellow-500 text-black text-xs font-medium"
                            >
                                <Star className="h-3 w-3 mr-1" />
                                FEATURED
                            </Badge>
                        )}
                    </div>

                    {/* Category and Target Audience */}
                    <div className="absolute top-3 right-3 flex flex-col gap-1">
                        <Badge variant="outline" className="text-xs bg-background/80">
                            {CATEGORY_NAMES[product.category]}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-background/80">
                            {TARGET_AUDIENCE_NAMES[product.targetAudience]}
                        </Badge>
                    </div>

                    {/* Favorite Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute bottom-3 right-3 bg-background/80 hover:bg-background shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                            e.preventDefault()
                            // Add favorite functionality here
                        }}
                    >
                        <Heart className="h-4 w-4" />
                        <span className="sr-only">Add to favorites</span>
                    </Button>
                </div>

                <CardContent className="p-4">
                    <div className="space-y-3">
                        {/* Product Name */}
                        <h3 className="font-semibold text-lg uppercase tracking-wide line-clamp-2">
                            {product.name}
                        </h3>

                        {/* Colors */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">Colors:</span>
                                <div className="flex gap-1">
                                    {product.colors.slice(0, 4).map((color, index) => (
                                        <div
                                            key={index}
                                            className="w-4 h-4 rounded-full border border-border"
                                            style={{ backgroundColor: color.value }}
                                            title={color.name}
                                        />
                                    ))}
                                    {product.colors.length > 4 && (
                                        <span className="text-xs text-muted-foreground">
                                            +{product.colors.length - 4}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Sizes */}
                        {product.availableSizes && product.availableSizes.length > 0 && (
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">Sizes:</span>
                                <div className="flex gap-1 flex-wrap">
                                    {product.availableSizes.slice(0, 6).map((size, index) => (
                                        <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                                            {size.toUpperCase()}
                                        </Badge>
                                    ))}
                                    {product.availableSizes.length > 6 && (
                                        <span className="text-xs text-muted-foreground">
                                            +{product.availableSizes.length - 6}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Made In */}
                        {product.madeIn && product.madeIn.length > 0 && (
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">Made in:</span>
                                <span className="text-xs">
                                    {product.madeIn.slice(0, 2).join(', ')}
                                    {product.madeIn.length > 2 && ` +${product.madeIn.length - 2}`}
                                </span>
                            </div>
                        )}

                        {/* Price and Stock */}
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold">
                                €{product.price.toFixed(2)}
                            </span>
                            {product.stock !== undefined && product.stock < 10 && product.stock > 0 && (
                                <Badge variant="outline" className="text-xs text-orange-600">
                                    Only {product.stock} left
                                </Badge>
                            )}
                            {product.stock === 0 && (
                                <Badge variant="outline" className="text-xs text-red-600">
                                    Out of stock
                                </Badge>
                            )}
                        </div>

                        {/* Description Preview */}
                        {product.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {product.description}
                            </p>
                        )}

                        {/* Action Button */}
                        <Button
                            className="w-full"
                            variant="outline"
                            disabled={product.stock === 0}
                        >
                            {product.stock === 0 ? 'Out of Stock' : 'View Product'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
