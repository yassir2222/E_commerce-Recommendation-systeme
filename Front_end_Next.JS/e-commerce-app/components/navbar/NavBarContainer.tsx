import React from 'react'
import NavBar from './NavBar'
import { auth } from '@/auth'

const NavBarContainer = async () => {
    const session = await auth()
    const user = session?.user

      const loggedInUser = user ? {
        name: user.name || '',
        email: user.email || '',
        image: user.image || ''
    } : null
  return (
    <NavBar LoggedInUser={loggedInUser}></NavBar>
  )
}

export default NavBarContainer