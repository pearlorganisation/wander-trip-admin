import axiosInstance from "@/app/admin/service/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// file: /lib/redux/actions/userAction.js

export const getAllUser = createAsyncThunk(
  "auth/getAllUser",
  async ({ page, limit, searchQuery }, { rejectWithValue }) => {
    console.log("searchQuery in actioan: ", searchQuery);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

   
      const url = `/api/v1/users?search=${encodeURIComponent(
        searchQuery.trim()
      )}&page=${page}&limit=${limit}`;

      const { data } = await axiosInstance.get(url, config);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);


