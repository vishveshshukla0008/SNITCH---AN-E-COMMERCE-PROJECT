import mongoose from "mongoose";
// const variantSchema = new mongoose.Schema({
//   size: {
//     type: String,
//     enum: ["XS", "S", "M", "L", "XL", "XXL"],
//     required: true,
//   },
//   color: {
//     type: String,
//     required: true,
//   },
//   stock: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   sku: {
//     type: String,
//     unique: true,
//   },
// });
// 
// const reviewSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     rating: {
//       type: Number,
//       required: true,
//       min: 1,
//       max: 5,
//     },
//     comment: String,
//   },
//   { timestamps: true }
// );

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        brand: {
            type: String,
            default: "Generic",
        },

        category: {
            type: String,
            enum: ["Men", "Women", "Kids"],
            required: true,
        },

        subCategory: {
            type: String,
            enum: ["T-Shirts", "Hoodies", "Jeans"],
            required: true,
        },

        price: {
            amount: {
                type: Number,
                required: true,
            },
            discountPrice: {
                type: Number,
                default: 0,
            },
            currency: {
                type: String,
                enum: ["USD", "EUR", "INR", "GBP", "JPY"],
                default: "INR",
            },
        },

        images: [
            {
                _id:false,
                url: String,
                thumbnailUrl: String,
                fileId: String,
            },
        ],

        tags: [
            {
                type: String,
            },
        ],

        isFeatured: {
            type: Boolean,
            default: false,
        },

        isNewProduct: {
            type: Boolean,
            default: true,
        },

        isSale: {
            type: Boolean,
            default: false,
        },

        saleEndDate: Date,

        averageRating: {
            type: Number,
            default: 0,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

export const productModel = mongoose.model("Product", productSchema);



