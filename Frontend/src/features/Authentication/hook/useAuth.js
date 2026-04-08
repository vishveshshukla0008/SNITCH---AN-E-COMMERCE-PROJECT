import { useDispatch } from "react-redux";
import { setAuthLoading, setUser } from "../auth.slice";
import { authApi } from "../services/auth.api";
const useAuth = () => {
    const dispatch = useDispatch();

    const handleRegister = async (userData) => {
        try {
            dispatch(setAuthLoading(true));
            const response = await authApi.register(userData);
            dispatch(setUser(response.user));
            return response;
        } catch (error) {
            console.log(error);
            return error;
        } finally {
            dispatch(setAuthLoading(false));
        }
    };

    const loginHandler = async (userData) => {
        try {
            dispatch(setAuthLoading(true));
            const response = await authApi.login(userData);
            dispatch(setUser(response.user));
            return response;
        } catch (error) {
            console.log(error);
            return error;
        } finally {
            dispatch(setAuthLoading(false));
        }
    };

    const logoutHandler = async () => {
        try {
            dispatch(setAuthLoading(true));
            const response = await authApi.logout();
            dispatch(setUser(null));
            return response;
        } catch (error) {
            console.log(error);
            dispatch(setUser(null));
            return error;
        } finally {
            dispatch(setAuthLoading(false));
        }
    }

    const getCurrentUser = async () => {
        try {
            dispatch(setAuthLoading(true));
            const response = await authApi.getCurrentUser();
            dispatch(setUser(response.user));
            return response;
        } catch (error) {
            console.log(error);
            return error;
        } finally {
            dispatch(setAuthLoading(false));
        }
    }

    return { handleRegister, loginHandler, logoutHandler, getCurrentUser };
};

export default useAuth;
