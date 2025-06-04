import axiosInstance from "@/app/service/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createCategory = createAsyncThunk(
  "create/category",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/v1/category", data);

      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create category"
      );
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "category/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/v1/categories");
      return response.data; // Assuming it returns an array of categories
    } catch (error) {
      console.error("Error fetching categories:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);
