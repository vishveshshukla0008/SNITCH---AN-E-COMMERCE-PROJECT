import { Router } from "express"
import { authSeller, authUser } from "../middlewares/auth.middleware.js";
import { createProductValidation } from "../validations/product.Validation.js";
import { productController } from "../controllers/product.Controller.js";
import { uploads } from "../middlewares/upload.middleware.js";
import { validateProductImages } from "../middlewares/fileValidator.middleware.js";
const productRouter = Router();



productRouter.post("/create", authSeller, uploads.array('images', 7), validateProductImages, createProductValidation, productController.createProduct);


productRouter.get("/getAllProducts", authUser, productController.getAllSellingProducts);

export default productRouter;