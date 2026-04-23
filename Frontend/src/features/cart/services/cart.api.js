import { api } from "../../../api/httpClient";

export const getCart = async () => {
    const response = await api.get("/cart");
    return response;
}

export const addToCart = async (productId, variantId, size, quantity = 1) => {
    const response = await api.post(`/cart/add/${productId}/${variantId}`, { size, quantity });
    return response;
}

export const updateCartItemQuantity = async (productId, variantId, size, quantity) => {
    const response = await api.put(`/cart/update/${productId}/${variantId}`, { size, quantity });
    return response;
}

export const removeFromCart = async (productId, variantId, size) => {
    const response = await api.delete(`/cart/remove/${productId}/${variantId}`, { data: { size } });
    return response;
}