import mongoose from "mongoose";
import priceSchema from "./price.Schema.js";


const paymentSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending"
    },
    totalAmount: {
        type: Number,
        required: true
    },
    razorpay: {
        orderId: String,
        paymentId: String,
        signature: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderDetails: [
        {
            title: String,
            productId: String,
            variantId: String,
            quantity: String,
            images: [{ url: String }],
            price: priceSchema,
            description: String
        }
    ]
});

export const paymentModel = mongoose.model("Payment", paymentSchema)