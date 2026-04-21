import { AppError } from "../utils/AppError.js";

export const validateVariants = (req, res, next) => {
  const variants = req.body.variants;

  if (!variants || !Array.isArray(variants) || variants.length === 0) {
    throw new AppError(400, "At least one variant required");
  }

  variants.forEach((variant, i) => {
    const stock = Number(variant.stock);
    const amount = Number(variant.price?.amount);

    if (stock < 0) {
      throw new AppError(
        400,
        `Variant ${i} stock invalid`
      );
    }

    if (!amount || amount <= 0) {
      throw new AppError(
        400,
        `Variant ${i} price invalid`
      );
    }
  });

  next();
};