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
    const response = await api.patch(`/cart/${productId}/${variantId}`, { size, quantity });
    return response;
}

export const removeFromCart = async (productId, variantId, size) => {
    const response = await api.delete(`/cart/${productId}/${variantId}`, { data: { size } });
    return response;
}

// ===================== Payment Routes =========================

export const createCartOrder = async () => {
    const response = await api.post("/cart/payment/create/order");
    return response;
}

export const verifyCartPayment = async (data) => {
    const response = await api.post("/cart/payment/verify/order", data);
    return response;
}

export const getOrderDetails = async (orderId) => {
    const response = await api.get(`/cart/order/${orderId}`);
    return response;
}