import { signIn, signOut, signUp } from "../../api/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const _signUp = createAsyncThunk(
    'auth/signUp',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const user = await signUp(email, password);
            return user;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }   
);

export const _signIn = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const user = await signIn(email, password);
            return user;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const _signOut = createAsyncThunk(
    'auth/signOut',
    async (_, { rejectWithValue }) => {
        try {
            await signOut();
            return true;
        } catch (err) {
            return rejectWithValue(err.message);
        }   
    }
);