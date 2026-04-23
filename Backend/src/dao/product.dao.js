import { AppError } from "../utils/AppError.js";
import { productModel } from "../models/product.model.js"

export const stockOfVariant = async (productId, variantId) => {
    const product = await productModel.findOne({ _id: productId });
    const variant = product.variants.find((variant) => variant._id.toString() === variantId);
    if (!variant) throw new AppError(404, "Variant not founded !");

    return variant.stock;
}