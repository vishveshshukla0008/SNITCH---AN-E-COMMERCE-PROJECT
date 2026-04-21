import { param, body } from "express-validator";
import { validator } from "./auth.Validation.js"


export const validateAddToCart = [
    param("productId")
        .isMongoId()
        .withMessage("Invalid product ID"),

    param("variantId")
        .optional()
        .isMongoId()
        .withMessage("Invalid variant ID"),

    body("quantity")
        .optional({ values: "falsy" })
        .default(1)
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1"),

    validator
];