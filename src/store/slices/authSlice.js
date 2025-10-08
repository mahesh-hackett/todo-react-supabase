import { createSlice} from "@reduxjs/toolkit";
import { _signIn, _signUp, _signOut } from "../api.helpers/auth";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoading: false,
        authError: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(_signIn.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_signIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.authError = null;
            })
            .addCase(_signIn.rejected, (state, action) => {
                state.isLoading = false;
                state.authError = action.payload;
            })

            .addCase(_signUp.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_signUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.authError = null;
            })
            .addCase(_signUp.rejected, (state, action) => {
                state.isLoading = false;
                state.authError = action.payload;
            })

            .addCase(_signOut.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_signOut.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.authError = null;
            })
            .addCase(_signOut.rejected, (state, action) => {
                state.isLoading = false;
                state.authError = action.payload;
            })
    }
})

export default authSlice.reducer;