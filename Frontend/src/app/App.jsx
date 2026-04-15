import React, { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import { useAuth } from "../features/Authentication/hook/useAuth";
import { useSelector } from "react-redux";

const App = () => {
  const { getCurrentUser } = useAuth();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    getCurrentUser();
  }, []);

  return <AppRoutes />;
};

export default App;
