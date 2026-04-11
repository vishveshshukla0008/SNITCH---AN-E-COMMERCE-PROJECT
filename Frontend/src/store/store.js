import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/Authentication/auth.slice";
import themeReducer from "../features/Theme/theme.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer
    }
})