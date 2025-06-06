import { createSlice } from "@reduxjs/toolkit";
import { getAllUser } from "../actions/userAction";

const initialState = {
  isLoading: false,
  error: false,
  users: [],
  pagination: {},
  isUserLoggedIn: false,
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
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
        toast.error(state.error); // Show toast here
        state.isUserLoggedIn = false;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
        state.users = [];   
      });
  },
});

export default userSlice.reducer;
