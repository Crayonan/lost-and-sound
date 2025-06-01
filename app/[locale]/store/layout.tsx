import type { ReactNode } from 'react'
import { CartProvider } from '@/lib/store/CartContext'
import { CartSidebar } from '@/components/store/cart/CartSidebar'
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
    title: "ORBYZ Store",
    description: "Premium t-shirt collection inspired by Tomorrowland",
}

export default function StoreLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <CartProvider>
            {children}
            <CartSidebar />
            <Toaster />
        </CartProvider>
    )
}