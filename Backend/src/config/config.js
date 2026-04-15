import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = ["PORT", "NODE_ENV", "MONGO_URI", "JWT_SECRET", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_REFRESH_TOKEN", "GOOGLE_USER", "FRONTEND_URL", "GOOGLE_CALLBACK_URL", "IMAGEKIT_PRIVATE_KEY"];

requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`${key} is missing in Environment Variables !`);
    }
})

export const config = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_USER: process.env.GOOGLE_USER,
    FRONTEND_URL: process.env.FRONTEND_URL,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY
}

