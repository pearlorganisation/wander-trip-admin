"use client";

import { verifyOtp } from "@/lib/redux/actions/authAction";
import { useRouter } from "next/router";

import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { toast } from "sonner";
const OTPPage = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();
  const handleVerifyOTP = () => {
    if (!email || !otp || otp.length !== 4) {
      setMessage("Email and valid 4-digit OTP are required");
      return;
    }

    try {
      const res = dispatch(verifyOtp({ email, otp, type }));

      if (res.payload?.success) {
        toast.success(res.payload.message || "OTP verified successfully");

        if (res.payload.action === "RESET_PASSWORD") {
          router.push(`/reset-password?email=${encodeURIComponent(email)}`);
        } else {
          router.push("/login");
        }
      } else {
        setMessage(res.payload?.message || "OTP verification failed");
        toast.error(res.payload?.message || "OTP verification failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred during OTP verification");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          OTP Verification
        </h2>

        <label className="block mb-2 font-medium">4-digit OTP</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "");
            setOtp(val.slice(0, 4));
          }}
          maxLength={4}
          placeholder="Enter OTP"
          className="w-full px-4 py-2 border rounded-md mb-4"
        />

        <button
          onClick={handleVerifyOTP}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Verify OTP
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default OTPPage;
