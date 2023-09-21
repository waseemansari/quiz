import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { api } from "../Services/api";
import authSlice from "./authSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";


export const store = configureStore({
  reducer: {
    auth: authSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});
setupListeners(store.dispatch);
export const persistor = persistStore(store);

