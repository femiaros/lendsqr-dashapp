import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from './api/apiSlice'
import usersReducer from '../features/users/usersSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        users: usersReducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})