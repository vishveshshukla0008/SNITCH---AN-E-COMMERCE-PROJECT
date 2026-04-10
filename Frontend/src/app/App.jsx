import React, { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../features/Authentication/hook/useAuth";

const App = () => {
  const dispatch = useDispatch();

  const { authLoading, user } = useSelector((state) => state.auth);
  const { getCurrentUser } = useAuth();

  useEffect(() => {
    getCurrentUser();
  }, []);

  return <AppRoutes />;
};

export default App;
