/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const WishlistTooltip = ({LoggedInUserEmail} : {LoggedInUserEmail: string | null |undefined }) => {
  return (
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild  className="wish-btn disabled:opacity-50 disabled:cursor-not-allowed" >
         Add to Wishlist
      {/*   <Button 
        className="wish-btn disabled:opacity-50 disabled:cursor-not-allowed" 
        disabled={!Boolean(LoggedInUserEmail)}>
            Add to Wishlist
        </Button> */}
    </TooltipTrigger>
    <TooltipContent>
      <p>Login to add product to wishlist.</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

  )
}

export default WishlistTooltip