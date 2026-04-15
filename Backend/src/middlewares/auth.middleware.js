import { userModel } from "../models/user.model.js";
import { AsyncWrapper } from "../utils/AsyncWrapper.js";
import { verifyToken } from "../utils/jwt.Utils.js";
import { AppError } from "../utils/AppError.js";
import { getRedis } from "../config/cache.js";

export const authUser = AsyncWrapper(async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) throw new AppError(401, "Invalid Access ! Please Login again !");

    const redis = await getRedis();

    const isBlacklisted = await redis.get(`blacklisted:${token}`);
    if (isBlacklisted) throw new AppError(401, "Invalid Access ! Please Login again !");

    let decode;
    try {
        decode = verifyToken(token);
    } catch (error) {
        throw new AppError(401, "Token expired or invalid ! Please login again !");
    }

    const user = await userModel.findById(decode.userId);
    if (!user) throw new AppError(404, "User not found !");

    req.user = user;
    next();
});



export const authSeller = AsyncWrapper(async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) throw new AppError(401, "Invalid Access ! Please Login again !");

    const redis = await getRedis();

    const isBlacklisted = await redis.get(`blacklisted:${token}`);
    if (isBlacklisted) throw new AppError(401, "Invalid Access ! Please Login again !");

    let decode;
    try {
        decode = verifyToken(token);
    } catch (error) {
        throw new AppError(401, "Token expired or invalid ! Please login again !");
    }

    const user = await userModel.findById(decode.userId).select("+role");

    if (!user) throw new AppError(404, "User not found !");
    
    if (user.role !== "seller") {
        throw new AppError(403, "Unauthorized ! You are not a seller !");
    }

    req.user = user;
    next();
})