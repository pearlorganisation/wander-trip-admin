"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      console.log("Form Data", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/dashboard");
    } catch (err) {
      // Handle login error if needed
      console.error("Login failed", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-md mx-auto p-6 bg-white shadow-md rounded-md"
    >
      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Remember Me */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="remember"
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="remember" className="text-sm text-gray-700">
          Remember me for 30 days
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full flex items-center justify-center px-4 py-2 text-white font-medium rounded-md ${
          isSubmitting
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </button>

      {/* Sign up link */}
      <div className="text-center text-sm text-gray-700">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
}
