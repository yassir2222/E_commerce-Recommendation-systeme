import CategoryBtn from '@/components/category/CategoryBtn'
import ProductCard from '@/components/home/ProductCard'
import { getCategories, getCategory } from '@/lib/api'
import { Category, Product } from '@/lib/type'
import React from 'react'

export async function generationStaticParams(){
  const categories = await getCategories()
  return categories.map((cat: Category) => ({slug: cat.slug}))
}


const CategoryPage = async ({params}: {params: Promise<{slug: string}>}) => {

  const { slug } = await params;


  const [categories,category] = await Promise.all([getCategories(), getCategory(slug)])
  const products = category.products
  return (
    <div className='main-max-width mx-auto padding-x py-9'>
        <p className="font-semibold text-center">{category.name}</p>


        <div className="flex-center flex-wrap my-6 gap-4">
          {categories.map((cat: Category) => <CategoryBtn key={cat.id} cat={cat} />)}
            
            
        </div>


        <div className='flex-center flex-wrap my-6 gap-4'>
            {products.map((prod: Product) => <ProductCard key={prod.id} product={prod} />)}
        </div>


    </div>
  )
}

export default CategoryPage