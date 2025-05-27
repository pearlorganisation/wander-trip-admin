import axiosInstance from "@/app/service/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify"; // ✅ Import toast

export const getAlldestination = createAsyncThunk(
  "getAll/destination",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axiosInstance.get(
        `/api/v1/destinations?page=${page}&limit=${limit}`,
        config
      );
      console.log("data", data);
      return data;
    } catch (error) {
      // ✅ Show error toast
      toast.error(
        error.response?.data?.message || "Failed to fetch destinations."
      );
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
