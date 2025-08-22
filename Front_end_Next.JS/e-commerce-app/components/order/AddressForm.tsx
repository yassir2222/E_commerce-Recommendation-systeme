
"use client"
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
const AddressForm = () => {

    const [state , setState] = useState("")
    const [city , setCity] = useState("")
    const [street , setStreet] = useState("")
    const [phone , setPhone] = useState("")

    function disableButton(){
        if(state.trim().length==0 || city.trim().length==0 || street.trim().length==0 || phone.trim().length ==0){
            return true
        }
        return false

    }

  return (
    <form className="w-full max-w-lg mx-auto bg-white p-8 rounded-2xl space-y-6">

  <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
    Shipping Address
  </h2>

  <div className="space-y-4">
      <Input type="text" 
      id="street-address" 
      value={street}
      onChange={(e)=> setState(e.target.value)}
      placeholder="Street Address" 
      className="w-full h-12 px-4 rounded-md border-gray-300 focus:border-black focus:ring-2 focus:ring-black" 
      />
      <Input 
      type="text" 
      id="city"
      value={city} 
      placeholder="City" 
      onChange={(e)=> setState(e.target.value)}
      className="w-full h-12 px-4 rounded-md border-gray-300 focus:border-black focus:ring-2 focus:ring-black" 
      />
      <Input type="text"
       id="state" 
       value={state}
       onChange={(e)=> setState(e.target.value)}
       placeholder="State / Province" 
       className="w-full h-12 px-4 rounded-md border-gray-300 focus:border-black focus:ring-2 focus:ring-black" 
       />
 
      <Input 
      type="tel" 
      id="phone-number" 
      value={phone}
      onChange={(e)=> setState(e.target.value)}
      placeholder="Phone Number" 
      className="w-full h-12 px-4 rounded-md border-gray-300 focus:border-black focus:ring-2 focus:ring-black" 
      />
  </div>

  <button type="submit" disabled={disableButton()} className="w-full h-12 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
    Save Address
  </button>

</form>
  )
}

export default AddressForm