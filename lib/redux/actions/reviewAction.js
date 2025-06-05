import axiosInstance from "@/app/admin/service/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to get all reviews with optional query params
export const getAllReviews = createAsyncThunk(
  "reviews/getAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();

      if (params.page) query.append("page", params.page);
      if (params.limit) query.append("limit", params.limit);
      if (params.rating) query.append("rating", params.rating);
      if (params.sortBy) query.append("sortBy", params.sortBy);

      const res = await axiosInstance.get(
        `/api/v1/reviews?${query.toString()}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch reviews"
      );
    }
  }
);
