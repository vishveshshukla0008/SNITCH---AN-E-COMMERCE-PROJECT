import { api } from "../../../api/httpClient";



export async function createProduct(formData) {
    const response = await api.post("/products/create", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response;
}

export async function getAllSellerProducts() {
    const response = await api.get("/products/getAllProducts");
    return response;
}


export async function getSellersSingleProduct(id) {
    const response = await api.get(`/products/${id}`);
    return response;
}
