import { Router } from "express"
import { authSeller, authUser, isProductOwner } from "../middlewares/auth.middleware.js";
import { createProductValidation } from "../validations/product.Validation.js";
import { productController } from "../controllers/product.Controller.js";
import { uploads } from "../middlewares/upload.middleware.js";
import { validateProductImages } from "../middlewares/fileValidator.middleware.js";
import { validateVariants } from "../middlewares/product.middleware.js";
const productRouter = Router();



productRouter.post("/create", authSeller, uploads.any(), validateProductImages, validateVariants, createProductValidation, productController.createProduct);


productRouter.get("/getAllProducts", authUser, productController.getAllSellingProducts);


productRouter.get("/:id", authUser, isProductOwner, productController.getSingleProduct);



// ==================== Public Routes ====================
productRouter.get("/", productController.getPublicProducts);
productRouter.get("/public/:id", productController.getPublicSingleProduct);

export default productRouter;