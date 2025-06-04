import { createSlice } from "@reduxjs/toolkit";
import { createCategory, getAllCategories } from "../actions/categoryAction";

const initialState = {
  isLoading: false,
  success: false,
  error: null,
  category: null,
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetCategoryState: (state) => {
      state.isLoading = false;
      state.success = false;
      state.error = null;
      state.category = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.category = action.payload;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
      })
      // Get All Categories
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload?.data || [];
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCategoryState } = categorySlice.actions;

export default categorySlice.reducer;
