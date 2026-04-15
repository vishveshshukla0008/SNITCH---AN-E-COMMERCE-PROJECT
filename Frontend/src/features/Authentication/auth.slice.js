import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        authLoading: true,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAuthLoading: (state, action) => {
            state.authLoading = action.payload
        },
    }
})

export const { setAuthLoading, setUser } = authSlice.actions;
export default authSlice.reducer;