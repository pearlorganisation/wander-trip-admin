import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import reviewReducer from "./slices/reviewSlice";
import destinationReducer from "./slices/destinationSlice";
import userReducer from "./slices/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  reviews: reviewReducer,
  destination: destinationReducer,
  users: userReducer,
});
export default rootReducer;
