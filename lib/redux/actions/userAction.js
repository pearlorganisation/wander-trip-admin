import axiosInstance from "@/app/service/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllUser = createAsyncThunk(
  "get/alluser",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.get(
        `/api/v1/users?page=${page}&limit=${limit}`,
        config
      );
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "login/user",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/api/v1/auth/login`, {
        email,
        password,
      });
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to login"
      );
    }
  }
);
