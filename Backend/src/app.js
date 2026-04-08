import express from "express"
import { errorHandler } from "./middlewares/error.middleware.js";

export const app = express();

app.use(errorHandler);