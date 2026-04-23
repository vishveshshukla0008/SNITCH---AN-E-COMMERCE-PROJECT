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

    body("size").notEmpty().withMessage("Size is required !"),

    validator
];

export const deleteCartItemValidation = [
    param("productId").notEmpty().isMongoId().withMessage("Invalid Product Id"),
    param("variantId").notEmpty().isMongoId().withMessage("Invalid Variant Id"),
    body("size").notEmpty().isIn(["XS", "S", "M", "L", "XL", "XXL", "3XL"]).withMessage(`Invalid Size parameter size muste be in ["XS", "S", "M", "L", "XL", "XXL", "3XL"]`),
    validator
]


export const updateCartItemValidation = [
    param("productId").notEmpty().isMongoId().withMessage("Invalid Product Id"),
    param("variantId").notEmpty().isMongoId().withMessage("Invalid Variant Id"),
    body("size").notEmpty().isIn(["XS", "S", "M", "L", "XL", "XXL", "3XL"]).withMessage(`Invalid Size parameter size muste be in ["XS", "S", "M", "L", "XL", "XXL", "3XL"]`),
    body("quantity").notEmpty().withMessage("Invalid Quantity"), validator
]