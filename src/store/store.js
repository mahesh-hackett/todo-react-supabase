import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './slices/todoSlice';
import authSlice from './slices/authSlice';

const store = configureStore({
    reducer: {
        todo: todoReducer,
        auth: authSlice
    }
})

export default store;