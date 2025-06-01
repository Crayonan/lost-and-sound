import { useCart } from '@/lib/store/CartContext'// Assuming you have a user context
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function CheckoutButton() {
  const { state: cartState } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      // Step 1: Create order in your system
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartState.items.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        }),
      })

      if (!orderResponse.ok) {
        throw new Error('Failed to create order')
      }

      const order = await orderResponse.json()

      // Step 2: Create Stripe checkout session
      const checkoutResponse = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartState.items.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
          orderId: order.orderId.toString(),
          successUrl: `${window.location.origin}/checkout/success`,
          cancelUrl: `${window.location.origin}/checkout/cancel`,
        }),
      })

      if (!checkoutResponse.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { url } = await checkoutResponse.json()

      // Step 3: Redirect to Stripe Checkout
      window.location.href = url
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Checkout failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button className='w-full' size='lg' onClick={handleCheckout} disabled={isLoading}>
      {isLoading ? 'Processing...' : 'Proceed to Checkout'}
    </Button>
  )
}
