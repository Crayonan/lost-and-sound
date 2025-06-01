"use client"

import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/store/CartContext"

export function CartTrigger() {
    const { toggleCart, getItemCount } = useCart()
    const itemCount = getItemCount()

    return (
        <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount > 99 ? "99+" : itemCount}
                </span>
            )}
            <span className="sr-only">Open cart</span>
        </Button>
    )
}
