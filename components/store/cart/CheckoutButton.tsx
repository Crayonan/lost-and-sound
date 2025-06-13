'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useCart } from '@/lib/store/CartContext'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

export default function CheckoutButton() {
    const { state: cartState, clearCart } = useCart()
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const params = useParams()
    const locale = params?.locale as string || 'en'

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
            // Get auth token if you have user authentication
            // const authToken = localStorage.getItem('auth-token') // Uncomment if you have auth

            // Create order first
            const orderRes = await fetch('http://localhost:3000/api/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${authToken}`, // Uncomment if you have auth
                },
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
                    // userId: currentUser?.id, // Add if you have user context
                }),
            })

            if (!orderRes.ok) {
                const errorData = await orderRes.json()
                throw new Error(errorData.error || 'Failed to create order')
            }

            const order = await orderRes.json()

            localStorage.setItem("checkoutOrderId", order.orderId.toString());

            // Create checkout session with locale support
            const checkoutRes = await fetch('http://localhost:3000/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${authToken}`, // Uncomment if you have auth
                },
                body: JSON.stringify({
                    items: cartState.items.map(item => ({
                        productId: item.product.id,
                        quantity: item.quantity,
                    })),
                    orderId: order.orderId.toString(),
                    locale: locale,
                    // Auto-generate locale-aware URLs (remove explicit URLs)
                    // successUrl: `${window.location.origin}/${locale}/checkout/success`,
                    // cancelUrl: `${window.location.origin}/${locale}/checkout/cancel`,
                }),
            })

            if (!checkoutRes.ok) {
                const errorData = await checkoutRes.json()
                throw new Error(errorData.error || 'Failed to create checkout session')
            }

            const { url } = await checkoutRes.json()

            if (!url) {
                throw new Error('No checkout URL received')
            }


            // Show success message
            toast({
                title: "Redirecting to checkout",
                description: "You will be redirected to Stripe Checkout shortly.",
            })

            // Small delay to show the toast
            setTimeout(() => {
                window.location.href = url
            }, 1000)

        } catch (error) {
            console.error('Checkout failed:', error)
            toast({
                title: "Checkout failed",
                description: error instanceof Error ? error.message : "There was an error processing your checkout. Please try again.",
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