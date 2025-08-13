import CategorySection from '@/components/home/CategorySection'
import CategorySectionSkeleton from '@/components/home/CategorySectionSkeleton'
import ProductSectionSkeleton from '@/components/home/ProductSectionSkeleton'

import Hero from '@/components/home/Hero'
import ProductSection from '@/components/home/ProductSection'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <>
      <Hero />
      <Suspense fallback = {<CategorySectionSkeleton />}>
        <CategorySection />
      </Suspense>
      <Suspense fallback={<ProductSectionSkeleton />}>
      </Suspense>
      <ProductSection title="Featured Products"  />
    </>
  )
}

export default page