import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { createNewUser, getExistingUser } from "./lib/api"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],


callbacks: {
  async signIn({profile}){
    try{
      const email = profile?.email
      const first_name = profile?.given_name
      const last_name = profile?.family_name
      const username = profile?.email?.split("@")[0]
      const profile_picture_url = profile?.picture
      const userObj = {email , first_name , last_name , username , profile_picture_url}
      console.log(profile)

      try{
        await getExistingUser(email)
      }catch (error) {
        console.log(error)
        await createNewUser(userObj)
      }
      return true
    }

    catch(err:unknown){
      return false
    }
  }
}

})