import mongoose from "mongoose";
import { AsyncWrapper } from "../utils/AsyncWrapper.js";
import { productModel } from "../models/product.model.js";
import { AppError } from "../utils/AppError.js";
import { findUsersCart, stockOfVariant } from "../dao/product.dao.js";
import cartModel from "../models/cart.Model.js";
import { createOrder } from "../services/payment.service.js";
import { paymentModel } from "../models/payment.model.js";
import { validatePaymentVerification } from "../../node_modules/razorpay/dist/utils/razorpay-utils.js"
import { config } from "../config/config.js";

const addToCartController = AsyncWrapper(async (req, res) => {
    const { productId, variantId } = req.params;
    const { quantity, size } = req.body;

    const product = await productModel.findOne(
        {
            _id: productId,
            variants: {
                $elemMatch: {
                    _id: variantId,
                }
            }
        }
    );

    if (!product) throw new AppError(404, "Product no longer exist !");

    const stock = await stockOfVariant(productId, variantId);

    const cart =
        (await cartModel.findOne({ user: req.user._id })) ||
        (await cartModel.create({ user: req.user._id }));

    const isProductAlreadyInCart = cart.items.some(
        (item) =>
            item.product.toString() === productId &&
            item.variant?.toString() === variantId &&
            item.size === size,
    );

    if (isProductAlreadyInCart) {
        const quantityInCart = cart.items.find(
            (item) =>
                item.product.toString() === productId &&
                item.variant?.toString() === variantId && item?.size === size
        ).quantity;

        if (quantityInCart + quantity > stock) {
            return res.status(400).json({
                message: `Only ${stock} items left in stock. and you already have ${quantityInCart} items in your cart`,
                success: false,
            });
        }

        const updatedCart = await cartModel.findOneAndUpdate(
            {
                user: req.user._id,
                "items.product": productId,
                "items.variant": variantId,
                "items.size": size
            },
            { $inc: { "items.$.quantity": quantity } },
            { returnDocument: "after" },
        ).populate("items.product");

        return res.status(200).json({
            message: "Cart updated successfully",
            success: true,
            cart: updatedCart
        });
    }
    if (quantity > stock) {
        return res.status(400).json({
            message: `Only ${stock} items left in stock`,
            success: false,
        });
    }

    const selectedVariant = product.variants.id(variantId);

    cart.items.push({
        product: productId,
        variant: variantId,
        size,
        quantity,
        price: {
            amount: selectedVariant.price.amount,
            discountPrice: selectedVariant.price.discountPrice,
            currency: selectedVariant.price.currency,
        },
    });

    await cart.save();
    await cart.populate("items.product");

    return res.status(200).json({
        message: "Product added to cart successfully",
        success: true,
        cart
    });
});

const getCart = AsyncWrapper(async (req, res) => {
    const user = req.user;

    let cart = await findUsersCart(user);



    if (!cart) {
        await cartModel.create({ user: user._id });

        cart = {
            items: [],
            totalPrice: 0
        };
    }

    return res.status(200).json({
        success: true,
        message: "Cart fetched successfully",
        cart
    });
});
const deleteCartItemController = AsyncWrapper(async (req, res) => {
    const { productId, variantId } = req.params;
    const { size } = req.body;

    const userCart = await cartModel.findOne({ user: req.user._id });
    if (!userCart) throw new AppError(404, "Cart not found !");

    const updatedCart = await cartModel.findOneAndUpdate({ user: req.user._id },
        {
            $pull: {
                items: {
                    product: productId,
                    variant: variantId,
                    size: size
                }
            }
        }, { returnDocument: "after" }).populate("items.product");

    if (!updatedCart) throw new AppError(404, "Item was not found in the cart")

    return res.status(200).json({ success: true, message: "Product Removed !", cart: updatedCart })
});

const updateCartItemController = AsyncWrapper(async (req, res) => {
    const { productId, variantId } = req.params;
    const { size, quantity } = req.body;

    if (!quantity || quantity < 1) {
        throw new AppError(400, "Quantity must be at least 1");
    }

    const stock = await stockOfVariant(productId, variantId);

    if (quantity > stock) {
        throw new AppError(400, `Only ${stock} items left in stock`);
    }


    let updatedCart = await cartModel.findOneAndUpdate(
        {
            user: req.user._id,
            items: {
                $elemMatch: {
                    product: productId,
                    variant: variantId,
                    size: size
                }
            }
        },
        {
            $set: {
                "items.$.quantity": quantity
            }
        },
        { returnDocument: "after" }
    ).populate("items.product");

    if (!updatedCart) {
        throw new AppError(404, "Cart item not found");
    }

    return res.status(200).json({
        success: true,
        message: "Quantity updated successfully",
        cart: updatedCart
    });

})

const createOrderController = AsyncWrapper(async (req, res) => {
    const cart = await findUsersCart(req.user);
    const order = await createOrder({ amount: cart.totalPrice, currency: "INR" });

    await paymentModel.create({
        user: req.user._id,
        razorpay: {
            orderId: order.id
        },
        totalAmount: cart.totalPrice,
        orderDetails: cart.items.map((item) => ({
            title: item.title,
            productId: item.product._id,
            variantId: item.variant,
            quantity: item.quantity,
            images: item.product.variants.images,
            description: item.product.description,
            price: {
                amount: item.price.amount,
                discountPrice: item.price.discountPrice,
                currency: item.price.currency
            }
        }))
    })
    return res.status(200).json({ success: true, message: "Order Success !", order });
});

const verifyOrderController = AsyncWrapper(async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const paymentRecord = await paymentModel.findOne({
        "razorpay.orderId": razorpay_order_id,
        user: req.user._id
    });

    if (!paymentRecord) throw new AppError(404, "Payment record not found for this order");

    const isPaymentValid = validatePaymentVerification({
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
    }, razorpay_signature, config.RAZORPAY_KEY_SECRET);

    if (!isPaymentValid) throw new AppError(400, "Payment verification failed !");

    paymentRecord.razorpay.paymentId = razorpay_payment_id;
    paymentRecord.status = "success";
    await paymentRecord.save();

    return res.status(200).json({ success: true, message: "Payment verified successfully !" });
})

export const cartController = {
    addToCartController,
    getCart,
    deleteCartItemController,
    updateCartItemController,
    createOrderController,
    verifyOrderController
};