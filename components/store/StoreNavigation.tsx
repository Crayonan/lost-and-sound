'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import {
    EnhancedProduct,
    ProductFilters,
    CATEGORY_NAMES,
    TARGET_AUDIENCE_NAMES
} from '@/lib/store/types'
import {
    filterProducts,
    getAvailableColors,
    getAvailableSizes,
    getPriceRange,
    getCategoryCounts,
    getTargetAudienceCounts,
    filtersToSearchParams,
    searchParamsToFilters
} from '@/lib/store/filterUtils'

interface StoreNavigationProps {
    products: EnhancedProduct[]
    onFilteredProductsChange: (products: EnhancedProduct[]) => void
    locale: string
}

export default function StoreNavigation({
    products,
    onFilteredProductsChange,
    locale
}: StoreNavigationProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Initialize filters from URL
    const [filters, setFilters] = useState<ProductFilters>(() =>
        searchParamsToFilters(searchParams)
    )

    const [searchTerm, setSearchTerm] = useState(filters.search || '')
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    // Get filter options from products
    const availableColors = getAvailableColors(products)
    const availableSizes = getAvailableSizes(products)
    const priceRange = getPriceRange(products)
    const categoryCounts = getCategoryCounts(products)
    const audienceCounts = getTargetAudienceCounts(products)

    // Apply filters and update URL
    useEffect(() => {
        const filteredProducts = filterProducts(products, filters)
        onFilteredProductsChange(filteredProducts)

        // Update URL with current filters
        const params = filtersToSearchParams(filters)
        const newUrl = `/${locale}/store${params.toString() ? `?${params.toString()}` : ''}`
        router.replace(newUrl, { scroll: false })
    }, [filters, products, onFilteredProductsChange, router, locale])

    // Handle search input
    const handleSearchChange = (value: string) => {
        setSearchTerm(value)
        setFilters(prev => ({ ...prev, search: value || undefined }))
    }

    // Handle filter changes
    const updateFilter = (key: keyof ProductFilters, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }

    // Clear all filters
    const clearAllFilters = () => {
        setFilters({})
        setSearchTerm('')
    }

    // Get active filter count
    const getActiveFilterCount = () => {
        let count = 0
        if (filters.category && filters.category !== 'all') count++
        if (filters.targetAudience && filters.targetAudience !== 'all') count++
        if (filters.colors && filters.colors.length > 0) count++
        if (filters.sizes && filters.sizes.length > 0) count++
        if (filters.priceRange) count++
        if (filters.isLimitedEdition !== undefined) count++
        if (filters.isFeatured !== undefined) count++
        if (filters.search) count++
        return count
    }

    const activeFilterCount = getActiveFilterCount()

    return (
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-4">
                {/* Main Navigation */}
                <div className="flex flex-col gap-4">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant={!filters.category || filters.category === 'all' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => updateFilter('category', 'all')}
                            className="text-xs"
                        >
                            All ({categoryCounts.all})
                        </Button>
                        {Object.entries(CATEGORY_NAMES).map(([key, name]) => (
                            <Button
                                key={key}
                                variant={filters.category === key ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => updateFilter('category', key)}
                                className="text-xs"
                            >
                                {name} ({categoryCounts[key] || 0})
                            </Button>
                        ))}
                    </div>

                    {/* Search and Filters Row */}
                    <div className="flex gap-2">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Filter Button */}
                        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="sm" className="relative">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filters
                                    {activeFilterCount > 0 && (
                                        <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                                            {activeFilterCount}
                                        </Badge>
                                    )}
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-80 overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>Filters</SheetTitle>
                                </SheetHeader>

                                <div className="space-y-6 mt-6">
                                    {/* Target Audience */}
                                    <div>
                                        <h3 className="font-medium mb-3">Target Audience</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="audience-all"
                                                    checked={!filters.targetAudience || filters.targetAudience === 'all'}
                                                    onCheckedChange={() => updateFilter('targetAudience', 'all')}
                                                />
                                                <label htmlFor="audience-all" className="text-sm">
                                                    All ({audienceCounts.all})
                                                </label>
                                            </div>
                                            {Object.entries(TARGET_AUDIENCE_NAMES).map(([key, name]) => (
                                                <div key={key} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`audience-${key}`}
                                                        checked={filters.targetAudience === key}
                                                        onCheckedChange={() => updateFilter('targetAudience', key)}
                                                    />
                                                    <label htmlFor={`audience-${key}`} className="text-sm">
                                                        {name} ({audienceCounts[key] || 0})
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Colors */}
                                    {availableColors.length > 0 && (
                                        <>
                                            <div>
                                                <h3 className="font-medium mb-3">Colors</h3>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {availableColors.map((color) => (
                                                        <div key={color.value} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`color-${color.value}`}
                                                                checked={filters.colors?.includes(color.value) || false}
                                                                onCheckedChange={(checked) => {
                                                                    const currentColors = filters.colors || []
                                                                    if (checked) {
                                                                        updateFilter('colors', [...currentColors, color.value])
                                                                    } else {
                                                                        updateFilter('colors', currentColors.filter(c => c !== color.value))
                                                                    }
                                                                }}
                                                            />
                                                            <div className="flex items-center space-x-2">
                                                                <div
                                                                    className="w-4 h-4 rounded-full border border-border"
                                                                    style={{ backgroundColor: color.value }}
                                                                />
                                                                <label htmlFor={`color-${color.value}`} className="text-sm">
                                                                    {color.name}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <Separator />
                                        </>
                                    )}

                                    {/* Sizes */}
                                    {availableSizes.length > 0 && (
                                        <>
                                            <div>
                                                <h3 className="font-medium mb-3">Sizes</h3>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {availableSizes.map((size) => (
                                                        <div key={size} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`size-${size}`}
                                                                checked={filters.sizes?.includes(size) || false}
                                                                onCheckedChange={(checked) => {
                                                                    const currentSizes = filters.sizes || []
                                                                    if (checked) {
                                                                        updateFilter('sizes', [...currentSizes, size])
                                                                    } else {
                                                                        updateFilter('sizes', currentSizes.filter(s => s !== size))
                                                                    }
                                                                }}
                                                            />
                                                            <label htmlFor={`size-${size}`} className="text-sm uppercase">
                                                                {size}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <Separator />
                                        </>
                                    )}

                                    {/* Price Range */}
                                    <div>
                                        <h3 className="font-medium mb-3">Price Range</h3>
                                        <div className="space-y-4">
                                            <Slider
                                                value={filters.priceRange || priceRange}
                                                onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
                                                max={priceRange[1]}
                                                min={priceRange[0]}
                                                step={5}
                                                className="w-full"
                                            />
                                            <div className="flex justify-between text-sm text-muted-foreground">
                                                <span>€{(filters.priceRange || priceRange)[0]}</span>
                                                <span>€{(filters.priceRange || priceRange)[1]}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Special Filters */}
                                    <div>
                                        <h3 className="font-medium mb-3">Special</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="limited-edition"
                                                    checked={filters.isLimitedEdition || false}
                                                    onCheckedChange={(checked) =>
                                                        updateFilter('isLimitedEdition', checked ? true : undefined)
                                                    }
                                                />
                                                <label htmlFor="limited-edition" className="text-sm">
                                                    Limited Edition
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="featured"
                                                    checked={filters.isFeatured || false}
                                                    onCheckedChange={(checked) =>
                                                        updateFilter('isFeatured', checked ? true : undefined)
                                                    }
                                                />
                                                <label htmlFor="featured" className="text-sm">
                                                    Featured
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Clear Filters */}
                                    {activeFilterCount > 0 && (
                                        <>
                                            <Separator />
                                            <Button
                                                variant="outline"
                                                onClick={clearAllFilters}
                                                className="w-full"
                                            >
                                                Clear All Filters
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Active Filters */}
                    {activeFilterCount > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {filters.category && filters.category !== 'all' && (
                                <Badge variant="secondary" className="text-xs">
                                    {CATEGORY_NAMES[filters.category]}
                                    <X
                                        className="h-3 w-3 ml-1 cursor-pointer"
                                        onClick={() => updateFilter('category', 'all')}
                                    />
                                </Badge>
                            )}
                            {filters.targetAudience && filters.targetAudience !== 'all' && (
                                <Badge variant="secondary" className="text-xs">
                                    {TARGET_AUDIENCE_NAMES[filters.targetAudience]}
                                    <X
                                        className="h-3 w-3 ml-1 cursor-pointer"
                                        onClick={() => updateFilter('targetAudience', 'all')}
                                    />
                                </Badge>
                            )}
                            {filters.colors?.map(color => {
                                const colorObj = availableColors.find(c => c.value === color)
                                return (
                                    <Badge key={color} variant="secondary" className="text-xs">
                                        {colorObj?.name}
                                        <X
                                            className="h-3 w-3 ml-1 cursor-pointer"
                                            onClick={() => {
                                                const newColors = filters.colors?.filter(c => c !== color)
                                                updateFilter('colors', newColors?.length ? newColors : undefined)
                                            }}
                                        />
                                    </Badge>
                                )
                            })}
                            {filters.sizes?.map(size => (
                                <Badge key={size} variant="secondary" className="text-xs">
                                    {size.toUpperCase()}
                                    <X
                                        className="h-3 w-3 ml-1 cursor-pointer"
                                        onClick={() => {
                                            const newSizes = filters.sizes?.filter(s => s !== size)
                                            updateFilter('sizes', newSizes?.length ? newSizes : undefined)
                                        }}
                                    />
                                </Badge>
                            ))}
                            {filters.isLimitedEdition && (
                                <Badge variant="secondary" className="text-xs">
                                    Limited Edition
                                    <X
                                        className="h-3 w-3 ml-1 cursor-pointer"
                                        onClick={() => updateFilter('isLimitedEdition', undefined)}
                                    />
                                </Badge>
                            )}
                            {filters.isFeatured && (
                                <Badge variant="secondary" className="text-xs">
                                    Featured
                                    <X
                                        className="h-3 w-3 ml-1 cursor-pointer"
                                        onClick={() => updateFilter('isFeatured', undefined)}
                                    />
                                </Badge>
                            )}
                            {filters.search && (
                                <Badge variant="secondary" className="text-xs">
                                    "{filters.search}"
                                    <X
                                        className="h-3 w-3 ml-1 cursor-pointer"
                                        onClick={() => {
                                            setSearchTerm('')
                                            updateFilter('search', undefined)
                                        }}
                                    />
                                </Badge>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}