import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { uploadImageAndGetPublicUrl } from "../../api/global";

export const _uploadImageAndGetPublicUrl = createAsyncThunk(
    "images/uploadImageAndGetPublicUrl",
    async (file, { rejectWithValue }) => {

        try {
            const imageUrl = await uploadImageAndGetPublicUrl(file);
            return imageUrl;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)