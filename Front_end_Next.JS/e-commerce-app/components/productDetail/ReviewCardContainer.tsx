import React from 'react'
import ReviewCard from './ReviewCard'
import { Review ,User } from '@/lib/type'
import { auth } from '@/auth'
const ReviewCardContainer = async  ({reviews}: {reviews: Review[]}) => {

  const session = await auth()
  const user = session?.user
  return (
    <div className="main-max-width mx-auto padding-x ">
      <h4 className="my-4 font-semibold">{reviews.length < 2? "Review": "Reviews" } ({reviews.length})</h4>
      {reviews.map((review) => <ReviewCard key={review.id} review={review} LoggedInUser={user} />)}
      
    </div>
  )
}

export default ReviewCardContainer