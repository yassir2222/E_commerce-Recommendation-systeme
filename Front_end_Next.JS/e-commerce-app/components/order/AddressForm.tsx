
"use client"
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { addAddress } from '@/lib/api'
import { toast } from 'react-toastify'
import { AddressType } from '@/lib/type'
const AddressForm = ({email, address}: {email: string | null |undefined, address: AddressType|undefined}) => {

    const [state , setState] = useState(address?.state? address.state : "")
    const [city , setCity] = useState(address?.city? address.city : "")
    const [street , setStreet] = useState(address?.street? address.street : "")
    const [phone , setPhone] = useState(address?.phone? address.phone : "")
    const [btnLoader, setBtnLoader] = useState(false)

    function disableButton(){
        if(state.trim().length==0 || city.trim().length==0 || street.trim().length==0 || phone.trim().length ==0){
            return true
        }
        return false

    }
    
async function handleAddAddress(e: React.FormEvent<HTMLElement>){
    e.preventDefault()
    const addressObj = {state,street,phone,city,email}
    setState("")
    setPhone("")
    setCity("")
    setStreet("")
    try{
        await addAddress(addressObj)
        toast.success("Your shipping address has been saved!")
    }
    catch(err:unknown){
        if(err instanceof Error){
            toast.error(err.message)
            throw new Error(err.message)
        }
        toast.error("An unknown error occured!")
        throw new Error("An unknown error occured!")
    }
    
}

  return (
    <form onSubmit={handleAddAddress} className="w-full max-w-lg mx-auto bg-white p-8 rounded-2xl space-y-6">

  <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
    Shipping Address
  </h2>

  <div className="space-y-4">
      <Input
      value={street}
      onChange={(e)=> setStreet(e.target.value)}
      placeholder="Street Address" 
      className="w-full h-12 px-4 rounded-md border-gray-300 focus:border-black focus:ring-2 focus:ring-black" 
      />
      <Input 

      value={city} 
      placeholder="City" 
      onChange={(e)=> setCity(e.target.value)}
      className="w-full h-12 px-4 rounded-md border-gray-300 focus:border-black focus:ring-2 focus:ring-black" 
      />
      <Input 
       value={state}
       onChange={(e)=> setState(e.target.value)}
       placeholder="State / Province" 
       className="w-full h-12 px-4 rounded-md border-gray-300 focus:border-black focus:ring-2 focus:ring-black" 
       />
 
      <Input 

      value={phone}
      onChange={(e)=> setPhone(e.target.value)}
      placeholder="Phone Number" 
      className="w-full h-12 px-4 rounded-md border-gray-300 focus:border-black focus:ring-2 focus:ring-black" 
      />
  </div>

  <button type="submit" disabled={disableButton() || btnLoader} className="w-full h-12 cursor-pointer bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
    {btnLoader ? "Saving Address...." : address?.city ? "Update Address" : "Save Address"}
  </button>

</form>
  )
}

export default AddressForm