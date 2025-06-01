"use client"

import { useState } from "react"
import { Heart, Truck, RotateCcw, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { TShirt } from "@/lib/store/data"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useCart } from "@/lib/store/CartContext"
import { toast } from "sonner"

interface ProductDetailsProps {
    product: TShirt
}

export function ProductDetails({ product }: ProductDetailsProps) {
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [selectedColor, setSelectedColor] = useState(product.color)
    const [quantity, setQuantity] = useState(1)
    const { addToCart } = useCart()

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error("Please select a size")
            return
        }

        addToCart(product, quantity, selectedSize, selectedColor)
        toast.success(`Added ${quantity} ${product.name} to cart`)
    }

    return (
        <div className="space-y-6">
            {/* Product Name and Badge */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight">{product.name}</h1>
                {product.limitedEdition && (
                    <Badge variant="secondary" className="mt-2 bg-primary text-primary-foreground">
                        LIMITED EDITION
                    </Badge>
                )}
            </div>

            {/* Price */}
            <div className="text-xl font-semibold">€{product.price.toFixed(2)}</div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Color • {selectedColor}</span>
                </div>
                <div className="flex gap-2">
                    {product.colors.map((color) => (
                        <button
                            key={color.name}
                            className={`w-8 h-8 rounded-full border-2 ${color.name === selectedColor
                                ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                                : "border-border hover:border-primary/50"
                                }`}
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                            onClick={() => setSelectedColor(color.name)}
                        />
                    ))}
                </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Size</span>
                    <a href="#" className="text-xs underline hover:no-underline">
                        Size guide
                    </a>
                </div>
                <div className="grid grid-cols-6 gap-2">
                    {product.sizes.map((size) => (
                        <button
                            key={size}
                            className={`border py-2 text-sm font-medium transition-colors ${selectedSize === size
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border hover:border-primary/50 hover:bg-accent"
                                }`}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quantity Selection */}
            <div className="space-y-2">
                <span className="text-sm font-medium">Quantity</span>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => setQuantity(quantity + 1)}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-2 pt-4">
                <Button className="flex-1" size="lg" onClick={handleAddToCart} disabled={!selectedSize}>
                    ADD TO CART
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12">
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Add to wishlist</span>
                </Button>
            </div>

            {/* Shipping Info */}
            <div className="space-y-2 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    <span>Official Lost and Sound Design</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    <span>Delivery time is 1-2 business days</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    <span>Free delivery on all orders above €130</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <RotateCcw className="h-4 w-4" />
                    <span>30 day return policy</span>
                </div>
            </div>

            {/* Accordion Details */}
            <div className="border-t pt-6">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="details">
                        <AccordionTrigger className="text-sm font-medium">DETAILS</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">{product.details}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="size">
                        <AccordionTrigger className="text-sm font-medium">SIZE & FIT</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">{product.sizeAndFit}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="care">
                        <AccordionTrigger className="text-sm font-medium">CARE</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">{product.care}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="shipping">
                        <AccordionTrigger className="text-sm font-medium">SHIPPING</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">{product.shipping}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="returns">
                        <AccordionTrigger className="text-sm font-medium">RETURNS</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">{product.returns}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="payment">
                        <AccordionTrigger className="text-sm font-medium">PAYMENT</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">{product.payment}</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}
