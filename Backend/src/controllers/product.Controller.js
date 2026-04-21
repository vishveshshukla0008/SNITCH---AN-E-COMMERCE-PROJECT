import { AsyncWrapper } from "../utils/AsyncWrapper.js";
import { AppError } from "../utils/AppError.js";
import { uploadFile } from "../services/imageStorage.Service.js";
import { productModel } from "../models/product.model.js";
import pLimit from "p-limit";


/**
 * @desc Create new product
 * @route POST /api/products/create
 * @access Private (Seller/Admin)
 */
export const createProduct = async (req, res, next) => {
    try {
        const { body, files = [], user } = req;

        const variants = body.variants;

        variants.forEach((v) => {
            if (!Array.isArray(v.images)) {
                v.images = [];
            }
        });
        const limit = pLimit(3);

        const uploadImagesTask = files.map((file) =>
            limit(async () => {
                const match = file.fieldname.match(
                    /^variants\[(\d+)\]\[images\]$/
                );

                if (!match) return null;

                const index = Number(match[1]);

                if (!variants[index]) return null;

                const uploaded = await uploadFile({
                    buffer: file.buffer,
                    fileName: file.originalname,
                    folder: "Snitch/products",
                });

                return {
                    index,
                    uploaded,
                };
            })
        );

        const results = await Promise.all(uploadImagesTask);

        results.forEach((resItem) => {
            if (!resItem) return;

            const { index, uploaded } = resItem;

            variants[index].images.push({
                url: uploaded.url,
                fileId: uploaded.fileId,
                thumbnailUrl: uploaded.thumbnailUrl,
            });
        });

        const product = await productModel.create({
            title: body.title,
            description: body.description,
            brand: body.brand || "Generic",
            category: body.category,
            subCategory: body.subCategory,
            tags: body.tags || [],
            isFeatured: body.isFeatured,
            isNewProduct: body.isNewProduct,
            isSale: body.isSale,
            averageRating: body.averageRating,
            saleEndDate: body.saleEndDate,
            variants,
            createdBy: user._id,
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });

    } catch (err) {
        next(err);
    }
};




/**
 * @desc Show all products
 * @route GET /api/products/getAllProducts
 * @access Private (Seller/Admin)
 */

const getAllSellingProducts = AsyncWrapper(async (req, res) => {
    const allProducts = await productModel.find({ createdBy: req.user._id });
    return res.status(200).json({ success: true, message: "Products has been fetched Sccuessfully !", data: allProducts });
})


/**
 * @desc Get a single Product to seller when seller is logged in and seller is product Owner
 * @route GET /api/products/:id
 * @access Private (Seller/Admin)
 */

const getSingleProduct = AsyncWrapper(async (req, res) => {
    const product = req.product;
    return res.status(200).json({ success: true, message: "Product has been fetched Sccuessfully !", data: product });
})


export const productController = { createProduct, getAllSellingProducts, getSingleProduct };
