import { encryptTransform } from "redux-persist-transform-encrypt";
 import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "./customStorage";
import rootReducer from ".";
 
const rootReducerWithClear = (state , action ) => {
  if (action.type === "readyToMove/clearReduxState") {
    state = undefined;
    localStorage.clear();
    sessionStorage.clear();
  }
  return rootReducer(state, action);
};

// Redux-persist configuration
const persistConfig = {
  key: "WanderTrip", // Ensure unique key
  version: 1,
  storage,
  transforms: [
    encryptTransform({
      secretKey: `jsdfjsdhfshdfksdhf`,
      onError: (err) => {
        console.error("Persist Transform Error:", err);
      },
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducerWithClear);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
// export type AppDispatch = typeof store.dispatch;
