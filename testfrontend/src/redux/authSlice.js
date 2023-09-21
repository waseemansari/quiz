import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "authSlice",
  version: 1,
  storage,
  blacklist: [],
};

const initialState = {
  isLoggedIn: false,
  userDetail: null,
  userPermissions: [], 
  loading: false,
  userToken: null,
  error: null,
  success: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (state, data) => {
      state.isLoggedIn = true;
      state.userDetail = data.payload;
      //state.userPermissions = data.payload?.user?.permission;
    },
    updateUserProfile: (state, data) => {
      state.userDetail.user = { ...state.userDetail.user, ...data.payload };
    },
    userLogout: (state, data) => {
      state.userDetail = null;
      state.isLoggedIn = false;
    }, 
    
  },
});

export const { loggedIn, userLogout, updateUserProfile } = authSlice.actions;

export default persistReducer(persistConfig, authSlice.reducer);
