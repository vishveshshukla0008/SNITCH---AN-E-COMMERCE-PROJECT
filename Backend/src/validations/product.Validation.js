import { body } from "express-validator";
import { validator } from "./auth.Validation.js";

export const createProductValidation = [
  body("title")
    .trim()
    .notEmpty()
    .isLength({ min: 3, max: 120 }),

  body("description")
    .trim()
    .notEmpty()
    .isLength({ min: 10, max: 500 }),

  body("brand")
    .optional()
    .isString(),

  body("category")
    .notEmpty()
    .isIn(["Men", "Women", "Kids"]),

  body("subCategory")
    .notEmpty()
    .isIn(["T-Shirts", "Hoodies", "Jeans"]),

  body("averageRating")
    .optional()
    .isFloat({ min: 0, max: 5 }),

  body("isFeatured")
    .optional()
    .isBoolean(),

  body("isNewProduct")
    .optional()
    .isBoolean(),

  body("isSale")
    .optional()
    .isBoolean(),

  validator,
];
