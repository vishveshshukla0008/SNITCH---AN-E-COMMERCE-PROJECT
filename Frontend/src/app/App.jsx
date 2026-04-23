import React, { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import { useAuth } from "../features/Authentication/hook/useAuth";
import { useSelector } from "react-redux";
import useCart from "../features/cart/hooks/useCart";

const App = () => {
  const { getCurrentUser } = useAuth();
  const { getCartHandler } = useCart();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (user) {
      getCartHandler();
    }
  }, [user]);

  return <AppRoutes />;
};

export default App;
