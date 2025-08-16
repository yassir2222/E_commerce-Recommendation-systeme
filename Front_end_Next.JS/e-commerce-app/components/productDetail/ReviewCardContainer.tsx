import React from 'react'
import ReviewCard from './ReviewCard'
import { ProductDetails, Review ,User } from '@/lib/type'
import { auth } from '@/auth'
import { CollapsibleDemo } from '../uiComponents/Collapse'
const ReviewCardContainer = async  ({reviews, product}: {reviews: Review[] , product:ProductDetails}) => {

  const session = await auth()
  const user = session?.user 
  return (
    <div className="main-max-width mx-auto padding-x ">

      <CollapsibleDemo reviews={reviews} LoggedInUser={user} product={product}></CollapsibleDemo>


    </div>
  )
}

export default ReviewCardContainer