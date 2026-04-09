import express from "express";
import { errorHandler } from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.Router.js";
import cookieParser from "cookie-parser";
import { emailTransporter } from "./services/email.Service.js";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes)
app.use(errorHandler)