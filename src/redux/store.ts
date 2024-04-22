import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'
import { userPersistedReducer } from './features/authSlice/authSlice';
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import { cartPersistedReducer } from './features/cartSlice/cartSlice';
// import { cartReducer } from './features/cartSlice/cartSlice';

export const store = configureStore({
    reducer: {
        auth: userPersistedReducer,
        cart: cartPersistedReducer,
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(baseApi.middleware),
})

export let persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch