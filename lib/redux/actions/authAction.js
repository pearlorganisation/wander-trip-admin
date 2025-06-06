import axiosInstance from "@/lib/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

// Login User
export const loginUser = createAsyncThunk(
  "login/user",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/api/v1/auth/login", {
        email,
        password,
      });
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Login failed";
      return rejectWithValue(message);
    }
  }
);

export const ForgetPassword = createAsyncThunk(
  "auth/forgetpaas",
  async ({ email }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const res = await axiosInstance.post("/api/v1/auth/forgot-password", {
        email,
      });
      toast.success("otp sended successfully!");
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || "failed to send otp";
      toast.error(message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Verify OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp, type }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/verify-otp",
        {
          email,
          otp,
          type,
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Reset Password
export const ResetPaasword = createAsyncThunk(
  "auth/resetpaas",
  async ({ email, newPassword, confirmNewPassword }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/reset-password",
        {
          email,
          newPassword,
          confirmNewPassword,
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get Profile
export const getProfile = createAsyncThunk(
  "get/profile",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axiosInstance.get("/api/v1/users/profile", config);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Change Password
export const changePaas = createAsyncThunk(
  "change/password",
  async (
    { currentPassword, newPassword, confirmNewPassword },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axiosInstance.post(
        "/api/v1/users/change-password",
        {
          currentPassword,
          newPassword,
          confirmNewPassword,
        },
        config
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  "logout/user",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      await axiosInstance.post(
        "http://localhost:5000/api/v1/auth/logout",
        {},
        config
      );
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
