import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "@/auth";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 max-w-sm w-full flex flex-col gap-6">
        <h2 className="text-3xl font-semibold text-center text-gray-900">
          Welcome back
        </h2>

        {error && (
          <p className="text-sm text-red-600 text-center">
            {error === "CredentialsSignin"
              ? "Invalid email or password."
              : "Sign in failed."}
          </p>
        )}

        {/* Email & Password Login */}
        <form
          action={async (formData) => {
            "use server";
            const email = String(formData.get("email") || "");
            const password = String(formData.get("password") || "");
            await signIn("credentials", {
              email,
              password,
              redirectTo: "/",
            });
          }}
          className="flex flex-col gap-3"
        >
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
              required
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring focus:border-gray-400"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer bg-black text-white font-medium py-3 rounded-lg shadow-sm transition-all duration-300 hover:opacity-90"
          >
            Sign in
          </button>
        </form>

        <div className="flex items-center gap-3">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        {/* Google Sign In */}
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
        >
          <button className="w-full flex items-center cursor-pointer justify-center border border-gray-300 hover:border-gray-500 text-gray-700 font-medium py-3 rounded-lg shadow-sm transition-all duration-300 bg-white hover:bg-gray-100">
            <Image
              src="/google.png"
              alt="Google Icon"
              width={30}
              height={30}
              className="mr-3"
            />
            Continue with Google
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link className="text-black font-medium underline" href="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}