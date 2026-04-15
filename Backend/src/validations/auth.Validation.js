import { body, validationResult, param } from "express-validator";
import { AppError } from "../utils/AppError.js";

export const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(400, "Validation fields are missing !", errors.array());
  }
  next();
};

export const registerValidation = [
  body("email").isEmail().withMessage("Invalid Email"),
  body("contact").isLength({ min: 10 }).withMessage("Invalid Contact"),
  body("fullname").isLength({ min: 3 }).withMessage("Invalid Fullname"),
  body("password")
    .isLength({ min: 6, max: 12 })
    .withMessage("Password must be from 6 to 12 characters long !"),
  body("role")
    .isIn(["buyer", "seller"])
    .withMessage("Invalid Role : buyer or seller"),
  validator,
];

export const loginValidation = [
  body("identifier").custom((value) => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isPhone = /^[6-9]\d{9}$/.test(value); // Indian mobile format

    if (!isEmail && !isPhone) {
      throw new Error("Enter a valid email or mobile number");
    }
    return true;
  }),

  body("password")
    .isLength({ min: 6, max: 12 })
    .withMessage("Password must be from 6 to 12 characters long!"),

  validator,
];

export const tokenValidation = [
  param("token").notEmpty().withMessage("Token is required !"), validator
]
