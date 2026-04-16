import { AsyncWrapper } from "../utils/AsyncWrapper.js";
import { AppError } from "../utils/AppError.js";
import { uploadFile } from "../services/imageStorage.Service.js";
import { productModel } from "../models/product.model.js";


/**
 * @desc Create new product
 * @route POST /api/products/create
 * @access Private (Seller/Admin)
 */

const createProduct = AsyncWrapper(async (req, res) => {
    console.log(req.body);
    const seller = req.user;
    if (!seller) throw new AppError(400, "You are not a seller !");
    const {
        title,
        description,
        brand,
        category,
        subCategory,
        price,
        tags,
        isFeatured,
        isNewProduct,
        isSale,
        saleEndDate,
    } = req.body;

    const images = await Promise.all(
        req.files.map(async (file) => {
            return await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname
            });
        })
    );

    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const product = await productModel.create({
        title,
        slug,
        description,
        brand,
        category,
        subCategory,
        price: {
            amount: JSON.parse(price.amount),
            discountPrice: price.discountPrice || 0,
            currency: price.currency || "INR",
        },
        images,
        tags,
        isFeatured: isFeatured || false,
        isNewProduct: isNewProduct !== undefined ? isNewProduct : true,
        isSale: isSale || false,
        saleEndDate: isSale ? saleEndDate : null,
        createdBy: seller._id,
    });

    return res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
    });
});




/**
 * @desc Show all products
 * @route GET /api/products/getAllProducts
 * @access Private (Seller/Admin)
 */

const getAllSellingProducts = AsyncWrapper(async (req, res) => {
    const allProducts = await productModel.find({ createdBy: req.user._id });
    return res.status(200).json({ success: true, message: "Products has been fetched Sccuessfully !", data: allProducts });
})

export const productController = { createProduct, getAllSellingProducts };
