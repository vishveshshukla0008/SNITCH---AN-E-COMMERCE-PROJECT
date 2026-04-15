import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Loader from "../../../shared/components/Loader";
import toast from "react-hot-toast";

export const SellerProtect = ({ children }) => {
  const { authLoading, user } = useSelector((state) => state.auth);

  if (authLoading) return <Loader />;

  if (!user || user.role !== "seller") {
    toast.error("You are not authorized to access this page");
    return <Navigate to="/" replace />;
  }

  return children;
};
