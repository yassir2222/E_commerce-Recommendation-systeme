"use client"
import React, { useState } from 'react'
import Image from "next/image"
import { Minus, Plus, X } from 'lucide-react'
import Button from '../uiComponents/Button'
import { CartitemType } from '@/lib/type'
import { BASE_URL } from '@/lib/api'
import { useCart } from '../context/CartContext'
import { updateCartitemAction } from '@/lib/action'
import { toast } from 'react-toastify'

const CartItem = ({cartitem}: {cartitem: CartitemType}) => {

  const { cartCode} = useCart()

  const sub_total = Number(cartitem.sub_total);
  const formattedSubtotal = sub_total.toFixed(2)

  const [quantity,setQuantity] = useState(cartitem.quantity)

  const [cartitemUpdateLoader,setCartitemUpdateLoader] = useState(false)


  function increaseQuantity(){
    setQuantity(curr => curr + 1)
  }
  function decreaseQuantity(){
    setQuantity(curr => curr - 1)
  }

  async function handleUpdateCartitem(){
    setCartitemUpdateLoader(true)
    const formData = new FormData();
    formData.set("quantity", String(quantity))
    formData.set("cartitem_id", String(cartitem.id))
    formData.set("cart_code", cartCode?cartCode:'')
    console.log("id+ "+String(cartitem.id))
    try{
      await updateCartitemAction(formData)
      toast.success(`Item - ${cartitem.product.name}'s quantity has been updated !`)
    }
    catch(err:unknown){
      if(err instanceof Error){
        toast.error(err.message)
        throw new Error(err.message)
      }
      throw new Error("An unknown error ")

    }
    finally{
      setCartitemUpdateLoader(false)
    }

  }

  return (
    <div className="flex items-center justify-between gap-6 border-b border-gray-200 py-4 mb-6 w-full flex-wrap bg-white px-4 rounded-lg shadow-sm">
    
        {/* Product Image */}
        <div className="relative overflow-hidden w-[70px] h-[70px] rounded-lg border border-gray-200">
          <Image
            src={`${BASE_URL}${cartitem.product.image}`}
            alt="cartitem-img"
            className="object-cover"
            fill
          />
        </div>
    
        {/* Product Details - Name and Price */}
        <div className="flex-1 min-w-[120px]">
          <p className="font-semibold text-gray-800">{cartitem.product.name}</p>
          <p className="text-gray-600 text-sm mt-1">{cartitem.product.price}</p>
        </div>
    
        {/* Quantity Selector */}
        <div className="flex items-center justify-center gap-2 bg-gray-100 px-2 py-1 rounded-md">
          {/* Decrease Quantity Button */}
          <button 
          onClick={decreaseQuantity}
          disabled={quantity == 1}
            className="p-2 rounded-md bg-white border hover:bg-gray-200 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="w-5 h-5 text-gray-700" />
          </button>
    
          {/* Quantity Display */}
          <div className="w-[50px] h-[40px] flex items-center justify-center font-medium bg-white border border-gray-300 rounded-md shadow-sm">
            {quantity}
          </div>
    
          {/* Increase Quantity Button */}
          <button 
          onClick={increaseQuantity}

            className="p-2 rounded-md bg-white border cursor-pointer hover:bg-gray-200 transition"
          >
            <Plus className="w-5 h-5 text-gray-700" />
          </button>
        </div>
    
        {/* Subtotal Price */}
        <p className="text-lg font-semibold text-gray-800">{formattedSubtotal}</p>
    
        {/* Remove Item Button */}
        <button 
          className="p-2 rounded-md bg-red-50 hover:bg-red-100 transition text-red-500 border border-red-300"
        >
          <X className="w-5 h-5" />
        </button>
    
        {/* Update Cart Button */}
        <Button className='update-item-btn' disabled={cartitemUpdateLoader} handleClick={handleUpdateCartitem}>
          {cartitemUpdateLoader ?"Updating ....." : "Update Cart"}
        </Button>
     
      </div>
  )
}

export default CartItem