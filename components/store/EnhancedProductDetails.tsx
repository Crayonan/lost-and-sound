'use client'

import { useState } from 'react'
import { EnhancedProduct } from '@/lib/store/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/lib/store/CartContext'
import { formatPrice } from '@/lib/utils'
import { TShirt } from '@/lib/store/data'

interface EnhancedProductDetailsProps {
    product: EnhancedProduct
    locale: string
}

export default function EnhancedProductDetails({ product, locale }: EnhancedProductDetailsProps) {
    const [selectedSize, setSelectedSize] = useState<string>('')
    const [selectedColor, setSelectedColor] = useState<string>('')
    const { addToCart } = useCart()

    const handleAddToCart = () => {
        if (product.category !== 'accessories' && (!selectedSize || !selectedColor)) {
            alert('Please select size and color')
            return
        }

        // Convert EnhancedProduct to TShirt format for cart compatibility
        const tshirtProduct: TShirt = {
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            description: product.description || '',
            color: selectedColor || (product.colors?.[0]?.name || ''),
            colors: product.colors || [],
            sizes: product.availableSizes || [],
            images: product.images,
            limitedEdition: product.limitedEdition,
            details: product.details?.join('. ') || '',
            sizeAndFit: product.sizeAndFit === 'custom' ? product.customSizeAndFit || '' : product.sizeAndFit || '',
            care: product.careInstructions?.join('. ') || '',
            shipping: product.shippingInfo || '',
            returns: '30 day return policy. Items must be unworn and in original packaging.',
            payment: 'We accept all major credit cards, PayPal, and Apple Pay.'
        }

        addToCart(
            tshirtProduct,
            1, // quantity
            selectedSize || 'one-size',
            selectedColor || 'default'
        )
    }

    const isAccessory = product.category === 'accessories'

    return (
        <div className="space-y-6">
            {/* Product Header */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="capitalize">
                        {product.category}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                        {product.targetAudience}
                    </Badge>
                    {product.isLimitedEdition && (
                        <Badge variant="destructive">Limited Edition</Badge>
                    )}
                    {product.isFeatured && (
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                            Featured
                        </Badge>
                    )}
                </div>

                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-2xl font-semibold text-primary mb-4">
                    {formatPrice(product.price)}
                </p>

                {product.description && (
                    <p className="text-muted-foreground leading-relaxed">
                        {product.description}
                    </p>
                )}
            </div>

            <Separator />

            {/* Size and Color Selection */}
            {!isAccessory && (
                <div className="space-y-4">
                    {/* Size Selection */}
                    {product.availableSizes && product.availableSizes.length > 0 && (
                        <div>
                            <h3 className="font-semibold mb-2">Size</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.availableSizes.map((size) => (
                                    <Button
                                        key={size}
                                        variant={selectedSize === size ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedSize(size)}
                                        className="uppercase"
                                    >
                                        {size}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Color Selection */}
                    {product.colors && product.colors.length > 0 && (
                        <div>
                            <h3 className="font-semibold mb-2">Color</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.colors.map((color) => (
                                    <Button
                                        key={color.name}
                                        variant={selectedColor === color.name ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedColor(color.name)}
                                        className="capitalize"
                                    >
                                        {color.name}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Size & Fit Information */}
            {product.sizeAndFit && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Size & Fit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="capitalize font-medium">
                            {product.sizeAndFit === 'custom' ? product.customSizeAndFit : product.sizeAndFit}
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Add to Cart */}
            <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full"
                disabled={!isAccessory && (!selectedSize || !selectedColor)}
            >
                Add to Cart
            </Button>

            {/* Product Details Tabs */}
            <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="care">Care</TabsTrigger>
                    <TabsTrigger value="origin">Origin</TabsTrigger>
                    <TabsTrigger value="shipping">Shipping</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {product.details && product.details.length > 0 ? (
                                <ul className="space-y-2">
                                    {product.details.map((detail, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-primary">•</span>
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted-foreground">No additional details available.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="care" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Care Instructions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {product.careInstructions && product.careInstructions.length > 0 ? (
                                <ul className="space-y-2">
                                    {product.careInstructions.map((instruction, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-primary">•</span>
                                            <span>{instruction}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted-foreground">Standard care instructions apply.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="origin" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Made In</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {product.madeIn && product.madeIn.length > 0 ? (
                                <div className="space-y-2">
                                    {product.madeIn.map((country, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <span className="font-medium">{country}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">Origin information not available.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="shipping" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {product.shippingInfo ? (
                                <p>{product.shippingInfo}</p>
                            ) : (
                                <p className="text-muted-foreground">Standard shipping applies.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
