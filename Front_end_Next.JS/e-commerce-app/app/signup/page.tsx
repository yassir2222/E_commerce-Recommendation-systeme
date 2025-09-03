import React from "react";
import Link from "next/link";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 max-w-sm w-full flex flex-col gap-6">
        <h2 className="text-3xl font-semibold text-center text-gray-900">
          Create account
        </h2>

        {error && (
          <p className="text-sm text-red-600 text-center">
            {error === "SignupFailed" ? "Signup failed. Please try again." : "Something went wrong."}
          </p>
        )}

        <form
          action={async (formData) => {
            "use server";
            const first_name = String(formData.get("first_name") || "");
            const last_name = String(formData.get("last_name") || "");
            const email = String(formData.get("email") || "");
            const password = String(formData.get("password") || "");
            const username =
              String(formData.get("username") || "") || email.split("@")[0];

            console.log("Signup data:", { email, first_name, last_name, username });

            try {
              // Create user in Django API
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/create_user/`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    email,
                    first_name,
                    last_name,
                    username,
                    password,
                  }),
                }
              );

              if (!res.ok) {
                const errorData = await res.json();
                console.error("Signup failed:", errorData);
                redirect("/signup?error=SignupFailed");
              }

              const userData = await res.json();
              console.log("User created successfully:", userData);

              // Auto sign-in with credentials after signup
              await signIn("credentials", {
                email,
                password,
                redirectTo: "/",
              });
            } catch (error) {
              console.error("Signup error:", error);
              // Don't redirect on NEXT_REDIRECT errors as they're expected
              if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
                throw error; // Re-throw to allow Next.js to handle the redirect
              }
              redirect("/signup?error=SignupFailed");
            }
          }}
          className="flex flex-col gap-3"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                First name
              </label>
              <input
                name="first_name"
                required
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring focus:border-gray-400"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Last name
              </label>
              <input
                name="last_name"
                required
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring focus:border-gray-400"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Username</label>
            <input
              name="username"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring focus:border-gray-400"
              placeholder="john"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring focus:border-gray-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              minLength={6}
              required
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring focus:border-gray-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-black text-white font-medium py-3 rounded-lg shadow-sm transition-all duration-300 hover:opacity-90"
          >
            Create account
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link className="text-black font-medium underline" href="/signin">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}