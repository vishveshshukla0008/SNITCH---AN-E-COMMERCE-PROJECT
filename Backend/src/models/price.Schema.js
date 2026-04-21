import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        min: 0,
    },

    discountPrice: {
        type: Number,
        default: 0,
        min: 0,
    },

    currency: {
        type: String,
        enum: ["USD", "EUR", "INR", "GBP", "JPY"],
        default: "INR",
    },
}, { _id: false, _v: false });

export default priceSchema;
