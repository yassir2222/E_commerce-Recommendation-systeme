import NextAuth from "next-auth";
import Google, { GoogleProfile } from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

type AppUser = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          console.log("Attempting login with:", credentials?.email);
          console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
          
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          console.log("Login response status:", res.status);
          
          if (!res.ok) {
            const errorData = await res.json();
            console.error("Login failed:", errorData);
            return null;
          }

          const apiUser = (await res.json()) as {
            id: number | string;
            email: string;
            username?: string | null;
            first_name?: string | null;
            last_name?: string | null;
            profile_picture_url?: string | null;
          };

          console.log("API user data:", apiUser);

          const displayName =
            (apiUser.username ??
            [apiUser.first_name, apiUser.last_name].filter(Boolean).join(" ") )||
            apiUser.email;

          const user: AppUser = {
            id: String(apiUser.id),
            name: displayName || null,
            email: apiUser.email,
            image: apiUser.profile_picture_url ?? null,
          };

          console.log("Returning user:", user);
          return user;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      try {
        if (account?.provider === "google") {
          const googleProfile = profile as GoogleProfile | undefined;
          const email = googleProfile?.email;
          const first_name = googleProfile?.given_name;
          const last_name = googleProfile?.family_name;
          const username = email ? email.split("@")[0] : undefined;
          const profile_picture_url = googleProfile?.picture;

          if (!email) return false;

          try {
            // You'll need to implement these functions
            // await getExistingUser(email);
          } catch {
            // await createNewUser({
            //   email,
            //   first_name,
            //   last_name,
            //   username,
            //   profile_picture_url,
            // });
          }
        }
        return true;
      } catch {
        return false;
      }
    },
  },
});