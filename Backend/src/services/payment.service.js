import Razorpay from "razorpay";
import { config } from "../config/config.js";

const razorPay = new Razorpay({
    key_id: config.RAZORPAY_KEY_ID,
    key_secret: config.RAZORPAY_KEY_SECRET
});

export const createOrder = async ({ amount, currency = "INR" }) => {
    const options = {
        amount: amount * 100,
        currency,
    }

    const order = await razorPay.orders.create(options);

    return order;

}