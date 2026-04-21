import mongoose from "mongoose";

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

        attributes: {
          type: Object,
          default: {},
        },

        price: {
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
        },

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

  this.totalStock = this.variants.reduce((total, variant) => {
    return total + (variant.stock || 0);
  }, 0);
});

export const productModel = mongoose.model("Product", productSchema);
