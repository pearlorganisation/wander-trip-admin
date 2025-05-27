import { createSlice } from "@reduxjs/toolkit";
import { getAlldestination } from "../actions/destinationAction"; // update the path as needed

const initialState = {
  isLoading: false,
  destinationsdata: {},
  success: false,
  error: false,
};

const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAlldestination.pending, (state) => {
        state.isLoading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(getAlldestination.fulfilled, (state, action) => {
        state.isLoading = false;
        state.destinationsdata = action.payload.data;
        state.success = true;
        state.error = false;
      })
      .addCase(getAlldestination.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.success = false;
      });
  },
});

// export default destinationSlice.reducer;
export default destinationSlice.reducer
