
const ResponsiveNavBar = () => {
  return (
    <nav className="max-container padding-x py-6 max-md:block hidden dark:text-[#FFFFFF]">
    <ul className="flex items-center justify-center gap-6 text-[#3B3C4A] lg:flex-1 flex-col dark:text-[#FFFFFF]">

   
   
              <li>Hi , lambrass </li>
              <li className="cursor-pointer">Logout</li>
              <li>
                  Login
              </li>

              <li>
                  Register
              </li>
         
       

          <li className="font-semibold">
              Create Post
          </li>
    </ul>
  </nav>
  )
}

export default ResponsiveNavBar