import { AppError } from "../utils/AppError.js";
import { productModel } from "../models/product.model.js"
import { AsyncWrapper } from "../utils/AsyncWrapper.js";
import cartModel from "../models/cart.Model.js";

export const stockOfVariant = async (productId, variantId) => {
    const product = await productModel.findOne({ _id: productId });
    const variant = product.variants.find((variant) => variant._id.toString() === variantId);
    if (!variant) throw new AppError(404, "Variant not founded !");

    return variant.stock;
}



export const checkItemInCart = AsyncWrapper(async (productId, variantId) => {
    // check for items presence
})