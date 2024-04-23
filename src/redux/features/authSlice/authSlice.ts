import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

type TUser = {
    email: string;
    name?: string
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
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

const persistConfig = {
    key: "root",
    storage,
};

export const userPersistedReducer = persistReducer(
    persistConfig,
    authSlice.reducer
);

export const { login, logout } = authSlice.actions;
