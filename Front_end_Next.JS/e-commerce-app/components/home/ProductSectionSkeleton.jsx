import React from 'react'
import ProductCardSkeleton from '@/components/home/ProductCardSkeleton'
const ProductSectionSkeleton = () => (
    <section className="main-max-width padding-x mx-auto my-16 animate-pulse">
        {/* Title Skeleton */}
        <div className="my-9 h-6 w-56 bg-gray-300 mx-auto rounded-md"></div>

        {/* Product Skeleton Cards */}
        <div className="flex-center flex-wrap gap-4 ">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
        </div>
    </section>
)


export default ProductSectionSkeleton