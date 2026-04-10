import express from "express";
import { errorHandler } from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.Router.js";
import cookieParser from "cookie-parser";
import { emailTransporter } from "./services/email.Service.js";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "./config/config.js";

export const app = express();
app.use(passport.initialize());

app.use(morgan("dev"));
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }));

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.GOOGLE_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile)
}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes)
app.use(errorHandler)