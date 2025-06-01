"use client"

import { useState } from "react"
import Image from "next/image"

interface ProductGalleryProps {
    images: string[]
    name: string
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0)

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Thumbnails - Vertical on desktop, horizontal on mobile */}
            <div className="order-2 md:order-1 flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`relative min-w-[80px] h-[80px] border-2 cursor-pointer ${selectedImage === index ? "border-black" : "border-transparent"
                            }`}
                        onClick={() => setSelectedImage(index)}
                    >
                        <Image
                            src={image || "/placeholder.svg"}
                            alt={`${name} thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Main Image */}
            <div className="order-1 md:order-2 md:col-span-4 relative aspect-square md:aspect-[4/5]">
                <Image
                    src={images[selectedImage] || "/placeholder.svg"}
                    alt={`${name} image ${selectedImage + 1}`}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        </div>
    )
}
