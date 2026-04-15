import { body } from "express-validator";
import { validator } from "./auth.Validation.js";

export const createProductValidation = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 3, max: 120 })
        .withMessage("Title must be between 3 to 120 characters"),

    body("description")
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ min: 10, max: 150 })
        .withMessage("Description must be between 10 to 150 characters long !"),

    body("brand").optional().default("Generic").isString().withMessage("Brand must be a string"),

    body("category")
        .notEmpty()
        .withMessage("Category is required")
        .isIn(["Men", "Women", "Kids"])
        .withMessage("Invalid category"),

    body("subCategory")
        .notEmpty()
        .withMessage("SubCategory is required")
        .isIn(["T-Shirts", "Hoodies", "Jeans"])
        .withMessage("Invalid subCategory"),

    body("price.amount")
        .notEmpty()
        .withMessage("Price amount is required")
        .isFloat({ gt: 0 })
        .withMessage("Price must be greater than 0"),

    body("price.discountPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Discount price can not 0")
        .custom((value, { req }) => {
            if (value && value >= req.body.price.amount) {
                throw new Error("Discount price must be less than actual price");
            }
            return true;
        }),

    body("price.currency")
        .optional()
        .isIn(["USD", "EUR", "INR", "GBP", "JPY"])
        .withMessage("Invalid currency"),

    body("tags").optional().isArray().withMessage("Tags must be an array"),

    body("tags.*").optional().isString().withMessage("Each tag must be a string"),

    body("isFeatured")
        .optional()
        .isBoolean()
        .withMessage("isFeatured must be boolean"),

    body("isNewProduct").optional().isBoolean().withMessage("isNew must be boolean"),

    body("isSale").optional().isBoolean().withMessage("isSale must be boolean"),

    // Sale Date
    body("saleEndDate")
        .optional()
        .isISO8601()
        .withMessage("saleEndDate must be a valid date"),

    // Rating
    body("averageRating")
        .optional()
        .isFloat({ min: 0, max: 5 })
        .withMessage("Rating must be between 0 and 5"),

    // createdBy

    validator,
];
