import { AsyncWrapper } from "../utils/AsyncWrapper.js";

export const errorHandler = AsyncWrapper((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    if (err.errors.length) {
        message = err.errors.map((err) => err.message);
        console.log(message);
    }
    return res.status(statusCode).json({ success: false, message });
})