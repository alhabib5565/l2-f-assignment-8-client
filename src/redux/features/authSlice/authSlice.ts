import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

type TUser = {
  email: string;
  role: string;
  name?: string;
  userId: string;
};

type TInitaialState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TInitaialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    updateToken: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

const authPersistConfig = {
  key: "auth",
  storage,
};

export const userPersistedReducer = persistReducer(
  authPersistConfig,
  authSlice.reducer
);

export const { login, logout, updateToken } = authSlice.actions;
