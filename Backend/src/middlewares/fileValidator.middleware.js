import { AppError } from "../utils/AppError.js";

export const validateProductImages = (req, res, next) => {
  const files = req.files;

  if (!files || files.length === 0) {
    throw new AppError(400, "At least one product image is required");
  }

  const variantMap = {};

  for (const file of files) {
    if (!file.mimetype.startsWith("image/")) {
      throw new AppError(400, "Only image files allowed");
    }

    const match = file.fieldname.match(/^variants\[(\d+)\]\[images\]$/);

    if (!match) {
      throw new AppError(400, `Invalid image field ${file.fieldname}`);
    }

    const variantIndex = match[1];

    if (!variantMap[variantIndex]) {
      variantMap[variantIndex] = 0;
    }

    variantMap[variantIndex]++;
  }

  for (const key in variantMap) {
    if (variantMap[key] > 7) {
      throw new AppError(400, `Variant ${key} can have max 7 images`);
    }
  }

  next();
};