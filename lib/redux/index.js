import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import reviewReducer from "./slices/reviewSlice";
import destinationReducer from "./slices/destinationSlice";
import categoryReducer from "./slices/categorySlice";

const rootReducer = combineReducers({
  auth: authReducer,
  reviews: reviewReducer,
  destination: destinationReducer,
  category: categoryReducer,
});
export default rootReducer;
