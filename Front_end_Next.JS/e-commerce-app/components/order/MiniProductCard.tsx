import React from 'react'
import Image from "next/image"
import { OrderItemType } from '@/lib/type'
import { BASE_URL } from '@/lib/api'

const MiniProductCard = ({item}: {item: OrderItemType}) => {
  console.log("MiniProductCard received:", item)
  
  // Comprehensive error checking
  if (!item) {
    console.error("MiniProductCard: item is null/undefined")
    return <div className="text-red-500 p-4">Item is missing</div>
  }
  
  if (!item.product) {
    console.error("MiniProductCard: product is null/undefined", item)
    return <div className="text-red-500 p-4">Product data is missing for item #{item.id}</div>
  }

  return (
    <div className="w-[220px] rounded-lg shadow-md bg-white flex flex-col items-center gap-3 px-4 py-5 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
      <div className="w-[160px] h-[160px] rounded-md overflow-hidden">
        <Image
          src={item.product.image ? `${BASE_URL}${item.product.image}` : "/gaming_pad.jpg"}
          className="object-cover w-full h-full"
          width={160}
          height={160}
          alt={item.product.name || "Product thumbnail"}
        />
      </div>
    
      {/* Product Name - Remove the $ symbol */}
      <p className="text-center text-base font-medium text-gray-800">{item?.product?.name}</p>
    
      {/* Product Price */}
      <p className="text-[16px] text-center font-bold text-black">${item?.product?.price}</p>

      {/* Quantity */}
    </div>
  )
}

export default MiniProductCard