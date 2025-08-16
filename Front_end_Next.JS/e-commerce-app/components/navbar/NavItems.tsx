import React from "react";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { signOutUser } from "@/lib/action";
import { useCart } from "../context/CartContext";


interface Props{
    mobile?: boolean
    LoggedInUser:{ 
        name : string;
        email : string;
        image : string;
      
      }
}

const NavItems = ({mobile , LoggedInUser} : Props) => {

  const {cartItemsCount} = useCart()
  return (
    <div className={cn("flex items-center justify-center gap-6", mobile ? "flex-col" : "flex-row")}>
      {LoggedInUser ? <>
       
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden shadow-md">
        {/* Profile picture container */}
        <Image src={LoggedInUser.image} alt="profile" width={40} height={40} className="object-cover w-full h-full" />
      </div>

      <Link
        href="/profile"
        className="text-lg font-medium text-gray-900 hover:text-gray-700 transition"
      >
        {LoggedInUser.name}
      </Link>

      <button className="nav-btn" onClick={signOutUser}>Logout</button>


</>

:
      <Link href="/signin" className="nav-btn">Login</Link>

}

      <div className="relative flex items-center h-[60px] w-[60px] justify-center cursor-pointer">
        <FaCartShopping className="text-4xl" />

      { cartItemsCount == 0 || <span className="absolute top-0 right-0 px-2 py-1 bg-black rounded-full text-white">
          {cartItemsCount}
        </span>}
      </div>
    </div>
  );
};

export default NavItems;