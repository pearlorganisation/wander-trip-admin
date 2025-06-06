import axiosInstance from "@/lib/axiosInstance";
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

export const updateDestination = createAsyncThunk(
  "update/destination",
  async ({ slug, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(
        `/api/v1/destinations/${slug}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("data", data);
      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update destination."
      );
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createDestination = createAsyncThunk(
  "create/destination",
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axiosInstance.post(
        "/api/v1/destinations",
        data,
        config
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create destination"
      );
    }
  }
);

export const deleteDestinationById = createAsyncThunk(
  "destinations/deleteDestinationById",
  async (id, { rejectWithValue }) => {
    console.log(id);
    try {
      const res = await axiosInstance.delete(`/api/v1/destinations/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
