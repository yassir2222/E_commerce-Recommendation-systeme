import CategorySection from '@/components/home/CategorySection'
import CategorySectionSkeleton from '@/components/home/CategorySectionSkeleton'
import ProductSectionSkeleton from '@/components/home/ProductSectionSkeleton'

import Hero from '@/components/home/Hero'
import ProductSection from '@/components/home/ProductSection'
import React, { Suspense } from 'react'
import { auth } from '@/auth'
import RecommenderSection from '@/components/home/RecommenderSection'

const page = async () => {
  const session = await auth();
  const userEmail = session?.user?.email ?? null;
  return (
    <>
      <Hero />
      <Suspense fallback = {<CategorySectionSkeleton />}>
        <CategorySection />
      </Suspense>
      <Suspense fallback={<ProductSectionSkeleton />}>
      </Suspense>
      <ProductSection title="Featured Products"  similar_products={[]}/>
      <RecommenderSection userId={userEmail} />
    </>
  )
}

export default page