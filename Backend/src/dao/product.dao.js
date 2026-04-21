import { AppError } from "../utils/AppError.js";
import { productModel } from "../models/product.model.js"

export const stockOfVariant = async (productId, variantId) => {
    const product = await productModel.findOne({ _id: productId });
    const variant = product.variants.find((variant) => variant._id.toString() === variantId)

    console.log(product);
    if (!variant) throw new AppError(404, "Variant not founded !");

    console.log("In dao file", variant);

    return variant.stock;
}