"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Product, Review ,ProductDetails} from "@/lib/type"
import ReviewCard from "../productDetail/ReviewCard"
import { User } from "next-auth"

export function CollapsibleDemo({
  reviews,
  LoggedInUser,
  product
}: { reviews: Review[]; LoggedInUser: any; product: ProductDetails }) {
  const [isOpen, setIsOpen] = React.useState(false)

  if (!reviews || reviews.length === 0) {
    return <p className="text-sm text-gray-500 px-4">No reviews yet.</p>
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex flex-col gap-2"
    >
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="my-4 font-semibold">
          {reviews.length < 2 ? "Review" : "Reviews"} ({reviews.length})
        </h4>

        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <ChevronsUpDown />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      {!isOpen && reviews[0] && (
        <ReviewCard
          key={reviews[0].id}
          review={reviews[0]}
          LoggedInUser={LoggedInUser}
          product={product}
        />
      )}

      <CollapsibleContent className="flex flex-col gap-2">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            LoggedInUser={LoggedInUser}
            product={product}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
