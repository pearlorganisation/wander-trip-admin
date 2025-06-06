import { createSlice } from "@reduxjs/toolkit";
import {
  changePaas,
  ForgetPassword,
  getProfile,
  loginUser,
  logout,
  ResetPaasword,
} from "../actions/authAction";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  error: false,
  isUserLoggedIn: false,
  user: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isUserLoggedIn = false;
      state.error = false;
      toast.info("Logged out successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isUserLoggedIn = true;
        toast.success("Login successful!");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.isUserLoggedIn = false;
        toast.error(state.error);
      })

      // Forgot Password
      .addCase(ForgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ForgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(ForgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Reset Password
      .addCase(ResetPaasword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ResetPaasword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(ResetPaasword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Change Password
      .addCase(changePaas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePaas.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(changePaas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
