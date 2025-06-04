import { createSlice } from "@reduxjs/toolkit";
import { getAllUser } from "../actions/userAction";

const initialState = {
  isLoading: false,
  error: false,
  users: [],
  pagination: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data || [];
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
        state.users = [];
      });
  },
});

export default userSlice.reducer;
