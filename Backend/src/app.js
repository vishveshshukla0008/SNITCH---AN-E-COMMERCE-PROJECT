import express from "express";
import { errorHandler } from "./middlewares/error.middleware.js";
import authRoutes from "./routes/auth.Router.js";
import cookieParser from "cookie-parser";
import { emailTransporter } from "./services/email.Service.js";
import morgan from "morgan";
import cors from "cors";

export const app = express();

app.use(morgan("dev"));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes)
app.use(errorHandler)