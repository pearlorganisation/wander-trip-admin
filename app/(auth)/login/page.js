"use client";
import { LoginForm } from "@/component/loginform";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Login Form Section */}

      {/* Image Section */}
      <div className="hidden sm:block sm:w-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://static.toiimg.com/photo/65008718.cms"
          alt="Scenic travel destination with mountains and lake"
        />
      </div>

      <div className="flex w-full flex-col justify-center px-4 py-12 sm:w-1/2 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please sign in to your account
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
