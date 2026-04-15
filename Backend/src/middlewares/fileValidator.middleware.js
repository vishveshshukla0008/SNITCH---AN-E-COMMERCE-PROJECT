import { AppError } from "../utils/AppError.js";

export const validateProductImages = (req, res, next) => {
    const files = req.files;

    if (!files || files.length < 5) {
        throw new AppError(400, "5 Product images must be present !")
    }

    for (let file of files) {
        if (!file.mimetype.startsWith("image/")) {
            throw new AppError(400, "Only image files allowed")
        }
    }

    next();
};