import { getCart, addToCart, updateCartItemQuantity, removeFromCart } from "../services/cart.api";
import { setItems, setCartLoading } from "../slice/cart.Slice";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-hot-toast";

const useCart = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    async function getCartHandler() {
        try {
            dispatch(setCartLoading(true));
            const res = await getCart();
            dispatch(setItems(res.cart.items));
            return res;
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setCartLoading(false));
        }
    }

    async function handleAddToCart({ productId, variantId, size, quantity = 1 }) {
        try {
            // Check if item already exists in cart with same variant AND size
            const existingItem = cartItems.find(item => {
                const itemProductId = item.product?._id?.toString() || item.product?.toString();
                return itemProductId === productId && 
                       item.variant?.toString() === variantId?.toString() && 
                       item.size === size;
            });
            if (existingItem) {
                // If exists, update quantity
                const newQuantity = existingItem.quantity + quantity;
                const res = await updateCartItemQuantity(productId, variantId, size, newQuantity);

                dispatch(setItems(res.cart.items));
                toast.success("Quantity updated in cart");
            } else {
                // If not, add new
                const res = await addToCart(productId, variantId, size, quantity);
                dispatch(setItems(res.cart.items));
                toast.success("Added to bag");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to add to bag");
        }
    }

    async function handleUpdateQuantity(productId, variantId, size, newQuantity) {
        if (newQuantity < 1) return handleRemoveItem(productId, variantId, size);
        try {
            const res = await updateCartItemQuantity(productId, variantId, size, newQuantity);
            dispatch(setItems(res.cart.items));
            toast.success(res.message);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update quantity");
        }
    }

    async function handleRemoveItem(productId, variantId, size) {
        let toastId;
        try {
            toastId = toast.loading("Removing item, please wait");
            const res = await removeFromCart(productId, variantId, size);
            dispatch(setItems(res.cart.items));
            toast.success(res.message, { id: toastId });
        } catch (error) {
            toast.error(error.message, { id: toastId });
        }
    }

    return {
        getCartHandler,
        handleAddToCart,
        handleUpdateQuantity,
        handleRemoveItem
    };
}

export default useCart