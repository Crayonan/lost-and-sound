'use client'

import { useState } from 'react'
import { useCart } from '@/lib/store/CartContext'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

export default function CheckoutButton() {
    const { state: cartState, clearCart } = useCart()
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    const getTotalPrice = () => {
        return cartState.total.toFixed(2)
    }

    const handleCheckout = async () => {
        if (cartState.items.length === 0) {
            toast({
                title: "Cart is empty",
                description: "Please add items to your cart before checking out.",
                variant: "destructive",
            })
            return
        }

        setLoading(true)

        try {
            // Create order first
            const orderRes = await fetch('http://localhost:3000/api/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cartState.items.map(item => ({
                        productId: item.product.id,
                        productName: item.product.name,
                        price: item.product.price,
                        quantity: item.quantity,
                        selectedSize: item.selectedSize,
                        selectedColor: item.selectedColor,
                    })),
                    total: cartState.total,
                }),
            })

            if (!orderRes.ok) {
                throw new Error('Failed to create order')
            }

            const order = await orderRes.json()

            // Create checkout session
            const checkoutRes = await fetch('http://localhost:3000/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cartState.items.map(item => ({
                        productId: item.product.id,
                        productName: item.product.name,
                        price: item.product.price,
                        quantity: item.quantity,
                        selectedSize: item.selectedSize,
                        selectedColor: item.selectedColor,
                    })),
                    orderId: order.orderId.toString(),
                    successUrl: `${window.location.origin}/checkout/success`,
                    cancelUrl: `${window.location.origin}/checkout/cancel`,
                }),
            })

            if (!checkoutRes.ok) {
                throw new Error('Failed to create checkout session')
            }

            const { url } = await checkoutRes.json()

            // Clear cart before redirecting
            clearCart()

            // Redirect to Stripe Checkout
            window.location.href = url

        } catch (error) {
            console.error('Checkout failed:', error)
            toast({
                title: "Checkout failed",
                description: "There was an error processing your checkout. Please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            onClick={handleCheckout}
            disabled={loading || cartState.items.length === 0}
            className="w-full"
            size="lg"
        >
            {loading ? 'Processing...' : `Checkout ($${getTotalPrice()})`}
        </Button>
    )
}
