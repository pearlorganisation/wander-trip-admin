import { createSlice } from "@reduxjs/toolkit";
import {
  createDestination,
  deleteDestinationById,
  getAlldestination,
  updateDestination,
} from "../actions/destinationAction"; // update the path as needed

const initialState = {
  isLoading: false,
  destinationsdata: [],
  destinations: {},
  success: false,
  error: false,
  pagination: {},
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
        state.pagination = action.payload.pagination;
        state.success = true;
        state.error = false;
      })
      .addCase(getAlldestination.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.success = false;
      })
      .addCase(updateDestination.pending, (state) => {
        state.isLoading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(updateDestination.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.destinationsdata = action.payload.data;
        state.success = true;
        state.error = false;
      })
      .addCase(updateDestination.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.success = false;
      })
      .addCase(createDestination.pending, (state) => {
        state.isLoading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(createDestination.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.destinationsdata = action.payload.data;
        state.success = true;
        state.error = false;
      })
      .addCase(createDestination.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.success = false;
      })
      .addCase(deleteDestinationById.pending, (state) => {
        state.isLoading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(deleteDestinationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.destinationsdata = state.destinationsdata?.filter(
          (item) => item._id !== action.meta.arg
        );
        state.success = true;
        state.error = false;
      })

      .addCase(deleteDestinationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.success = false;
      });
  },
});

// export default destinationSlice.reducer;
export default destinationSlice.reducer;
