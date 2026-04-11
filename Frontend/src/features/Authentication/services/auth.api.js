import { api } from "../../../api/httpClient";

export const authApi = {
    register: async (userData) => {
        const response = await api.post("/auth/register", userData);
        return response;
    },
    login: async (userData) => {
        const response = await api.post("/auth/login", userData);
        return response;
    },
    logout: async () => {
        const response = await api.post("/auth/logout");
        return response;
    },
    getCurrentUser: async () => {
        const response = await api.get("/auth/me");
        return response;
    },
    verifyAccount: async (token) => {
        const response = await api.get(`/auth/verify/${token}`);
        return response;
    },
}   