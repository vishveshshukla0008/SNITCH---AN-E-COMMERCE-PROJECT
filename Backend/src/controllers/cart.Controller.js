import { AsyncWrapper } from "../utils/AsyncWrapper.js";
import { productModel } from "../models/product.model.js"
import { AppError } from "../utils/AppError.js";
import { stockOfVariant } from "../dao/product.dao.js";
import cartModel from "../models/cart.Model.js";

const addToCartController = AsyncWrapper(async (req, res) => {
    const { productId, variantId } = req.params;
    const {quantity} = req.body;

    console.log(quantity)

    let product = await productModel.findOne(
        { _id: productId, "variants._id": variantId },
        { variants: { $elemMatch: { _id: variantId } } }
    );

    if (!product) throw new AppError(404, "Product no longer exist !");

    const stock = await stockOfVariant(productId, variantId);

    const cart = (await cartModel.findOne({ user: req.user._id })) ||
        (await cartModel.create({ user: req.user._id }));


    const isProductAlreadyInCart = cart.items.some(item => item.product.toString() === productId && item.variant?.toString() === variantId)

    if (isProductAlreadyInCart) {
        const quantityInCart = cart.items.find(item => item.product.toString() === productId && item.variant?.toString() === variantId).quantity;

        if (quantityInCart + quantity > stock) {
            return res.status(400).json({
                message: `Only ${stock} items left in stock. and you already have ${quantityInCart} items in your cart`,
                success: false
            })
        }

        console.log("Before update")
        
        await cartModel.findOneAndUpdate(
            { user: req.user._id, "items.product": productId, "items.variant": variantId },
            { $inc: { "items.$.quantity": quantity } },
            { new: true }
        )
        
        console.log("after update")
        return res.status(200).json({
            message: "Cart updated successfully",
            success: true
        })

    }
    if (quantity > stock) {
        return res.status(400).json({
            message: `Only ${stock} items left in stock`,
            success: false
        })
    }

    console.log("Product in cart Controller ", product)
    const selectedVariant = product.variants.id(variantId);

    cart.items.push({
        product: productId,
        variant: variantId,
        quantity,
        price: {
            amount: selectedVariant.price.amount,
            discountPrice: selectedVariant.price.discountPrice,
            currency: selectedVariant.price.currency,
        }
    });

    await cart.save()

    return res.status(200).json({
        message: "Product added to cart successfully",
        success: true
    })
})



const getCart = AsyncWrapper(async (req, res) => {

})






export const cartController = { addToCartController, getCart };