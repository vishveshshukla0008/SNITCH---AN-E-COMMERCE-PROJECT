import mongoose from "mongoose";
import priceSchema from "./price.Schema.js";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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
    totalStock: {
      type: Number,
      default: 0,
    },
    subCategory: {
      type: String,
      enum: ["T-Shirts", "Hoodies", "Jeans"],
      required: true,
    },

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
      min: 0,
      max: 5,
    },
    variants: [
      {
        stock: {
          type: Number,
          required: true,
          default: 0,
          min: 0,
        },

        isDefault: {
          type: Boolean,
          default: false,
        },

        sizes: [
          {
            size: { type: String, required: true, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'] },
            stockOfSize: { type: Number, required: true }
          }
        ],
        price: priceSchema,

        images: [
          {
            _id: false,
            url: {
              type: String,
              required: true,
            },
            thumbnailUrl: {
              type: String,
              required: true,
            },
            fileId: {
              type: String,
              required: true,
            },
          },
        ],

        weight: {
          type: Number,
          default: 0,
        },

        dimensions: {
          length: Number,
          width: Number,
          height: Number,
        },

        status: {
          type: String,
          enum: ["Active", "Out of stock", "Hidden"],
          default: "Active",
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

productSchema.pre("save", function () {
  if (!this.isModified("variants")) return;
  let allVariantsStock = 0;

  this.variants.forEach((variant) => {
    let singleVariantStock = 0;
    variant.sizes.forEach((size) => {
      singleVariantStock += size?.stockOfSize;
    });
    variant.stock = singleVariantStock;
    allVariantsStock += variant.stock;
  })

  this.totalStock = allVariantsStock;
});

export const productModel = mongoose.model("Product", productSchema);
