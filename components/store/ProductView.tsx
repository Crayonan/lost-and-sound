'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TShirt } from '@/lib/store/data'

import React, { JSX } from 'react';

type ProductListProps = {
    locale: string;
    products: TShirt[];
};

export default function ProductList({ locale, products }: ProductListProps): JSX.Element {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((tshirt) => (
                <Link href={`/${locale}/store/${tshirt.slug}`} key={tshirt.id}>
                    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-card">
                        <div className="relative">
                            <div className="aspect-square overflow-hidden bg-muted">
                                <Image
                                    src={tshirt.images[0] || '/placeholder.svg'}
                                    alt={tshirt.name}
                                    width={400}
                                    height={400}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {tshirt.limitedEdition && (
                                <Badge
                                    variant="secondary"
                                    className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium"
                                >
                                    LIMITED EDITION
                                </Badge>
                            )}

                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-3 right-3 bg-background/80 hover:bg-background shadow-sm"
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
                                <h3 className="font-semibold text-lg uppercase tracking-wide">{tshirt.name}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold">€{tshirt.price.toFixed(2)}</span>
                                </div>
                                <Button className="w-full" variant="outline">
                                    View Product
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    )
}
