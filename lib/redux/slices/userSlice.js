import { createSlice } from "@reduxjs/toolkit";
import { getAllUser, getUserBySearch } from "../actions/userAction";

const initialState = {
  isLoading: false,
  error: null,
  users: [],
  pagination: {},
  isUserLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },
    logoutUser: (state) => {
      state.isUserLoggedIn = false;
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.users || [];
        state.pagination = action.payload.pagination || {};
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to load users";
      })
      .addCase(getUserBySearch.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserBySearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data || [];
        state.pagination = action.payload.pagination || {};
      })
      .addCase(getUserBySearch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to load users";
      });
  },
});

export const { setUserLoggedIn, logoutUser } = userSlice.actions;
export default userSlice.reducer;
