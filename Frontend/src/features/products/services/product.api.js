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
    const response = await api.post("/products/getAllProducts");
    return response;
}

