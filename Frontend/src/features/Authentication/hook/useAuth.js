import { useDispatch } from "react-redux";
import { setAuthLoading, setUser } from "../auth.slice";
import { authApi } from "../services/auth.api";
import toast from "react-hot-toast";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async (userData) => {
    try {
      dispatch(setAuthLoading(true));
      const response = await authApi.register(userData);
      dispatch(setUser(response.user));
      toast.success(response.message || "Account created successfully!");
      return response;
    } catch (error) {
      toast.error(error.message || "Registration failed");
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
      toast.success(response.message || "Successfully signed in!");
      return response;
    } catch (error) {
      toast.error(error.message || "Authentication failed");
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
      toast.success(response.message || "Logged out successfully");
      return response;
    } catch (error) {
      toast.error(error.message || "Logout failed");
      dispatch(setUser(null));
      return error;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  const getCurrentUser = async () => {
    try {
      dispatch(setAuthLoading(true));
      const response = await authApi.getCurrentUser();
      dispatch(setUser(response.user));
      return response;
    } catch (error) {
      // Background check - don't show toast for errors here
      console.log("Current user check failed:", error.message);
      return error;
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  return { handleRegister, loginHandler, logoutHandler, getCurrentUser };
};

