import React from 'react'
import ReviewCard from './ReviewCard'
import { Review ,User } from '@/lib/type'
import { auth } from '@/auth'
import { CollapsibleDemo } from '../uiComponents/Collapse'
const ReviewCardContainer = async  ({reviews}: {reviews: Review[]}) => {

  const session = await auth()
  const user = session?.user 
  return (
    <div className="main-max-width mx-auto padding-x ">

      <CollapsibleDemo reviews={reviews} LoggedInUser={user}></CollapsibleDemo>
     
      
    </div>
  )
}

export default ReviewCardContainer