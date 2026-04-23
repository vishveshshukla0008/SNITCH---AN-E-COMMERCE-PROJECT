import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { validateAddToCart } from "../validations/cart.Validation.js";
import { cartController } from "../controllers/cart.Controller.js";

const router = Router();


/**
 * @route POST /api/cart/add/:productId/:variantId
 * @desc Add item to cart
 * @access Private (User must be loggedin to add in their cart :)
 * @argument productId - ID of the product to add
 * @argument variantId - ID of the variant to add
 * @argument quantity - Quantity of the item to add (optional, default: 1)
 */

router.post("/add/:productId/:variantId", authUser, validateAddToCart, cartController.addToCartController)

//=========================================================================

/**
 * @route GET /api/cart
 * @desc Get user's cart
 * @access Private
 */
router.get('/', authUser, cartController.getCart)
export default router;