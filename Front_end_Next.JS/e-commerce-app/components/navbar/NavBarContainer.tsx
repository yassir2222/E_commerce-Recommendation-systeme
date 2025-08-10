import React from 'react'
import NavBar from './NavBar'
import { auth } from '@/auth'

const NavBarContainer = async () => {
    const session = await auth()
    const user = session?.user
  return (
    <NavBar LoggedInUser={user}></NavBar>
  )
}

export default NavBarContainer