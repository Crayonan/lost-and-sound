"use client"

import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/store/CartContext"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import CheckoutButton from "./CheckoutButton"

export function CartSidebar() {
    const { state, closeCart, updateQuantity, removeFromCart } = useCart()

    return (
        <Sheet open={state.isOpen} onOpenChange={closeCart}>
            <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5" />
                        Shopping Cart ({state.items.reduce((count, item) => count + item.quantity, 0)})
                    </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col h-full">
                    {state.items.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                <p className="text-muted-foreground">Your cart is empty</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Cart Items */}
                            <div className="flex-1 overflow-y-auto py-6">
                                <div className="space-y-6">
                                    {state.items.map((item, index) => (
                                        <div
                                            key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                                            className="flex gap-4"
                                        >
                                            {/* Product Image */}
                                            <div className="relative w-20 h-20 bg-muted rounded-md overflow-hidden">
                                                <Image
                                                    src={item.product.images[0] || "/placeholder.svg"}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 space-y-2">
                                                <div>
                                                    <h3 className="font-medium text-sm">{item.product.name}</h3>
                                                    <p className="text-xs text-muted-foreground">
                                                        {item.selectedColor} • {item.selectedSize}
                                                    </p>
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() =>
                                                            updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)
                                                        }
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() =>
                                                            updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)
                                                        }
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>

                                                {/* Price and Remove */}
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium text-sm">
                                                        €{(item.product.price * item.quantity).toFixed(2)}
                                                    </span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                        onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Cart Footer */}
                            <div className="border-t pt-6 space-y-4">
                                {/* Subtotal */}
                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total</span>
                                    <span>€{state.total.toFixed(2)}</span>
                                </div>

                                {/* Checkout Button */}
                                <CheckoutButton />

                                {/* Continue Shopping */}
                                <Button variant="outline" className="w-full" onClick={closeCart}>
                                    Continue Shopping
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
