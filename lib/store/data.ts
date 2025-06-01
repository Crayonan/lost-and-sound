export interface TShirt {
  id: number
  slug: string
  name: string
  price: number
  description: string
  color: string
  colors: { name: string; value: string }[]
  sizes: string[]
  images: string[]
  limitedEdition: boolean
  details: string
  sizeAndFit: string
  care: string
  shipping: string
  returns: string
  payment: string
}

export const tshirts: TShirt[] = [
  {
    id: 1,
    slug: 't-shirt-1',
    name: 'ORBYZ ELEMENTS LONGSLEEVE',
    price: 75.0,
    description:
      "The Orbyz Elements Longsleeve is inspired by the Tomorrowland Belgium theme of 2023 'ORBYZ'. The new theme, set in a magical universe made entirely out of ice, will reveal a hidden community that has existed under a gigantic ice cap for many years. Once the mass of ice and glaciers starts melting, the indigenous community rises to the surface, consisting of a unique source of light, energy, and power that originates from powerful, red-colored crystals and rocks.",
    color: 'White',
    colors: [{ name: 'White', value: '#FFFFFF' }],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: [
      '/placeholder.svg?height=600&width=500',
      '/placeholder.svg?height=600&width=500',
      '/placeholder.svg?height=600&width=500',
      '/placeholder.svg?height=600&width=500',
      '/placeholder.svg?height=600&width=500',
    ],
    limitedEdition: true,
    details:
      'Premium quality longsleeve t-shirt with custom Orbyz Elements design. Features a ribbed crew neck and comfortable fit.',
    sizeAndFit: 'Regular fit. The model is 185cm tall and wears size M.',
    care: 'Machine wash cold. Do not bleach. Tumble dry low. Iron on low heat.',
    shipping: 'Standard delivery in 1-2 business days. Free delivery on all orders above €130.',
    returns: '30 day return policy. Items must be unworn and in original packaging.',
    payment: 'We accept all major credit cards, PayPal, and Apple Pay.',
  },
  {
    id: 2,
    slug: 't-shirt-2',
    name: 'ORBYZ T-SHIRT WOMEN',
    price: 60.0,
    description:
      "The women's Orbyz T-shirt features a custom design inspired by the magical universe of Tomorrowland. Made with premium cotton for ultimate comfort and style.",
    color: 'Black',
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'White', value: '#FFFFFF' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      '/placeholder.svg?height=600&width=500',
      '/placeholder.svg?height=600&width=500',
      '/placeholder.svg?height=600&width=500',
    ],
    limitedEdition: true,
    details:
      'Premium quality t-shirt with custom Orbyz design. Features a comfortable fit and durable fabric.',
    sizeAndFit: "Regular women's fit. The model is 175cm tall and wears size S.",
    care: 'Machine wash cold. Do not bleach. Tumble dry low. Iron on low heat.',
    shipping: 'Standard delivery in 1-2 business days. Free delivery on all orders above €130.',
    returns: '30 day return policy. Items must be unworn and in original packaging.',
    payment: 'We accept all major credit cards, PayPal, and Apple Pay.',
  },
  {
    id: 3,
    slug: 't-shirt-3',
    name: 'ORBYZ T-SHIRT',
    price: 60.0,
    description:
      'The classic Orbyz T-shirt features the iconic logo design from the Tomorrowland universe. Perfect for everyday wear with premium quality materials.',
    color: 'Black',
    colors: [{ name: 'Black', value: '#000000' }],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      '/placeholder.svg?height=600&width=500',
      '/placeholder.svg?height=600&width=500',
      '/placeholder.svg?height=600&width=500',
    ],
    limitedEdition: true,
    details:
      'Premium quality t-shirt with the iconic Orbyz logo. Features a comfortable fit and durable fabric.',
    sizeAndFit: 'Regular fit. The model is 188cm tall and wears size L.',
    care: 'Machine wash cold. Do not bleach. Tumble dry low. Iron on low heat.',
    shipping: 'Standard delivery in 1-2 business days. Free delivery on all orders above €130.',
    returns: '30 day return policy. Items must be unworn and in original packaging.',
    payment: 'We accept all major credit cards, PayPal, and Apple Pay.',
  },
  {
    id: 4,
    slug: 't-shirt-4',
    name: 'ORBYZ ELEMENTS HOODIE',
    price: 135.0,
    description:
      'The Orbyz Elements Hoodie features the signature red crystal design from the magical Tomorrowland universe. Premium quality hoodie for ultimate comfort and style.',
    color: 'Black',
    colors: [{ name: 'Black', value: '#000000' }],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      '/placeholder.svg?height=600&width=500',
      '/placeholder.svg?height=600&width=500',
      '/placeholder.svg?height=600&width=500',
    ],
    limitedEdition: true,
    details:
      'Premium quality hoodie with custom Orbyz Elements design. Features a comfortable fit, kangaroo pocket, and adjustable hood.',
    sizeAndFit: 'Regular fit. The model is 185cm tall and wears size M.',
    care: 'Machine wash cold. Do not bleach. Tumble dry low. Iron on low heat.',
    shipping: 'Standard delivery in 1-2 business days. Free delivery on all orders above €130.',
    returns: '30 day return policy. Items must be unworn and in original packaging.',
    payment: 'We accept all major credit cards, PayPal, and Apple Pay.',
  },
  {
    id: 5,
    slug: 't-shirt-5',
    name: 'ORBYZ VINTAGE TEE',
    price: 65.0,
    description:
      'The Orbyz Vintage Tee combines retro styling with the magical elements of the Tomorrowland universe. Features a distressed print for an authentic vintage look.',
    color: 'Gray',
    colors: [
      { name: 'Gray', value: '#808080' },
      { name: 'Black', value: '#000000' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      '/placeholder.svg?height=600&width=500',
      '/placeholder.svg?height=600&width=500',
      '/placeholder.svg?height=600&width=500',
    ],
    limitedEdition: true,
    details:
      'Premium quality vintage-style t-shirt with distressed Orbyz print. Features a comfortable fit and soft fabric.',
    sizeAndFit: 'Relaxed fit. The model is 180cm tall and wears size M.',
    care: 'Machine wash cold. Do not bleach. Tumble dry low. Iron on low heat.',
    shipping: 'Standard delivery in 1-2 business days. Free delivery on all orders above €130.',
    returns: '30 day return policy. Items must be unworn and in original packaging.',
    payment: 'We accept all major credit cards, PayPal, and Apple Pay.',
  },
]

export function getTshirtBySlug (slug: string): TShirt | undefined {
  return tshirts.find(tshirt => tshirt.slug === slug)
}
