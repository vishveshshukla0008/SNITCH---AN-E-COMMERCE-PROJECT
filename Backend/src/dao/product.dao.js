import mongoose from "mongoose";
import { AppError } from "../utils/AppError.js";
import { productModel } from "../models/product.model.js";
import { AsyncWrapper } from "../utils/AsyncWrapper.js";
import cartModel from "../models/cart.Model.js";

export const stockOfVariant = async (productId, variantId) => {
    const product = await productModel.findOne({ _id: productId });
    const variant = product.variants.find(
        (variant) => variant._id.toString() === variantId,
    );
    if (!variant) throw new AppError(404, "Variant not founded !");

    return variant.stock;
};

export const findUsersCart = async (user) =>
    (
        await cartModel.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(user._id),
                },
            },
            { $unwind: "$items" },

            {
                $lookup: {
                    from: "products",
                    localField: "items.product",
                    foreignField: "_id",
                    as: "items.product",
                },
            },

            { $unwind: "$items.product" },
            { $unwind: "$items.product.variants" },

            {
                $match: {
                    $expr: {
                        $eq: ["$items.variant", "$items.product.variants._id"],
                    },
                },
            },

            {
                $addFields: {
                    "items.currentPrice": "$items.product.variants.price.discountPrice",

                    itemPrice: {
                        $multiply: [
                            "$items.quantity",
                            "$items.product.variants.price.discountPrice",
                        ],
                    },
                },
            },

            {
                $group: {
                    _id: "$_id",
                    totalPrice: { $sum: "$itemPrice" },
                    items: { $push: "$items" },
                },
            },
        ])
    )[0];
