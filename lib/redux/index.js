import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import reviewReducer from "./slices/reviewSlice";
import destinationReducer from './slices/destinationSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  reviews: reviewReducer,
  destination: destinationReducer,
  
});
export default rootReducer;
