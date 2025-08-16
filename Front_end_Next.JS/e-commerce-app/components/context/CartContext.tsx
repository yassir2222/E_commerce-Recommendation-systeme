"use client"

import { api } from "@/lib/api";
import { generateRandomString } from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";
interface CartContextProps{
    cartCode: string | null
    cartItemsCount: number;
    setcartItemsCount: React.Dispatch<React.SetStateAction<number>>
    clearCartCode: () =>void

}
const CartContext = createContext<CartContextProps | null>(null);

export function CartProvider({children}: {children: React.ReactNode}) {
  const [cartCode, setCartCode] = useState<string |null>(null);
  const [cartItemsCount, setcartItemsCount] = useState(0)
  useEffect(() => {
        async function getCartItemCount() {
            try{
                const response = await api.get(`get_cart_stat?cart_code=${cartCode}`)
                setcartItemsCount(response.data.num_of_items)
                return response.data
            }
            catch (err: unknown){
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("an unknown error occured");
        }
        }

        getCartItemCount()
  } , [cartCode])

  useEffect(() =>{
    let code = localStorage.getItem("cartcode")
    if(!code){
      code=generateRandomString()
      localStorage.setItem("cartcode",code)
    }
    setCartCode(code)

    }, [])

    function clearCartCode(){
          localStorage.removeItem("cartcode")
          setCartCode(null)
    }

    return(
        <CartContext.Provider value={{cartCode, cartItemsCount , setcartItemsCount, clearCartCode}}>
             {children}
        </CartContext.Provider>
    )
}

export function useCart(){
    const context = useContext(CartContext)
    if(!context) throw new Error("useCart must be used within a CartProvider")
    return context
}

